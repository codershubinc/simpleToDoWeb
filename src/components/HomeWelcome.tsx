"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import authService from "@/config/auth";

export default function HomeWelcome() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await authService.getCurrentUser();
                setIsLoggedIn(!!user);
            } catch {
                setIsLoggedIn(false);
            }
        };
        checkUser();
    }, []);



    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Simple Todo App!</h1>
            <p className="mb-6 text-lg text-gray-300 max-w-xl">
                Organize your tasks, stay productive, and never miss a thing. Sign up or log in to start managing your todos. If you already have an account, just log in and your todos will appear here.
            </p>
            <div className="flex gap-4">
                {!isLoggedIn && (
                    <>
                        <Link href="/login">
                            <Button variant="default">Login</Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
