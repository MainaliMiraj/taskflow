"use client";

export default function TaskCardSkeleton() {
    return (
        <div
            className="relative overflow-hidden border border-slate-200 bg-white p-4 shadow-sm rounded-md animate-pulse"
        >
            {/* Floating subtle effect */}
            <div className="absolute right-4 top-4 h-16 w-16 bg-primary-200/40 blur-3xl opacity-40" />

            {/* Title Row */}
            <div className="flex items-center justify-between">
                <div className="h-6 w-40 bg-gray-200 rounded-md" />
                <div className="h-3 w-20 bg-gray-200 rounded-md" />
            </div>

            {/* Description */}
            <div className="mt-3">
                <div className="h-3 w-full bg-gray-200 rounded-md mb-2" />
                <div className="h-3 w-3/4 bg-gray-200 rounded-md" />
            </div>

            {/* Footer Priority + Date */}
            <div className="mt-4 flex items-center justify-between">
                <div className="h-6 w-24 bg-gray-200 rounded-full" />
                <div className="h-3 w-20 bg-gray-200 rounded-md" />
            </div>
        </div>
    );
}
