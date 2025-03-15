
import { useState } from "react";
import { Bell, Search, Settings, ChevronDown, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    
    // Get user data from localStorage (in a real app, this would come from context)
    const userData = {
        name: "John",
        balance: 100
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
        // Implement search functionality
    };

    return (
        <header className="bg-card shadow-sm z-10 border-b border-border">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-medium text-foreground">Dashboard</h1>
                </div>
                
                <div className="flex items-center space-x-4">
                    {/* Search */}
                    <form onSubmit={handleSearch} className="relative hidden md:block">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search size={18} className="text-muted-foreground" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="Search..."
                        />
                    </form>

                    {/* Notifications */}
                    <button className="p-2 rounded-full hover:bg-accent transition-colors relative" aria-label="Notifications">
                        <Bell size={20} className="text-foreground" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
                    </button>

                    {/* Settings */}
                    <button className="p-2 rounded-full hover:bg-accent transition-colors" aria-label="Settings">
                        <Settings size={20} className="text-foreground" />
                    </button>

                    {/* User Menu */}
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors">
                            <span>{userData.name}</span>
                            <ChevronDown size={16} />
                        </button>
                        <div className="flex items-center space-x-1 bg-accent text-accent-foreground px-3 py-1.5 rounded-lg">
                            <DollarSign size={16} />
                            <span>{userData.balance}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
