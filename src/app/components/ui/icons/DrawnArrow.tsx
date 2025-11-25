import React from 'react'

export const DrawnArrow = ({ className }: { className?: string }) => {
    return (
        <svg
            width="100"
            height="40"
            viewBox="0 0 100 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M10 20C30 10 60 10 85 20M85 20L70 10M85 20L75 28"
                stroke="#f9881f"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
