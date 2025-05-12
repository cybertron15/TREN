"use client"
import { Moon, Sun } from 'lucide-react'

import { useTheme } from 'next-themes'
import React from 'react'

function ToggleTheme() {
    const { theme, setTheme } = useTheme()
    return (
        theme === 'dark' ? (
            <Sun
                className="h-6 w-6 cursor-pointer text-muted-foreground mb-2 mx-4"
                onClick={() => setTheme('light')}
            />
        ) : (
            <Moon
                className="h-6 w-6 cursor-pointer text-muted-foreground mb-2 mx-4"
                onClick={() => setTheme('dark')}
            />
        )
    )
}      

export default ToggleTheme