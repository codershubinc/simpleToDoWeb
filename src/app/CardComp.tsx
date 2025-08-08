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
        <Card className="bg-[hsl(224,40%,12%)] w-full min-w-[220px] max-w-[350px] h-max mx-auto shadow-lg rounded-2xl border border-[hsl(222,20%,18%)] transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:border-accent flex flex-col justify-between">
            <div className="flex justify-end bg-[hsl(222,47%,7%)] rounded-t-2xl p-2">
                <DropDownMenuForCard id={todoCompleted} />
            </div>
            <CardHeader className="pb-2 bg-[hsl(224,40%,16%)] rounded-t-xl">
                <CardTitle className="text-base sm:text-lg md:text-xl font-semibold break-words text-foreground">{todoTitle}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2 bg-[hsl(224,40%,12%)]">
                <div className="text-xs sm:text-sm md:text-base break-words whitespace-pre-line text-muted-foreground" dangerouslySetInnerHTML={{ __html: todoMessage }} />
            </CardContent>
            <CardFooter className="bg-[hsl(224,40%,10%)] rounded-b-2xl">
                <CardDescription className="text-xs sm:text-sm text-accent-foreground">Created at {todoDate}</CardDescription>
            </CardFooter>
        </Card>
    );
}

export default CardComp;
