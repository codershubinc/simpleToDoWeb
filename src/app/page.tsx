'use client';
import { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import todoDBConfig from "@/config/todoDBConfig";
import authService from "@/config/auth";
import { Button } from "@/components/ui/button";
import CardComp from "./CardComp";
import Link from "next/link";
import HomeWelcome from "../components/HomeWelcome";

export default function Home() {
  const [allTodoDocs, setAllTodoDocs] = useState<any[]>([]);
  const [addTodo, setAddTodo] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all todos for the current user
  useEffect(() => {
    setLoading(true);
    const fetchTodoDocs = async () => {
      try {
        const user = await authService.getCurrentUser();
        console.log('user', user);

        if (user != null) {
          const todoDocsResult = await todoDBConfig.listAllTodos(user.$id);
          setAllTodoDocs(todoDocsResult.documents);
          setLoading(false);
        }
        setLoading(false);
        console.log('Fetched todos:', allTodoDocs);

      } catch (error) {
        setLoading(false);
        console.log('Error at fetching todos:', error);

      }
    };

    fetchTodoDocs();
  }, []);
  const handleLogout = async () => {
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
    <div className="flex min-h-screen items-center justify-between bg-black text-white">
      <div className="w-full h-screen bg-gray-900 p-4 overflow-y-auto">
        <HomeWelcome />
        <div className="flex  fixed top-0 left-0  bg-black h-[50px] w-full">
          <h1 className="text-2xl">All Todos</h1>
          <Link href="/createtodo">
            ➕
          </Link>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 top-0 right-0 z-50 sticky"
          >Logout</Button>
        </div>
        <div>
          <div
            className="flex flex-wrap mt-[40px] h-[90vh]  w-full  "
          >
            {allTodoDocs.map((todo) => (
              <CardComp
                key={todo.$id}
                todoTitle={todo.todoTitle}
                todoMessage={todo.todoMessage.replace(/(?:\r\n|\r|\n)/g, '<br>')}
                todoDate={todo.date}
                todoCompleted={todo.$id}
              />
            ))}
          </div>
        </div>
      </div>
      {addTodo && <CreateTodo todo={null} display={addTodo} />}
    </div>
  );
}
