'use client'
import authService from '@/config/auth'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Page() {
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const router = useRouter()

    const login = async (data: any) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    console.log("userData", userData)
                    router.push("/")
                }
            }
        } catch (error: any) {
            setError(error.message)
        }
    }
    return (
        <div className='flex min-h-screen items-center justify-center bg-black text-white p-2 sm:p-4 md:p-8'>
            <div className="flex flex-col p-2 sm:p-4 md:p-6 rounded-3xl w-full max-w-xs sm:max-w-md md:max-w-lg gap-2 sm:gap-3 justify-center items-center bg-slate-900 h-max mx-auto shadow-md shadow-slate-500">
                <p className='text-red-500 w-full text-xs sm:text-sm md:text-base'> {error ? error : " "} </p>
                <form onSubmit={handleSubmit(login)} className='w-full flex flex-col justify-center items-center'>
                    <h2 className='text-xl sm:text-2xl text-center mb-2'>Login</h2>
                    <div className="grid w-full items-center gap-1.5 mb-2">
                        <Label htmlFor="email">Email</Label>
                        <Input type="text" id="email" placeholder="Email" required {...register("email")} />
                    </div>
                    <div className="grid w-full items-center gap-1.5 mb-2">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" placeholder="Enter password" required {...register("password")} />
                    </div>
                    <Button variant="outline" type="submit" className='w-full mt-2 sm:mt-3'>
                        Login
                    </Button>
                </form>
                <div className="w-full flex justify-center mt-2">
                    <span className="text-xs sm:text-sm text-gray-400">Don&#39;t have an account?{' '}
                        <a href="/signup" className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400  via-red-500 to-red-300 hover:underline">Sign Up</a>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Page