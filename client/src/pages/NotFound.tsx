
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/80 to-primary/60 px-4">
      <div className="glass rounded-2xl p-10 max-w-md w-full text-center animate-fade-in">
        <h1 className="text-6xl font-bold mb-6">404</h1>
        <p className="text-xl text-foreground mb-6">The page you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
