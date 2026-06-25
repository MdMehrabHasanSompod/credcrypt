import React from "react";

interface propTypes {
    title: string;
    value: number;
    icon: React.ReactNode;
}

const StatsCard = ({ title, value, icon }: propTypes) => {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-green-100 bg-white p-6 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all">

            <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-green-100 translate-x-8 -translate-y-8 group-hover:scale-125 transition" />

            <div className="relative">

                <div className="flex justify-between items-center">

                    <div>

                        <p className="text-sm text-gray-500">
                            {title}
                        </p>

                        <h3 className="text-4xl font-bold text-green-900 mt-3">
                            {value}
                        </h3>

                    </div>

                    <div className="rounded-2xl bg-green-100 p-4 text-green-800 group-hover:rotate-12 transition">
                        {icon}
                    </div>

                </div>

            </div>

        </div>
    );
};

export default StatsCard;