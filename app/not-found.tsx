import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
            <Image
                src="/images/error/404.svg"
                alt="404"
                className="dark:hidden"
                width={472}
                height={152}
            />
            <Image
                src="/images/error/404-dark.svg"
                alt="404"
                className="hidden dark:block"
                width={472}
                height={152}
            />
            404 - Not Found
        </div>
    )
}