import { ArrowRight } from "lucide-react";
import React from "react";

interface propTypes {
    onClick: () => void
    title: string;
    subtitle: string;
    icon: React.ReactNode;
}

const ActionCard = ({ onClick, title, subtitle, icon }: propTypes) => {
    return (
        <button onClick={onClick}
            className="group cursor-pointer rounded-3xl border border-green-100 bg-white p-7 shadow-md hover:shadow-xl hover:border-green-300 hover:-translate-y-1 transition-all"
        >
            <div className="flex justify-between items-start">

                <div>

                    <div className="mb-5 inline-flex rounded-2xl bg-green-100 p-4 text-green-800 group-hover:bg-green-800 group-hover:text-white transition">
                        {icon}
                    </div>

                    <h3 className="text-2xl font-semibold text-green-900">
                        {title}
                    </h3>

                    <p className="mt-2 text-gray-500 leading-6">
                        {subtitle}
                    </p>

                </div>

                <ArrowRight className="text-green-700 group-hover:translate-x-1 transition" />

            </div>
        </button>
    );
};

export default ActionCard