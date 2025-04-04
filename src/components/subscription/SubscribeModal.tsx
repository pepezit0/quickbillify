
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import LoginModal from "../auth/LoginModal";
import { useToast } from "@/hooks/use-toast";
import { loadStripe } from "@stripe/stripe-js";
import { CreditCard } from "lucide-react";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscribeModal = ({ isOpen, onClose }: SubscribeModalProps) => {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && !user) {
      setShowLoginModal(true);
    }
  }, [isOpen, user]);

  const handleSubscribe = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: { return_url: window.location.origin }
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No se pudo crear la sesión de pago");
      }
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      toast({
        title: "Error",
        description: error.message || "Ha ocurrido un error al procesar el pago",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen && !showLoginModal} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              Suscríbete al Plan Pro
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4 space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">Plan Pro - 4€/mes</h3>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-brand-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Facturas ilimitadas</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-brand-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Personalización de facturas</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-brand-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Añadir tu logo en las facturas</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-brand-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Exportar en varios formatos (PDF, DOCX)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-brand-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Guardar datos de clientes para autocompletado</span>
                </li>
              </ul>
              
              <Button 
                className="w-full bg-brand-blue hover:bg-brand-darkBlue"
                onClick={handleSubscribe}
                disabled={loading}
              >
                <CreditCard className="mr-2" />
                {loading ? "Procesando..." : "Suscribirme ahora"}
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Tu suscripción se renovará automáticamente cada mes. Puedes cancelar en cualquier momento.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {showLoginModal && (
        <LoginModal 
          isOpen={true} 
          onClose={() => {
            setShowLoginModal(false);
            if (!user) onClose();
          }}
        />
      )}
    </>
  );
};

export default SubscribeModal;
