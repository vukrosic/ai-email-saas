"use client";

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

const SignOutPage: React.FC = () => {
    const { signOut } = useAuthActions();
    return (<div>
        <Button onClick={void signOut}>Sign Out</Button>
    </div>)
}

export default SignOutPage;
