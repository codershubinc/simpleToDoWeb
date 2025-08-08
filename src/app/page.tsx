'use client';
import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import CreateTodo from "./CreateTodo";
import todoDBConfig from "@/config/todoDBConfig";
import authService from "@/config/auth";
import { Button } from "@/components/ui/button";
import CardComp from "./CardComp";
import Link from "next/link";
import HomeWelcome from "../components/HomeWelcome";
import { useRouter } from 'next/navigation'

export default function Home() {
  const [allTodoDocs, setAllTodoDocs] = useState<any[]>([]);
  const [addTodo, setAddTodo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Fetch all todos for the current user
  useEffect(() => {
    setLoading(true);
    const fetchTodoDocs = async () => {
      try {
        const user = await authService.getCurrentUser();
        console.log('user', user);

        if (user) {
          const todoDocsResult = await todoDBConfig.listAllTodos(user?.$id);
          setIsLoggedIn(true);
          setAllTodoDocs(todoDocsResult.documents);
          setLoading(false);
        }
        setLoading(false);
        console.log('Fetched todos:', allTodoDocs);

      } catch (error) {
        setLoading(false);
        setIsLoggedIn(false);
        console.log('Error at fetching todos:', error);

      }
    };

    fetchTodoDocs();
  }, []);
  const handleLogOI = async () => {

    if (!isLoggedIn) return router.push('/login');
    setIsLoggedIn(false);
    setLoading(true);
    await authService.logout();
    window.location.reload();
  };


  if (loading) {
    return <Button
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      variant={'secondary'}
    >
      Loading ........
    </Button>;
  }


  // Always show HomeWelcome at the top, regardless of user state
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full min-h-screen bg-gray-900 p-2 sm:p-4 md:p-6 lg:p-8 overflow-y-auto flex flex-col">
        <HomeWelcome />
        <motion.div
          className="flex fixed top-0 left-0 bg-black h-[50px] w-full items-center px-2 sm:px-4 shadow-lg z-50"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <motion.h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight mr-2 sm:mr-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>{isLoggedIn ? 'Your Todos' : 'Welcome to Your Todo App'}</motion.h1>
          {isLoggedIn && (
            <Link href="/createtodo">
              <motion.span whileHover={{ scale: 1.2, rotate: 20 }} className="text-xl sm:text-2xl cursor-pointer mx-1 sm:mx-2">➕</motion.span>
            </Link>
          )}
          <div className="flex-1" />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <Button
              variant="destructive"
              onClick={handleLogOI}
              className="bg-red-600 hover:bg-red-700 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
            >{isLoggedIn ? 'Logout' : 'Login'}</Button>
          </motion.div>
        </motion.div>
        <div className="flex-1 flex flex-col justify-center items-center w-full mt-[60px]">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl px-2 sm:px-4 mx-auto"
          >
            {allTodoDocs.map((todo) => (
              <div
                key={todo.$id}
                className="transition-transform duration-200 hover:scale-105 hover:shadow-xl"
              >
                <CardComp
                  todoTitle={todo.todoTitle}
                  todoMessage={todo.todoMessage.replace(/(?:\r\n|\r|\n)/g, '<br>')}
                  todoDate={todo.date}
                  todoCompleted={todo.$id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {addTodo && <CreateTodo todo={null} display={addTodo} />}
    </div>
  );
}
