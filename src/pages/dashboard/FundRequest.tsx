
import { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";

export default function FundRequest() {
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-green-100">
                        <CreditCard className="h-6 w-6 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-medium">Fund Requests</h1>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    New Fund Request
                </button>
            </div>
            
            <div className="glass rounded-2xl border border-border overflow-hidden p-6">
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-foreground">Fund Request Management</h3>
                    <p className="text-muted-foreground mt-2">This page is under construction</p>
                </div>
            </div>
        </div>
    );
}
