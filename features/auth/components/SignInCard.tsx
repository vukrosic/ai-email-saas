import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";  // Import GitHub icon
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlertIcon } from "lucide-react";
import { SignInFlow } from "../types";

interface SignInCardProps {
    setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const { signIn } = useAuthActions();

    const onPasswordSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);
        setError("");

        try {
            await signIn("password", { email, password, flow: "signIn" });
        } catch {
            setError("Invalid email or password");
        } finally {
            setPending(false);
        }
    };

    const onProviderSignIn = async (provider: "github" | "google") => {
        try {
            console.log("Signing in with provider:", provider);
            await signIn(provider);
        } catch (error) {
            setError(`Sign-in with ${provider} failed. Please try again.`);
        }
    };

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>Login to continue</CardTitle>
                <CardDescription>Use Google to continue</CardDescription>
            </CardHeader>

            {!!error && (
                <div role="alert" className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                    <TriangleAlertIcon className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}

            <CardContent className="space-y-5 px-0 pb-0">
                {/* <form onSubmit={onPasswordSignIn} className="space-y-2.5">
                    <Input
                        disabled={pending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <Input
                        disabled={pending}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        required
                    />
                    <Button type="submit" className="w-full" size="lg" disabled={pending}>
                        Continue
                    </Button>
                </form>

                <Separator /> */}

                <div className="flex flex-col gap-y-2.5">
                    <Button
                        disabled={pending}
                        onClick={() => void onProviderSignIn("google")}
                        variant="outline"
                        size="lg"
                        className="w-full relative"
                    >
                        {/* <FcGoogle className="w-5 h-5 absolute top-2.5 left-2.5" /> */}
                        Continue with Google
                    </Button>
                    {/* <Button
                        disabled={pending}
                        onClick={() => void onProviderSignIn("github")}
                        variant="outline"
                        size="lg"
                        className="w-full relative"
                    >
                        <FaGithub className="w-5 h-5 absolute top-2.5 left-2.5" />
                        Continue with GitHub
                    </Button> */}
                </div>

                <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <span
                        onClick={() => setState("signUp")}
                        className="text-sky-700 hover:underline cursor-pointer"
                    >
                        Sign Up
                    </span>
                </p>
            </CardContent>
        </Card>
    );
};
