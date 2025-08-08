"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import authService from "@/config/auth";
import { motion } from "framer-motion";

export default function HomeWelcome() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await authService.getCurrentUser();
                console.log("Current user:", user);
                setIsLoggedIn(!!user);
                setError(null);
            } catch (err: any) {
                setIsLoggedIn(false);
                setError(typeof err === 'string' ? err : err?.message || 'Could not check login status.');
                throw new Error("Error checking user login status: " + (err?.message || 'Unknown error'));
            }
        };
        checkUser();
    }, []);

    return (
        <motion.div
            className="flex flex-col items-center justify-center h-[70vh] sm:h-[80vh] text-center px-2 sm:px-4 md:px-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            >
                Welcome to Simple Todo App!
            </motion.h1>
            <motion.p
                className="mb-4 sm:mb-6 text-base sm:text-lg text-gray-300 max-w-xs sm:max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                Organize your tasks, stay productive, and never miss a thing. Sign up or log in to start managing your todos. If you already have an account, just log in and your todos will appear here.
            </motion.p>
            {error && (
                <motion.div className="mb-2 sm:mb-4 text-red-400 font-semibold text-xs sm:text-base" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {error}
                </motion.div>
            )}
            <motion.div className="flex gap-2 sm:gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                {!isLoggedIn && (
                    <Link href="/login">
                        <Button variant="default" asChild={false} className="px-4 py-2 text-xs sm:text-base">Login</Button>
                    </Link>
                )}
            </motion.div>
        </motion.div>
    );
}
