import { TrendingUp, Calendar, DollarSign, Users, UserCheck, Plane, BarChart2, Briefcase } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import StatCard from "./components/StatCard";
import TransactionTable from "./components/TransactionTable";

const API_BASE_URL = "https://dashboard-server-sable.vercel.app"; // Use your API base URL

export default function DashboardHome() {
    // Fetch Stats
    const { data: stats, isLoading: isStatsLoading } = useQuery({
        queryKey: ["stats"],
        queryFn: async () => {
            const res = await fetch(`${API_BASE_URL}/stats`);
            if (!res.ok) throw new Error("Failed to fetch stats");
            return res.json();
        }
    });

    // Fetch Transactions
    const { data: transactions, isLoading: isTransactionsLoading } = useQuery({
        queryKey: ["transactions"],
        queryFn: async () => {
            const res = await fetch(`${API_BASE_URL}/transactions`);
            if (!res.ok) throw new Error("Failed to fetch transactions");
            return res.json();
        }
    });

    const flightManagement = [
        {
            title: "Recent Bookings",
            description: "View and manage recent flight bookings",
            icon: Plane,
            color: "blue"
        },
        {
            title: "Flight Analytics",
            description: "View detailed analytics and reports",
            icon: BarChart2,
            color: "green"
        },
        {
            title: "Manage Inventory",
            description: "Update flight inventory and pricing",
            icon: Briefcase,
            color: "purple"
        }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* {stats?.map((stat: any, index: number) => (
                    <StatCard 
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                        trend={stat.trend}
                        period={stat.period}
                        icon={stat.icon}
                        color={stat.color}
                        isLoading={isStatsLoading}
                        delay={index}
                    />
                ))} */}
            </div>

            {/* Flight Management Section */}
            <div className="glass rounded-2xl overflow-hidden border border-border animate-item stagger-1">
                <div className="bg-primary p-5 text-primary-foreground flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Plane size={24} />
                        <h2 className="text-xl font-medium">Flight Management</h2>
                    </div>
                    <button className="bg-white text-primary px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors">
                        View All
                    </button>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {flightManagement.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <div 
                                    key={item.title}
                                    className={`bg-background rounded-xl p-5 hover:shadow-md transition-all cursor-pointer border border-border animate-item stagger-${index + 1}`}
                                >
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className={`bg-${item.color}-100 p-2 rounded-lg`}>
                                            <IconComponent size={20} className={`text-${item.color}-600`} />
                                        </div>
                                        <h3 className="font-medium">{item.title}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="glass rounded-2xl overflow-hidden border border-border animate-item stagger-2">
                <div className="p-5 border-b border-border flex items-center justify-between">
                    <h2 className="text-xl font-medium text-foreground">Recent Transactions</h2>
                    <button className="text-primary hover:text-primary/80 text-sm hover:underline transition-colors">
                        View All
                    </button>
                </div>
                <TransactionTable transactions={transactions || []} isLoading={isTransactionsLoading} />
            </div>
        </div>
    );
}
