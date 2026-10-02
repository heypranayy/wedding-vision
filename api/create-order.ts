/**
 * Serverless Function: /api/create-order
 * Compatible with Vercel Serverless Functions and Netlify Functions.
 * Creates an INR payment order via Razorpay API (Test Mode & Production Ready).
 */

export interface CreateOrderPayload {
  serviceType: 'venue' | 'wedding';
  fullName: string;
  email: string;
  phone: string;
  notes?: Record<string, string>;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { serviceType, fullName, email, phone, notes } = req.body as CreateOrderPayload;

    // Prices in Paise (INR)
    const amountInPaise = serviceType === 'wedding' ? 499900 : 299900;
    const receipt = `WV-${Date.now().toString().slice(-8)}`;

    const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder_key';
    const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'rzp_test_placeholder_secret';

    // If live keys are present, call Razorpay Orders API
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      const basicAuth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
      const rzpResponse = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${basicAuth}`
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: receipt,
          notes: {
            serviceType,
            fullName,
            email,
            phone,
            ...notes
          }
        })
      });

      const orderData = await rzpResponse.json();
      return res.status(200).json(orderData);
    }

    // Fallback Mock Order for Local Dev / Test Validation
    return res.status(200).json({
      id: `order_mock_${receipt}`,
      entity: 'order',
      amount: amountInPaise,
      amount_paid: 0,
      amount_due: amountInPaise,
      currency: 'INR',
      receipt: receipt,
      status: 'created',
      attempts: 0,
      notes: {
        serviceType,
        fullName,
        email,
        phone,
      },
      created_at: Math.floor(Date.now() / 1000)
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
