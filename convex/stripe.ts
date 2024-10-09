import { v } from "convex/values";
import { api, internal } from "./_generated/api";
import { action, internalAction } from "./_generated/server";
import Stripe from 'stripe';
import { Id } from "./_generated/dataModel";
import { getAuthUserId } from "@convex-dev/auth/server";

export const pay = action({
    args: { amount: v.number(), youGet: v.number() },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) {
            throw new Error("User not found!");
        }

        // check if email is verified????

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: "2024-06-20"
        });

        const domain = process.env.SITE_URL!;
        console.log("string pay");
        console.log(args.amount);
        console.log(Math.round(args.amount * 100));
        const session: Stripe.Response<Stripe.Checkout.Session> = await stripe.checkout.sessions.create(
            {
                mode: "payment",
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'Amount',
                            },
                            unit_amount: Math.round(args.amount * 100), // Stripe uses cents
                        },
                        quantity: 1,

                    },
                ],
                metadata: {
                    userId: userId,
                    youGet: args.youGet,
                },
                success_url: `${domain}`,
                cancel_url: `${domain}`,
            }
        );
        return session.url;
    },
});

type Metadata = {
    userId: Id<"users">;
    youGet: string;
}

export const fulfill = internalAction({
    args: { signature: v.string(), payload: v.string() },
    handler: async ({ runMutation }, { signature, payload }) => {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: "2024-06-20",
        });

        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
        try {
            const event = await stripe.webhooks.constructEventAsync(
                payload,
                signature,
                webhookSecret
            );
            const completedEvent = event.data.object as Stripe.Checkout.Session & {
                metadata: Metadata;
            }
            if (event.type === "checkout.session.completed") {
                // do something
            }
            return { success: true };
        } catch (error) {
            console.log(error);
            return { success: false, error: (error as { message: string }).message };
        }
    },
});