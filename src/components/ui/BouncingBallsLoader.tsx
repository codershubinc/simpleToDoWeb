import React from "react";

const BouncingBallsLoader: React.FC = () => (
    <div className="flex items-center justify-center space-x-2 h-16">
        <div className="w-4 h-4 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.32s]"></div>
        <div className="w-4 h-4 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.16s]"></div>
        <div className="w-4 h-4 bg-slate-600 rounded-full animate-bounce"></div>
    </div>
);

export default BouncingBallsLoader;
