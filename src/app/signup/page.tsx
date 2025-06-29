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
                setSuccess("Account created! Please login.");
                setTimeout(() => router.push("/login"), 1500);
            }
        } catch (error: any) {
            setError(error.message || "Signup failed");
        }
    }

    return (
        <div className='flex min-h-screen items-center justify-between p-24 bg-black text-white'>
            <div className="flex flex-col p-3 rounded-3xl w-max min-w-[350px] gap-1.5 justify-center items-center bg-slate-900 h-max mx-auto shadow-md shadow-slate-500">
                <p className='text-red-500 w-[300px]'> {error ? error : " "} </p>
                <p className='text-green-500 w-[300px]'> {success ? success : " "} </p>
                <form onSubmit={handleSubmit(signup)} className='min-w-[90%] w-max mx-auto flex flex-col justify-center items-center'>
                    <h2 className='text-2xl text-center'>Sign Up</h2>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" placeholder="Your Name" required {...register("name")} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Email" required {...register("email")} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" placeholder="Enter password" required {...register("password")} />
                    </div>
                    <Button variant="outline" type="submit" className='w-full mt-3'>
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default SignupPage
