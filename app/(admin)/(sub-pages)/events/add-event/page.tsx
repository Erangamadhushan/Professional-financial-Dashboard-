import type { Metadata } from "next";
import React from 'react';

export const metadata: Metadata = {
    title: "Financial Dashboard",
    description: "For better financial experience"
}

export default function AddEvent() {
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-6 xl:col-span-7">
                {/*
                    Ecommerce Metrics Component

                    MonthlyIncodeChart
                */}
            </div>

            <div className="col-span-12 xl:col-span-5">
                {/*
                    MonthlyTarget
                 */}
            </div>

            <div className="col-span-12">
                {/*
                    StatisticsChart
                */} 
            </div>

            <div className="col-span-12">
                {/*
                    Recent Transactions
                */} 
            </div>
        </div>
    )
}