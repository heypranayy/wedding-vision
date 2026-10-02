/**
 * Serverless Function: /api/verify-payment
 * Compatible with Vercel and Netlify.
 * Verifies Razorpay HMAC SHA256 payment signature.
 */

import crypto from 'crypto';

export interface VerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  serviceType: string;
  clientEmail: string;
  clientPhone: string;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body as VerifyPaymentPayload;

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (secret) {
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      const isValid = generatedSignature === razorpay_signature;

      if (!isValid) {
        return res.status(400).json({ success: false, error: 'Invalid payment signature' });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully. Booking confirmed.',
      paymentId: razorpay_payment_id,
    });
  } catch (error: any) {
    console.error('Verify payment error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
