import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
            {/*
                <ThemeProvider>
                    // Rest of the things
                    {children}

                    <div className="lg:w-1/2 w-full h-full bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
                        <div className="relative items-center justify-center  flex z-1">
                            
                            // Import grid shape
                        </div>
                    </div>

                </ThemeProvider>
            */}
            {children}
        </div>
    );
}