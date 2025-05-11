
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Menu, X, User, Triangle } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Triangle className="h-6 w-6 text-eventx-purple fill-eventx-orange stroke-eventx-purple" />
          <span className="text-2xl font-bold text-eventx-purple">Event<span className="text-eventx-orange">X</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/events" className="text-gray-700 hover:text-eventx-purple">
            Explore Events
          </Link>
          {user?.role === "organizer" && (
            <Link to="/create-event" className="text-gray-700 hover:text-eventx-purple">
              Create Event
            </Link>
          )}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-gray-700 hover:text-eventx-purple">
                Dashboard
              </Link>
              <div className="flex items-center gap-2">
                <Link to="/profile" className="flex items-center gap-1 text-gray-700 hover:text-eventx-purple">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-eventx-purple hover:bg-eventx-dark-purple" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white shadow-md z-50 p-4">
          <div className="flex flex-col gap-4">
            <Link 
              to="/events" 
              className="text-gray-700 hover:text-eventx-purple py-2"
              onClick={toggleMenu}
            >
              Explore Events
            </Link>
            {user?.role === "organizer" && (
              <Link 
                to="/create-event" 
                className="text-gray-700 hover:text-eventx-purple py-2"
                onClick={toggleMenu}
              >
                Create Event
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-eventx-purple py-2"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center gap-1 text-gray-700 hover:text-eventx-purple py-2"
                  onClick={toggleMenu}
                >
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="w-full"
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  asChild 
                  className="w-full"
                  onClick={toggleMenu}
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button 
                  className="w-full bg-eventx-purple hover:bg-eventx-dark-purple" 
                  asChild
                  onClick={toggleMenu}
                >
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
