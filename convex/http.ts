import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { httpRouter } from "convex/server";
import { auth } from "./auth";

const http = httpRouter();
auth.addHttpRoutes(http);

http.route({
    path: "/stripe",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const signature: string = request.headers.get("stripe-signature") as string;
        const result = await ctx.runAction(internal.stripe.fulfill, {
            signature,
            payload: await request.text(),
        });
        console.log(result);
        if (result.success) {
            return new Response(null, {
                status: 200,
            });
        } else {
            return new Response("Webhook Error", {
                status: 400,
            });
        }
    }),
});

export default http;