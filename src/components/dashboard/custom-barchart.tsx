"use client"

import { Bar, BarChart, CartesianGrid, LabelList, LabelProps, Rectangle, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { date: "2024-01-01", performance: 0 },
    { date: "2024-02-01", performance: 89 },
    { date: "2024-03-01", performance: 20 },
    { date: "2024-04-01", performance: 73 },
    { date: "2024-05-01", performance: 100 },
    { date: "2024-06-01", performance: 40 },
]

const chartConfig = {
    performance: {
        label: "performance",
        color: "hsl(var(--accent))",
    },
} satisfies ChartConfig

export function CustomBarchart() {
    return (
        <ChartContainer config={chartConfig} className="md:h-[85%] w-full">
            <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                    top: 20,
                }}
            >
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tick={false} // Hide default x-axis labels
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="performance"
                    fill="var(--color-performance)"
                    background={{
                        fill: "var(--color-muted)",
                        radius: 10,
                    }} radius={8}
                    activeIndex={2}
                    activeBar={({ ...props }) => {
                        return (
                            <Rectangle
                                {...props}
                                fill="var(--color-primary)"
                                stroke="var(--color-primary)"
                                fillOpacity={0.8}
                            />
                        )
                    }}
                >
                    <LabelList
                        dataKey="performance"
                        position="insideBottom"
                        offset={12}
                        content={(props: LabelProps) => {
                            const { x, y, width, height, value, index } = props;

                            if (
                                x == null ||
                                y == null ||
                                width == null ||
                                height == null ||
                                index == null ||
                                value == null
                            ) {
                                return null;
                            }

                            const dateStr = chartData[index].date;
                            const weekday = new Date(dateStr).toLocaleDateString("en-US", {
                                weekday: "short",
                            });

                            const labelColor = "var(--color-secondary-foreground)";

                            return (
                                <>
                                    {/* Day Name on Top */}
                                    <text
                                        x={Number(x) + Number(width) / 2}
                                        y={Number(y) + Number(height) - 30}
                                        textAnchor="middle"
                                        fill={labelColor}
                                        fontSize={14}
                                        fontWeight={500}
                                    >
                                        {weekday}
                                    </text>

                                    {/* Value on Bottom */}
                                    <text
                                        x={Number(x) + Number(width) / 2}
                                        y={Number(y) + Number(height) - 12}
                                        textAnchor="middle"
                                        fill={"white"}
                                        fontSize={12}
                                    >
                                        {`${value}%`}
                                    </text>
                                </>
                            );
                        }}
                    />



                </Bar>
            </BarChart>
        </ChartContainer >

    )
}
