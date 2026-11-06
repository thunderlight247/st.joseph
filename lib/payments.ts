// Payment wiring point. The browser NEVER holds secret keys: it asks YOUR server route to
// create a transaction, then redirects to the provider's hosted checkout (MoMo + card).
//
// Production route sketch (app/api/donations/initialize/route.ts):
//   Paystack: POST https://api.paystack.co/transaction/initialize  (amount in pesewas = GHS x 100, currency 'GHS')
//   Korapay:  POST https://api.korapay.com/merchant/api/v1/charges/initialize (amount in GHS)
//   Return { reference, checkoutUrl }; confirm payment via the provider's webhook, never the redirect.

export type PaymentMethod = 'momo' | 'card';
export type DonationRequest = { registrations: number; amountGHS: number; method: PaymentMethod };
export type DonationResponse = { reference: string; checkoutUrl?: string };

export const DONATIONS_LIVE = process.env.NEXT_PUBLIC_DONATIONS_LIVE === 'true';

export async function initializeDonation(req: DonationRequest): Promise<DonationResponse> {
  if (!DONATIONS_LIVE) {
    // Prototype mode: simulate network latency so the board sees the loading state.
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { reference: `DEMO-${Date.now()}` };
  }
  const res = await fetch('/api/donations/initialize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Could not start payment');
  return (await res.json()) as DonationResponse;
}
