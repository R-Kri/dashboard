
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if already logged in
        const token = localStorage.getItem("adminToken");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // For demo purposes, simulate API call
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Simplified login for demo (in a real app, use proper authentication)
            if (username === "admin" && password === "password") {
                // Save token to localStorage
                localStorage.setItem("adminToken", "demo-token-12345");
                
                toast({
                    title: "Login successful",
                    description: "Welcome back to the dashboard",
                    variant: "default",
                });
                
                // Redirect to dashboard
                navigate("/dashboard");
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            toast({
                title: "Login failed",
                description: "Invalid username or password",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/90 to-primary/70 px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="w-full max-w-sm sm:max-w-md p-8 rounded-2xl glass space-y-6 animate-slide-in">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                        Admin Portal
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Enter your credentials to access the dashboard
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                                <User size={18} />
                            </div>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="pl-10 w-full p-2.5 bg-background/40 backdrop-blur-xs border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                placeholder="Username"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 w-full p-2.5 bg-background/40 backdrop-blur-xs border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                placeholder="Password"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <span className="inline-block h-4 w-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin mr-2"></span>
                            ) : null}
                            {isLoading ? "Signing in..." : "Sign In"}
                        </button>
                    </div>

                    <div className="text-center text-xs text-muted-foreground mt-6">
                        <p>Use <span className="font-medium">admin</span> / <span className="font-medium">password</span> for demo</p>
                    </div>
                </form>
            </div>
        </div>
    );
}
