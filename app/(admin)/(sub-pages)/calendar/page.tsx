import { Metadata } from "next";
import React from "react";

import Calendar from "@/components/calendar/Calendar";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";


export const metadata: Metadata = {
    title: "Dashboard Calender ",
    description: "Dashboard Calender ",
}

export default function Page() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Calendar" />
            <Calendar />
        </div>
    )
}