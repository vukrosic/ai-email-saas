import { convexAuthNextjsMiddleware, createRouteMatcher, isAuthenticatedNextjs, nextjsMiddlewareRedirect } from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth", "/terms-of-service", "/privacy-policy"]);

export default convexAuthNextjsMiddleware((request) => {
    console.log("isAuthenticatedNextjs()");
    console.log(isAuthenticatedNextjs());
    if (!isPublicPage(request) && !isAuthenticatedNextjs()) {
        console.log("Redirecting to /auth");
        return nextjsMiddlewareRedirect(request, "/auth");
    }
    // // TO DO: Redirect to / if user is authenticated
    // if (isAuthenticatedNextjs()) {
    //     return nextjsMiddlewareRedirect(request, "/");
    // }

    // // redirect from / to /chat
    // if (request.nextUrl.pathname === "/") {
    //     return nextjsMiddlewareRedirect(request, "/chat");
    // }
});

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};