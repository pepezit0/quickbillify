
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ProfileButton from "./auth/ProfileButton";
import LoginModal from "./auth/LoginModal";
import SubscribeModal from "./subscription/SubscribeModal";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const navigate = useNavigate();
  const { user, isSubscribed } = useAuth();

  const handleSubscribeClick = () => {
    if (user) {
      setShowSubscribeModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <header className="bg-white py-4 border-b border-gray-100">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-brand-blue flex items-center">
            <span className="mr-1">Quick</span>
            <span className="text-brand-darkBlue">Bill</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="#caracteristicas" className="text-gray-700 hover:text-brand-blue transition-colors">
            Características
          </a>
          <a href="#precios" className="text-gray-700 hover:text-brand-blue transition-colors">
            Precios
          </a>
          {!isSubscribed && (
            <Button 
              variant="default" 
              className="bg-brand-blue hover:bg-brand-darkBlue text-white"
              onClick={handleSubscribeClick}
            >
              {user ? "Suscribirse" : "Probar gratis"}
            </Button>
          )}
          {user ? (
            <ProfileButton />
          ) : (
            <Button 
              variant="outline" 
              className="border-gray-300" 
              onClick={() => setShowLoginModal(true)}
            >
              Iniciar sesión
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow-md animate-fade-in">
          <nav className="flex flex-col space-y-4 py-2">
            <a 
              href="#caracteristicas" 
              className="text-gray-700 hover:text-brand-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Características
            </a>
            <a 
              href="#precios" 
              className="text-gray-700 hover:text-brand-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Precios
            </a>
            {!isSubscribed && (
              <Button 
                variant="default" 
                className="bg-brand-blue hover:bg-brand-darkBlue text-white w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSubscribeClick();
                }}
              >
                {user ? "Suscribirse" : "Probar gratis"}
              </Button>
            )}
            {user ? (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  navigate("/profile");
                  setMobileMenuOpen(false);
                }}
              >
                Mi Perfil
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowLoginModal(true);
                }}
              >
                Iniciar sesión
              </Button>
            )}
          </nav>
        </div>
      )}

      {/* Modals */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <SubscribeModal isOpen={showSubscribeModal} onClose={() => setShowSubscribeModal(false)} />
    </header>
  );
};

export default Header;
