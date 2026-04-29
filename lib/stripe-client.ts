const stripe = { checkout: { sessions: { create: async () => ({ url: '/checkout' }) } } };

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)