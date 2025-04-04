import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    PieChart,
    Users,
    UserCheck,
    CreditCard,
    DollarSign,
    Calendar,
    LogOut,
    User,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [expandedMenu, setExpandedMenu] = useState(""); // Only one expanded menu at a time
    const location = useLocation();
    const navigate = useNavigate();

    // Get current path for active menu highlighting
    const currentPath = location.pathname.split("/")[2] || ""; // Get the part after /dashboard/

    // Redirect to default dashboard on mount
    useEffect(() => {
        if (!currentPath) {
            navigate("/dashboard"); // Navigate to default dashboard
        }
    }, [currentPath, navigate]);

    // Close all other sections when Dashboard is clicked
    const handleDashboardClick = () => {
        setExpandedMenu(""); // Close expanded menus
        navigate("/dashboard");
    };

    // Toggle menu expansion (only one open at a time)
    const toggleMenu = (menu: string) => {
        setExpandedMenu(expandedMenu === menu ? "" : menu);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        toast({
            title: "Logging out",
            description: "Please wait...",
        });

        setTimeout(() => {
            localStorage.removeItem("adminToken");
            toast({
                title: "Logged out successfully",
                description: "You have been logged out from the system",
            });
            navigate("/");
        }, 800);
    };

    return (
        <div
            className={`${
                isSidebarOpen ? "w-64" : "w-20"
            } bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out flex flex-col shadow-lg z-30`}
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <User size={20} className="text-white" />
                    </div>
                    {isSidebarOpen && <span className="font-medium text-base">Admin Panel</span>}
                </div>
                <button
                    onClick={toggleSidebar}
                    className="p-1.5 rounded-full hover:bg-sidebar-accent/80 transition-colors"
                    aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>

            {/* Sidebar Menu */}
            <div className="flex-1 overflow-y-auto py-4 px-3">
                <ul className="space-y-2">
                    {/* Dashboard */}
                    <li>
                        <button
                            onClick={handleDashboardClick}
                            className={`flex items-center w-full p-2.5 rounded-lg ${
                                currentPath === "" ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/50"
                            } transition-colors`}
                        >
                            <PieChart size={20} className="min-w-5" />
                            {isSidebarOpen && <span className="ml-3">Dashboard</span>}
                        </button>
                    </li>

                    {/* Reports */}
                    <li>
                        <button
                            onClick={() => toggleMenu("report")}
                            className={`flex items-center justify-between w-full p-2.5 rounded-lg ${
                                expandedMenu === "report" ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/50"
                            } transition-colors`}
                        >
                            <div className="flex items-center">
                                <PieChart size={20} className="min-w-5" />
                                {isSidebarOpen && <span className="ml-3">Reports</span>}
                            </div>
                            {isSidebarOpen && (
                                <ChevronDown
                                    size={16}
                                    className={`transform transition-transform ${
                                        expandedMenu === "report" ? "rotate-180" : ""
                                    }`}
                                />
                            )}
                        </button>

                        {/* Submenu */}
                        {expandedMenu === "report" && isSidebarOpen && (
                            <ul className="pl-6 mt-2 space-y-1.5">
                                <li>
                                    <Link
                                        to="/dashboard/fund-report"
                                        className="flex items-center p-2.5 rounded-lg hover:bg-sidebar-accent/50 transition-colors"
                                    >
                                        <DollarSign size={16} />
                                        <span className="ml-3">Fund Report</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/booking-report"
                                        className="flex items-center p-2.5 rounded-lg hover:bg-sidebar-accent/50 transition-colors"
                                    >
                                        <Calendar size={16} />
                                        <span className="ml-3">Booking Report</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/transaction-report"
                                        className="flex items-center p-2.5 rounded-lg hover:bg-sidebar-accent/50 transition-colors"
                                    >
                                        <CreditCard size={16} />
                                        <span className="ml-3">Transaction Report</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Customer List */}
                    <li>
                        <Link
                            to="/dashboard/customers"
                            className={`flex items-center p-2.5 rounded-lg ${
                                currentPath === "customers" ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/50"
                            } transition-colors`}
                        >
                            <Users size={20} className="min-w-5" />
                            {isSidebarOpen && <span className="ml-3">Customer List</span>}
                        </Link>
                    </li>

                    {/* Agent List */}
                    <li>
                        <Link
                            to="/dashboard/agents"
                            className={`flex items-center p-2.5 rounded-lg ${
                                currentPath === "agents" ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/50"
                            } transition-colors`}
                        >
                            <UserCheck size={20} className="min-w-5" />
                            {isSidebarOpen && <span className="ml-3">Agent List</span>}
                        </Link>
                    </li>

                    {/* Fund Request */}
                    <li>
                        <Link
                            to="/dashboard/fund-request"
                            className={`flex items-center p-2.5 rounded-lg ${
                                currentPath === "fund-request" ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/50"
                            } transition-colors`}
                        >
                            <CreditCard size={20} className="min-w-5" />
                            {isSidebarOpen && <span className="ml-3">Fund Request</span>}
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-sidebar-border">
                <button
                    onClick={handleLogout}
                    className={`flex items-center w-full p-2.5 rounded-lg hover:bg-sidebar-accent/50 transition-colors`}
                >
                    <LogOut size={20} />
                    {isSidebarOpen && <span className="ml-3">Logout</span>}
                </button>
            </div>
        </div>
    );
}
