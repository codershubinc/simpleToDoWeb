'use client';
import authService from '@/config/auth';
import todoDBConfig from '@/config/todoDBConfig';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';



function Page() {
    const [todo, setTodo] = useState<any>(null)
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            todoTitle: todo?.todoTitle || '',
            todoMessage: todo?.todoMessage || '',
            todoByUser: todo?.todoByUser || '',
            isTodoCompleted: todo?.isTodoCompleted || false
        },
    });


    const [loading, setLoading] = useState(false);
    const navigate = useRouter()



    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            const user = await authService.getCurrentUser();
            console.log('user', user);

            if (todo) {
                // Update existing todo logic here
            } else {
                console.log('data', data);
                const date = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`
                console.log('date', date);

                const newTodo = await todoDBConfig.createTodo({
                    ...data,
                    todoByUser: user?.$id,
                    date: String(date)
                });
                console.log('todo', newTodo);

                setLoading(false);
                navigate.push('/')
            }
        } catch (error: any) {
            console.error('Error creating/updating todo:', error);
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white p-2 sm:p-4 md:p-8">
            <div className="flex flex-col p-2 sm:p-4 md:p-6 rounded-3xl w-full max-w-xs sm:max-w-md md:max-w-lg gap-2 sm:gap-3 justify-center items-center bg-slate-900 h-max mx-auto shadow-md shadow-slate-500 relative">
                <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-center items-center'>
                    <Button variant="outline" className='absolute top-2 right-2' onClick={() => navigate.push('/')}>❌</Button>
                    <h2 className='text-xl sm:text-2xl text-center mb-2'>{todo ? 'Update Todo' : 'Create Todo'}</h2>
                    <div className="grid w-full items-center gap-1.5 mb-2">
                        <Label htmlFor="todoTitle">Todo Title</Label>
                        <Input
                            type="text"
                            id="todoTitle"
                            placeholder="Todo Title"
                            required
                            {...register("todoTitle")}
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5 mb-2">
                        <Label htmlFor="todoMessage">Todo Message</Label>
                        <Textarea
                            id="todoMessage"
                            placeholder="Todo Message"
                            className='h-32'
                            required
                            {...register("todoMessage")}
                        />
                    </div>
                    <Button variant="outline" type="submit" className='w-full mt-2 sm:mt-3' disabled={loading}>
                        {todo ? 'Update Todo' : 'Create Todo'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Page
