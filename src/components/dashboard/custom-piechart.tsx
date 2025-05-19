"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const rawData = [
    { goal: "summer_body", hours: 2 },
    { goal: "remote_job", hours: 3 },
    { goal: "built_tren", hours: 1 },
    { goal: "learn_guitar", hours: 3 },
    { goal: "other", hours: 3.4 },
]

const chartConfig = {
    hours: { label: "Summer Body" },
    summer_body: { label: "Remote Job" },
    remote_job: { label: "Built Tren" },
    built_tren: { label: "Learn Guitar" },
    learn_guitar: { label: "Summer body" },
    other: { label: "Other" },
} satisfies ChartConfig

export function CustomPiechart() {
    const [chartData, setChartData] = React.useState<typeof rawData>([])

    React.useEffect(() => {
        const root = getComputedStyle(document.documentElement)
        const primaryHSL = root.getPropertyValue("--primary") // expects "240 100% 50%"

        const [h, s, l] = primaryHSL
            .trim()
            .split(" ")
            .map((v, i) => (i === 0 ? parseInt(v) : parseFloat(v)))

        const generateShade = (index: number, total: number) => {
            // Adjust lightness by small steps
            const step = 10 // percent
            const lightness = Math.max(15, Math.min(85, l + (index - total / 2) * step))
            return `hsl(${h}, ${s}%, ${lightness}%)`
        }

        const shadedData = rawData.map((item, index) => ({
            ...item,
            fill: generateShade(index, rawData.length),
        }))

        setChartData(shadedData)
    }, [])

    const totalVisitors = React.useMemo(() => {
        return rawData.reduce((acc, curr) => acc + curr.hours, 0)
    }, [])

    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[95%] w-full"
        >
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={chartData}
                    dataKey="hours"
                    nameKey="goal"
                    innerRadius={80}
                    strokeWidth={3}
                    paddingAngle={2}
                    cornerRadius={6}
                >
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-3xl font-bold"
                                        >
                                            {totalVisitors.toLocaleString()}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className="fill-muted-foreground"
                                        >
                                            Hours
                                        </tspan>
                                    </text>
                                )
                            }
                        }}
                    />
                </Pie>
            </PieChart>
        </ChartContainer>
    )
}
