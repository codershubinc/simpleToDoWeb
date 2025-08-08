"use client"
import authService from '@/config/auth'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';

function SignupPage() {
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const router = useRouter()

    const signup = async (data: any) => {
        setError("");
        setSuccess("");
        try {
            const { email, password, name } = data;
            const account = await authService.createAccount({ email, password, name });
            if (account) {
                const loginUser = await authService.login({ email, password });
                if (loginUser) {
                    setSuccess("Account created! Please login.");
                    return setTimeout(() => router.push("/"), 1500);
                }
                setError("Login failed");
                setTimeout(() => router.push("/login"), 1500);

            }
        } catch (error: any) {
            setError(error.message || "Signup failed");
        }
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-black text-white p-2 sm:p-4 md:p-8'>
            <div className="flex flex-col p-2 sm:p-4 md:p-6 rounded-3xl w-full max-w-xs sm:max-w-md md:max-w-lg gap-2 sm:gap-3 justify-center items-center bg-slate-900 h-max mx-auto shadow-md shadow-slate-500">
                <p className='text-red-500 w-full text-xs sm:text-sm md:text-base'> {error ? error : " "} </p>
                <p className='text-green-500 w-full text-xs sm:text-sm md:text-base'> {success ? success : " "} </p>
                <form onSubmit={handleSubmit(signup)} className='w-full flex flex-col justify-center items-center'>
                    <h2 className='text-xl sm:text-2xl text-center mb-2'>Sign Up</h2>
                    <div className="grid w-full items-center gap-1.5 mb-2">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" placeholder="Your Name" required {...register("name")} />
                    </div>
                    <div className="grid w-full items-center gap-1.5 mb-2">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Email" required {...register("email")} />
                    </div>
                    <div className="grid w-full items-center gap-1.5 mb-2">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" placeholder="Enter password" required {...register("password")} />
                    </div>
                    <Button variant="outline" type="submit" className='w-full mt-2 sm:mt-3'>
                        Sign Up
                    </Button>
                </form>
                <div className="w-full flex justify-center mt-2">
                    <span className="text-xs sm:text-sm text-gray-400">Already have an account?{' '}
                        <a href="/login" className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400  via-red-500 to-red-300  hover:underline">Login</a>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
