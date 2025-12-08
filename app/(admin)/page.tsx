import type { Metadata } from "next";
import React from 'react';

import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlyIncomeChart from "@/components/ecommerce/MonthlyIncomeChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";


export const metadata: Metadata = {
    title: "Financial Dashboard",
    description: "For better financial experience"
}

export default function EcommerceView() {
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-6 xl:col-span-7">
                
                <EcommerceMetrics />

                <MonthlyIncomeChart />

            </div>

            <div className="col-span-12 xl:col-span-5">
                
                <MonthlyTarget />

            </div>

            <div className="col-span-12">
                
                <StatisticsChart />

            </div>

            <div className="col-span-12">

                <RecentOrders />

            </div>
            <div className="text-center text-white">
                Dashboard
            </div>
        </div>
        
    );
}