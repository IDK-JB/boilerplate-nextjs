import { env } from '@/lib/env';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import type Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    return new Response('Missing stripe-signature header', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return new Response('Invalid webhook signature', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      break;
    case 'customer.subscription.updated':
      break;
    case 'customer.subscription.deleted':
      break;
  }

  return new Response(null, { status: 200 });
}
