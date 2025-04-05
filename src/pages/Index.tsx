
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/auth/LoginModal";
import SubscribeModal from "@/components/subscription/SubscribeModal";

const Index = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const { user } = useAuth();

  const handleSubscribeClick = () => {
    if (user) {
      setShowSubscribeModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section - Updated with dark gradient background */}
        <section className="bg-gradient-to-r from-[#0f1115] via-[#1c1f26] to-[#2b2e35] py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Genera facturas profesionales en segundos
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Ideal para freelancers, diseñadores, programadores, copywriters y más
            </p>
            <Button 
              size="lg" 
              className="bg-white text-[#1c1f26] hover:bg-gray-100 px-8 py-6 text-lg font-medium shadow-md"
              onClick={() => navigate("/crear-factura")}
            >
              Probar gratis ahora
            </Button>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
              <div className="bg-[#2c3e50] rounded-lg p-4 shadow-md backdrop-blur-sm">
                <p className="font-semibold text-lg">+500 usuarios la usan cada semana</p>
              </div>
              <div className="bg-[#2c3e50] rounded-lg p-4 shadow-md backdrop-blur-sm">
                <p className="font-semibold text-lg">100% personalizable</p>
              </div>
              <div className="bg-[#2c3e50] rounded-lg p-4 shadow-md backdrop-blur-sm">
                <p className="font-semibold text-lg">Sin registros molestos</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section - Updated styling */}
        <section id="caracteristicas" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Todo lo que necesitas para tus facturas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-[#1c1f26]/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1c1f26]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Factura rápidamente</h3>
                <p className="text-gray-600">
                  Crea facturas profesionales en cuestión de segundos con nuestra interfaz intuitiva.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-[#1c1f26]/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1c1f26]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Personalización total</h3>
                <p className="text-gray-600">
                  Adapta las facturas a tu marca con opciones de personalización de colores y logotipos.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-[#1c1f26]/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1c1f26]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Exportación sencilla</h3>
                <p className="text-gray-600">
                  Descarga tus facturas en formato PDF o DOCX en un solo clic y envíalas a tus clientes.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section - Updated styling */}
        <section id="precios" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
              Planes simples y sin sorpresas
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Elige el plan que mejor se adapte a tus necesidades
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all hover:shadow-lg">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Gratis</h3>
                  <p className="text-gray-600 mb-4">Perfecto para empezar</p>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-gray-800">0€</span>
                    <span className="text-gray-500 ml-2">para siempre</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#1c1f26] shrink-0 mr-2" />
                      <span className="text-gray-600">1 factura</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#1c1f26] shrink-0 mr-2" />
                      <span className="text-gray-600">Exportación a PDF</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#1c1f26] shrink-0 mr-2" />
                      <span className="text-gray-600">Sin necesidad de registro</span>
                    </li>
                  </ul>
                  
                  <Button 
                    className="w-full bg-[#1c1f26] hover:bg-[#2b2e35] text-white shadow-md"
                    onClick={() => navigate("/crear-factura")}
                  >
                    Probar gratis
                  </Button>
                </div>
              </div>
              
              {/* Pro Plan */}
              <div className="bg-white rounded-lg shadow-md border-2 border-[#1c1f26] overflow-hidden transition-all hover:shadow-lg relative">
                <div className="absolute top-0 right-0 bg-[#1c1f26] text-white text-xs font-bold px-3 py-1 uppercase">
                  Popular
                </div>
                
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Pro</h3>
                  <p className="text-gray-600 mb-4">Para profesionales</p>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-gray-800">4€</span>
                    <span className="text-gray-500 ml-2">/mes</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#1c1f26] shrink-0 mr-2" />
                      <span className="text-gray-600">Facturas ilimitadas</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#1c1f26] shrink-0 mr-2" />
                      <span className="text-gray-600">Personalización completa</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#1c1f26] shrink-0 mr-2" />
                      <span className="text-gray-600">Guardar datos de clientes</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#1c1f26] shrink-0 mr-2" />
                      <span className="text-gray-600">Exportación a PDF y DOCX</span>
                    </li>
                  </ul>
                  
                  <Button 
                    className="w-full bg-[#1c1f26] hover:bg-[#2b2e35] text-white shadow-md"
                    onClick={handleSubscribeClick}
                  >
                    Suscribirse
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* Modals */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
      <SubscribeModal 
        isOpen={showSubscribeModal} 
        onClose={() => setShowSubscribeModal(false)} 
      />
    </div>
  );
};

export default Index;
