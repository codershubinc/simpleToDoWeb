import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import DropDownMenuForCard from './dropDownMenuForCard';


interface CardCompProps {
    todoTitle: string;
    todoMessage: string;
    todoDate: string;
    todoCompleted: string;
}

const CardComp: React.FC<CardCompProps> = ({
    todoTitle,
    todoMessage,
    todoDate,
    todoCompleted
}) => {
    console.log('todoCompleted', todoCompleted);

    return (
        <Card className="bg-slate-900 w-full min-w-[220px] max-w-[350px] h-max mx-auto shadow-md shadow-slate-500 rounded-xl border border-slate-800 transition-transform duration-200 hover:scale-105 hover:shadow-xl flex flex-col justify-between">
            <div className="flex justify-end">
                <DropDownMenuForCard id={todoCompleted} />
            </div>
            <CardHeader className="pb-2">
                <CardTitle className="text-base sm:text-lg md:text-xl font-semibold break-words">{todoTitle}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="text-xs sm:text-sm md:text-base break-words whitespace-pre-line" dangerouslySetInnerHTML={{ __html: todoMessage }} />
            </CardContent>
            <CardFooter>
                <CardDescription className="text-xs sm:text-sm text-gray-400">Created at {todoDate}</CardDescription>
            </CardFooter>
        </Card>
    );
}

export default CardComp;
