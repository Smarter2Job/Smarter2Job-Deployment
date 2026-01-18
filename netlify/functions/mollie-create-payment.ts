import { Handler } from '@netlify/functions';
import { createMollieClient } from '@mollie/api-client';
import { randomUUID } from 'crypto';

// In-memory store (für MVP; in Produktion sollte das eine echte Datenbank sein)
declare global {
  var __PAYMENTS: Map<string, any> | undefined;
}

const paymentsStore = (globalThis.__PAYMENTS = globalThis.__PAYMENTS || new Map());

interface CreatePaymentRequest {
  packageId: 'verstehen' | 'entscheiden' | 'umsetzen';
  email?: string;
}

const PACKAGES = {
  verstehen: { name: 'Verstehen', priceEUR: '59.00' },
  entscheiden: { name: 'Entscheiden', priceEUR: '149.00' },
  umsetzen: { name: 'Umsetzen', priceEUR: '299.00' },
} as const;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const apiKey = process.env.MOLLIE_API_KEY;
    if (!apiKey) {
      console.error('MOLLIE_API_KEY is not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Payment service not configured' }),
      };
    }

    const mollie = createMollieClient({ apiKey });
    const body: CreatePaymentRequest = JSON.parse(event.body || '{}');

    // Validierung
    if (!body.packageId || !PACKAGES[body.packageId]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid packageId' }),
      };
    }

    const pkg = PACKAGES[body.packageId];
    const orderId = randomUUID();
    const appUrl = process.env.APP_URL || 'http://localhost:5175';

    // Mollie Payment erstellen
    const payment = await mollie.payments.create({
      amount: {
        currency: 'EUR',
        value: pkg.priceEUR,
      },
      description: `Smarter2Job – Paket ${pkg.name}`,
      redirectUrl: `${appUrl}/checkout/return?orderId=${orderId}`,
      webhookUrl: appUrl.includes('localhost') 
        ? undefined 
        : `${appUrl}/.netlify/functions/mollie-webhook`,
      metadata: {
        orderId,
        packageId: body.packageId,
      },
    });

    // Status speichern
    paymentsStore.set(orderId, {
      orderId,
      packageId: body.packageId,
      email: body.email,
      status: payment.status,
      molliePaymentId: payment.id,
      updatedAt: new Date().toISOString(),
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        checkoutUrl: payment._links.checkout?.href,
        orderId,
      }),
    };
  } catch (error: any) {
    console.error('Error creating payment:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal server error' }),
    };
  }
};
