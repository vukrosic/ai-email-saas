"use client"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { Loader2, LogOutIcon } from "lucide-react"
import { useAuthActions } from "@convex-dev/auth/react";

export const UserButton = () => {
    const { data, isLoading } = useCurrentUser();
    const { signOut } = useAuthActions();
    if (isLoading) return <Loader2 className="size-4 animate-spin text-muted-foreground" />

    if (!data) return null

    const { name, image, email } = data;
    // fallback will be first char of the name or email
    const avatarFallback = name?.charAt(0).toUpperCase() || email?.charAt(0).toUpperCase();

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-10 hover:opacity-75 transition">
                    <AvatarImage src={image} alt={name} />
                    <AvatarFallback className="bg-indigo-500">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-60">
                <DropdownMenuItem onClick={() => {
                    void signOut()
                }}>
                    <div className="flex flex-col space-y-2">
                        <p className="text-sm font-medium">{name}</p>
                        <p className="text-xs text-muted-foreground">{email}</p>
                    </div>
                    <LogOutIcon className="size-4" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}