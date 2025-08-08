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
        <Card className="bg-card w-full min-w-[220px] max-w-[350px] h-max mx-auto shadow-lg rounded-2xl border border-border transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:border-slate-400 flex flex-col justify-between">
            <div className="flex justify-end">
                <DropDownMenuForCard id={todoCompleted} />
            </div>
            <CardHeader className="pb-2">
                <CardTitle className="text-base sm:text-lg md:text-xl font-semibold break-words text-foreground">{todoTitle}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="text-xs sm:text-sm md:text-base break-words whitespace-pre-line text-muted-foreground" dangerouslySetInnerHTML={{ __html: todoMessage }} />
            </CardContent>
            <CardFooter>
                <CardDescription className="text-xs sm:text-sm text-slate-300">Created at {todoDate}</CardDescription>
            </CardFooter>
        </Card>
    );
}

export default CardComp;
