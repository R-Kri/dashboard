import {
    TrendingUp,
    Calendar,
    DollarSign,
    Users,
    UserCheck,
    Plane,
    BarChart2,
    Briefcase
} from "lucide-react";
import { useEffect, useState } from "react";
import StatCard from "./components/StatCard";
import TransactionTable from "./components/TransactionTable";

export default function DashboardHome() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate data loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const stats = [
        {
            title: "Total Bookings",
            value: "1,248",
            change: "+12%",
            trend: "up",
            period: "from last month",
            icon: Calendar,
            color: "blue"
        },
        {
            title: "Total Revenue",
            value: "$24,568",
            change: "+8.5%",
            trend: "up",
            period: "from last month",
            icon: DollarSign,
            color: "green"
        },
        {
            title: "Total Customers",
            value: "3,157",
            change: "+5.2%",
            trend: "up",
            period: "from last month",
            icon: Users,
            color: "purple"
        },
        {
            title: "Total Agents",
            value: "42",
            change: "+2",
            trend: "up",
            period: "new this month",
            icon: UserCheck,
            color: "orange"
        }
    ];

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

    // Transaction data
    const transactions = [
        {
            id: "TRX-1234",
            customer: "Alice Johnson",
            amount: "$245.00",
            status: "Completed",
            date: "2023-07-15",
        },
        { 
            id: "TRX-1235", 
            customer: "Bob Smith", 
            amount: "$189.50", 
            status: "Pending", 
            date: "2023-07-14" 
        },
        {
            id: "TRX-1236",
            customer: "Carol Williams",
            amount: "$532.25",
            status: "Completed",
            date: "2023-07-13",
        },
        {
            id: "TRX-1237",
            customer: "David Brown",
            amount: "$125.75",
            status: "Failed",
            date: "2023-07-12",
        },
        {
            id: "TRX-1238",
            customer: "Eva Davis",
            amount: "$310.00",
            status: "Completed",
            date: "2023-07-11",
        },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Stats Overview */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard 
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                        trend={stat.trend}
                        period={stat.period}
                        icon={stat.icon}
                        color={stat.color}
                        isLoading={isLoading}
                        delay={index}
                    />
                ))}
            </div> */}

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
                <TransactionTable transactions={transactions} isLoading={isLoading} />
            </div>
        </div>
    );
}
