import { Handler } from '@netlify/functions';
import { createMollieClient } from '@mollie/api-client';

declare global {
  var __PAYMENTS: Map<string, any> | undefined;
}

const paymentsStore = (globalThis.__PAYMENTS = globalThis.__PAYMENTS || new Map());

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method not allowed',
    };
  }

  try {
    const apiKey = process.env.MOLLIE_API_KEY;
    if (!apiKey) {
      console.error('MOLLIE_API_KEY is not set');
      return {
        statusCode: 500,
        body: 'Payment service not configured',
      };
    }

    const mollie = createMollieClient({ apiKey });

    // Body parsing: form-urlencoded oder JSON
    let paymentId: string;
    try {
      const bodyText = event.body || '';
      if (bodyText.startsWith('id=')) {
        // Form URL encoded
        const params = new URLSearchParams(bodyText);
        paymentId = params.get('id') || '';
      } else {
        // JSON
        const body = JSON.parse(bodyText);
        paymentId = body.id || body.paymentId || '';
      }
    } catch (e) {
      console.error('Error parsing body:', e);
      return {
        statusCode: 400,
        body: 'Invalid request body',
      };
    }

    if (!paymentId) {
      return {
        statusCode: 400,
        body: 'Missing payment ID',
      };
    }

    // Payment von Mollie abrufen
    const payment = await mollie.payments.get(paymentId);

    // orderId finden (aus metadata oder store)
    let orderId: string | undefined = payment.metadata?.orderId as string | undefined;

    if (!orderId) {
      // Fallback: Store durchsuchen
      for (const [oid, order] of paymentsStore.entries()) {
        if (order.molliePaymentId === paymentId) {
          orderId = oid;
          break;
        }
      }
    }

    if (!orderId) {
      console.warn(`Order not found for payment ${paymentId}`);
      return {
        statusCode: 200,
        body: 'OK',
      };
    }

    // Status aktualisieren
    let status: string;
    if (payment.isPaid()) {
      status = 'paid';
    } else if (payment.status === 'canceled') {
      status = 'canceled';
    } else if (payment.status === 'expired') {
      status = 'expired';
    } else if (payment.status === 'failed') {
      status = 'failed';
    } else {
      status = payment.status;
    }

    const existingOrder = paymentsStore.get(orderId);
    if (existingOrder) {
      paymentsStore.set(orderId, {
        ...existingOrder,
        status,
        molliePaymentId: payment.id,
        updatedAt: new Date().toISOString(),
      });
    }

    // Webhook ist idempotent - mehrfache Aufrufe sind OK
    return {
      statusCode: 200,
      body: 'OK',
    };
  } catch (error: any) {
    console.error('Webhook error:', error);
    // Immer 200 zurückgeben, damit Mollie nicht erneut sendet
    return {
      statusCode: 200,
      body: 'OK',
    };
  }
};
