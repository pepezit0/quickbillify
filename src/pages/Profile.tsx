
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import SubscribeModal from "@/components/subscription/SubscribeModal";

interface InvoiceRecord {
  id: string;
  created_at: string;
  invoice_number: string;
  to_name: string;
  amount: number;
}

const Profile = () => {
  const { user, userStatus, invoicesCreated, isSubscribed } = useAuth();
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchInvoices = async () => {
      if (!user) {
        navigate("/");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("invoices")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setInvoices(data || []);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las facturas.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [user, navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* User Profile Section */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Mi Perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p>{user.email}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Tipo de plan</h3>
                <div className="flex items-center mt-1">
                  <Badge variant={isSubscribed ? "default" : "outline"}>
                    {isSubscribed ? "Suscrito (Activo)" : "Gratuito"}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Facturas creadas</h3>
                <p>
                  {invoicesCreated} {!isSubscribed && `/ ${user ? "5" : "1"}`}
                </p>
                {!isSubscribed && (
                  <div className="text-xs text-gray-500 mt-1">
                    {user
                      ? "Plan gratuito limitado a 5 facturas."
                      : "Sin cuenta solo puedes crear 1 factura."}
                  </div>
                )}
              </div>

              {!isSubscribed && (
                <Button
                  className="w-full mt-4 bg-brand-blue hover:bg-brand-darkBlue"
                  onClick={() => setShowSubscribeModal(true)}
                >
                  Suscribirse al Plan Pro
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Invoice History Section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Historial de Facturas</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Cargando facturas...</div>
              ) : invoices.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No has creado ninguna factura todavía.
                  <div className="mt-4">
                    <Button onClick={() => navigate("/crear-factura")}>
                      Crear mi primera factura
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 text-left">Nº Factura</th>
                        <th className="py-2 text-left">Cliente</th>
                        <th className="py-2 text-left">Fecha</th>
                        <th className="py-2 text-right">Importe</th>
                        <th className="py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b">
                          <td className="py-3">{invoice.invoice_number}</td>
                          <td className="py-3">{invoice.to_name}</td>
                          <td className="py-3">
                            {formatDate(invoice.created_at)}
                          </td>
                          <td className="py-3 text-right">
                            {formatCurrency(invoice.amount)}
                          </td>
                          <td className="py-3 text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                navigate(`/ver-factura/${invoice.id}`)
                              }
                            >
                              Ver
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <SubscribeModal isOpen={showSubscribeModal} onClose={() => setShowSubscribeModal(false)} />
    </div>
  );
};

export default Profile;
