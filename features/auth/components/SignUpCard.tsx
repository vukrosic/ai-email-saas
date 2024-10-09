import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuthActions } from "@convex-dev/auth/react";
import { SignInFlow } from "../types";
import { motion } from 'framer-motion';

interface SignUpCardProps {
    setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const { signIn } = useAuthActions();

    const onProviderSignUp = async (provider: "github" | "google") => {
        try {
            setPending(true);
            await signIn(provider);
        } catch (error) {
            setError(`Sign-up with ${provider} failed. Please try again.`);
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="flex justify-center items-center p-36">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-2xl overflow-hidden sapce-y-10 flex flex-col items-center  space-y-10 m-20 p-20"
            >
                <div className="flex flex-col items-center space-y-10 m-20 p-20">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Sign up to continue</h2>
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                            <p className="font-bold">Error</p>
                            <p>{error}</p>
                        </div>
                    )}
                </div>
                <div className="space-y-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={pending}
                        onClick={() => void onProviderSignUp("google")}
                        className="w-full bg-white text-gray-700 font-semibold py-3 px-4 border border-gray-300 rounded-lg shadow-sm flex items-center justify-center space-x-2 hover:bg-gray-50 transition duration-200"
                    >
                        <FcGoogle className="w-6 h-6" />
                        <span>Continue with Google</span>
                    </motion.button>
                </div>
                <p className="mt-8 text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <button
                        onClick={() => setState("signIn")}
                        className="text-indigo-600 hover:text-indigo-500 font-medium"
                    >
                        Sign In
                    </button>
                </p>
            </motion.div>
        </div>
    );
};