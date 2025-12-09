import React from 'react';
interface Notification {
    time: Date,
    message: string
}
const notification: Notification[] = [];
export default function SidebarWidget() {
    return (
        <div className={`mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/3`}>
            {
                notification.length > 0 ?
                (
                    <div></div>
                ):(
                    <div className="text-white">No Notification Found</div>
                )
            }
        </div>
    )
}