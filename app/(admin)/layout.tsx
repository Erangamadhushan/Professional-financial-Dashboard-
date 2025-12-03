"use client"

import React from 'react';

// useSidebarContext
// import AppHeader 
// import Appsidebar
// backdrop layout

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen xl:flex">
            {/*
                import App sidebar

                import backdrop
            */}
            <div className={'flex-1 '}>
                {/*
                    import App header
                */}
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}