import { convexAuth } from "@convex-dev/auth/server";
import Google from "@auth/core/providers/google";
export const { auth, signIn, signOut, store } = convexAuth({
  providers: [Google]
})
// export const { auth, signIn, signOut, store } = convexAuth({
//   providers: [
//     Google({
//       profile(googleProfile) {
//         console.log("googleProfile", googleProfile);
//         return {
//           id: googleProfile.sub,
//           name: googleProfile.name,
//           email: googleProfile.email,
//           image: googleProfile.picture,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async createOrUpdateUser(ctx, args) {
//       const { existingUserId, profile } = args;

//       if (existingUserId) {
//         // User exists, update their info but don't change availableUSD
//         await ctx.db.patch(existingUserId, {
//           name: profile.name as string,
//           email: profile.email as string,
//           image: profile.image as string,
//         });
//         return existingUserId;
//       } else {
//         // New user, create with initial availableUSD
//         const newUserId = await ctx.db.insert("users", {
//           name: profile.name as string,
//           email: profile.email as string,
//           image: profile.image as string,
//           availableUSD: 0.1,
//         });
//         return newUserId;
//       }
//     },
//   },
// });