
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    trend: "up" | "down";
    period: string;
    icon: LucideIcon;
    color: string;
    isLoading: boolean;
    delay: number;
}

export default function StatCard({ 
    title, 
    value, 
    change, 
    trend, 
    period, 
    icon: Icon, 
    color, 
    isLoading,
    delay 
}: StatCardProps) {
    const colorMap = {
        blue: "bg-blue-100 text-blue-600",
        green: "bg-green-100 text-green-600",
        purple: "bg-purple-100 text-purple-600",
        orange: "bg-orange-100 text-orange-600",
    };

    const iconClass = colorMap[color as keyof typeof colorMap] || colorMap.blue;
    const delayClass = `stagger-${delay + 1}`;
    
    return (
        <div className={`glass rounded-2xl p-6 border border-border hover:shadow-md transition-all animate-item ${delayClass}`}>
            {isLoading ? (
                <div className="animate-pulse space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <div className="h-4 bg-muted rounded w-24"></div>
                            <div className="h-7 bg-muted rounded w-16"></div>
                            <div className="h-3 bg-muted rounded w-32"></div>
                        </div>
                        <div className="h-12 w-12 rounded-lg bg-muted"></div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">{title}</p>
                        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
                        <p className={`text-xs ${trend === "up" ? "text-green-500" : "text-red-500"} mt-1 flex items-center`}>
                            <TrendingIcon trend={trend} />
                            {change} {period}
                        </p>
                    </div>
                    <div className={`${iconClass} p-3 rounded-lg`}>
                        <Icon size={24} />
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper component for trend icon
function TrendingIcon({ trend }: { trend: "up" | "down" }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-1"
        >
            {trend === "up" ? (
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            ) : (
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
            )}
            {trend === "up" ? (
                <polyline points="17 6 23 6 23 12" />
            ) : (
                <polyline points="17 18 23 18 23 12" />
            )}
        </svg>
    );
}
