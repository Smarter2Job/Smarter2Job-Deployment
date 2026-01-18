import { Handler } from '@netlify/functions';
import { createMollieClient } from '@mollie/api-client';

declare global {
  var __PAYMENTS: Map<string, any> | undefined;
}

const paymentsStore = (globalThis.__PAYMENTS = globalThis.__PAYMENTS || new Map());

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const orderId = event.queryStringParameters?.orderId;

    if (!orderId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing orderId' }),
      };
    }

    const order = paymentsStore.get(orderId);

    if (!order) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Order not found' }),
      };
    }

    // Optional: Status bei Mollie nachladen (falls webhook noch nicht geklappt hat)
    if (order.molliePaymentId) {
      try {
        const apiKey = process.env.MOLLIE_API_KEY;
        if (apiKey) {
          const mollie = createMollieClient({ apiKey });
          const payment = await mollie.payments.get(order.molliePaymentId);

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

          // Status aktualisieren falls geändert
          if (status !== order.status) {
            paymentsStore.set(orderId, {
              ...order,
              status,
              updatedAt: new Date().toISOString(),
            });
          }

          return {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ status }),
          };
        }
      } catch (e) {
        // Fallback auf stored status
        console.warn('Error fetching payment from Mollie:', e);
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ status: order.status }),
    };
  } catch (error: any) {
    console.error('Status check error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal server error' }),
    };
  }
};
