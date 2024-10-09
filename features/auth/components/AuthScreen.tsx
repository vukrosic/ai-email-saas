// "use client";

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FcGoogle } from 'react-icons/fc';
// import { useAuthActions } from "@convex-dev/auth/react";
// import Link from 'next/link';

// export const AuthScreen = () => {
//     const [error, setError] = useState("");
//     const [pending, setPending] = useState(false);
//     const { signIn } = useAuthActions();

//     const onProviderSignUp = async (provider: "google") => {
//         try {
//             setPending(true);
//             await signIn(provider);
//         } catch (error) {
//             setError(`Sign-up with ${provider} failed. Please try again.`);
//         } finally {
//             setPending(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex justify-center items-center p-4">
//             <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md flex flex-col justify-between items-stretch">
//                 <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Let AI think for you</h1>

//                 {error && (
//                     <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
//                         <p className="font-bold">Error</p>
//                         <p>{error}</p>
//                     </div>
//                 )}

//                 <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     disabled={pending}
//                     onClick={() => void onProviderSignUp("google")}
//                     className="w-full bg-white text-gray-700 font-semibold py-3 px-4 border border-gray-300 rounded-lg shadow-sm flex items-center justify-center space-x-2 hover:bg-gray-50 transition duration-200 mb-8"
//                 >
//                     <FcGoogle className="w-6 h-6" />
//                     <span>Continue with Google</span>
//                 </motion.button>

//                 <p className="text-sm text-gray-600 text-center">
//                     By continuing, you agree to our <Link href="/terms-of-service">Terms of Service</Link> and <Link href="/privacy-policy">Privacy Policy</Link>.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default AuthScreen;