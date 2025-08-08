"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import authService from "@/config/auth";
import { motion } from "framer-motion";

type HomeWelcomeProps = {
    hasTodos?: boolean;
};

const HomeWelcome: React.FC<HomeWelcomeProps> = ({ hasTodos = true }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await authService.getCurrentUser();
                setIsLoggedIn(!!user);
                setError(null);
            } catch (err: any) {
                setIsLoggedIn(false);
                setError(typeof err === 'string' ? err : err?.message || 'Could not check login status.');
            }
        };
        checkUser();
    }, []);

    // Show nothing for logged-in users with todos
    if (isLoggedIn && hasTodos) {
        return null;
    }

    // Message and button logic
    const message = "Organize your tasks, stay productive, and never miss a thing. Sign up or log in to start managing your todos. If you already have an account, just log in and your todos will appear here.";
    const buttonHref = isLoggedIn ? "/createtodo" : "/signup";
    const buttonText = isLoggedIn ? "Create your first todo" : "Sign Up";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-xl mx-auto mt-8"
        >
            <div className="bg-[hsl(224,40%,12%)] border border-[hsl(222,20%,18%)] rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold mb-2 text-foreground bg-[hsl(224,40%,16%)] w-full rounded-t-xl py-2">Welcome!</h2>
                <motion.p
                    className="text-base md:text-lg text-muted-foreground mb-4 bg-[hsl(224,40%,12%)] w-full py-2 rounded"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    {message}
                </motion.p>
                {error && (
                    <motion.div className="mb-2 sm:mb-4 text-red-400 font-semibold text-xs sm:text-base" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {error}
                    </motion.div>
                )}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <Link href={buttonHref} className="inline-block">
                        <button
                            className="px-6 py-2 rounded-lg bg-gradient-to-r from-slate-500 via-slate-700 to-slate-900 text-white font-semibold shadow transition-colors duration-200 hover:from-slate-600 hover:to-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                        >
                            {buttonText}
                        </button>
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default HomeWelcome;
