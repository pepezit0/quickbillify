
import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InvoiceForm, { InvoiceData } from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { generatePDF } from "@/services/pdfService";

const InvoiceGenerator = () => {
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);
  
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: `F-${new Date().getFullYear()}-001`,
    date: new Date().toISOString().split('T')[0],
    dueDate: (() => {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth.toISOString().split('T')[0];
    })(),
    
    // Sender info
    fromName: "",
    fromAddress: "",
    fromCity: "",
    fromPostalCode: "",
    fromCountry: "España",
    fromEmail: "",
    fromPhone: "",
    fromTaxId: "",
    
    // Client info
    toName: "",
    toAddress: "",
    toCity: "",
    toPostalCode: "",
    toCountry: "España",
    toEmail: "",
    toPhone: "",
    toTaxId: "",
    
    // Items
    items: [{ description: "", quantity: 1, price: 0 }],
    
    // Tax and totals
    taxRate: 21,
    notes: ""
  });
  
  const [activeTab, setActiveTab] = useState("form");
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleFormSubmit = (data: InvoiceData) => {
    setInvoiceData(data);
    setFormSubmitted(true);
    setActiveTab("preview");
    
    toast({
      title: "Factura generada",
      description: "Ahora puedes descargarla o modificarla",
    });
  };
  
  const handleDownloadPDF = async () => {
    try {
      await generatePDF('invoice-preview', `factura-${invoiceData.invoiceNumber}.pdf`);
      
      toast({
        title: "PDF descargado correctamente",
        description: "Tu factura ha sido descargada en formato PDF",
      });
    } catch (error) {
      console.error('Error downloading PDF:', error);
      
      toast({
        title: "Error al descargar",
        description: "Ha ocurrido un error al generar el PDF",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Generador de Facturas</h1>
          <p className="text-gray-600 mb-8">Crea, personaliza y descarga facturas profesionales de forma rápida y sencilla.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-4">
              <Tabs 
                defaultValue="form" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <TabsList className="w-full border-b border-gray-200 rounded-t-lg p-0">
                  <TabsTrigger 
                    value="form" 
                    className="flex-1 rounded-none rounded-tl-lg data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-brand-blue py-3"
                  >
                    Formulario
                  </TabsTrigger>
                  <TabsTrigger 
                    value="preview" 
                    className="flex-1 rounded-none rounded-tr-lg data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-brand-blue py-3"
                    disabled={!formSubmitted}
                  >
                    Vista Previa
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="form" className="p-6">
                  <InvoiceForm 
                    onSubmit={handleFormSubmit} 
                    invoiceData={invoiceData}
                    setInvoiceData={setInvoiceData}
                  />
                </TabsContent>
                
                <TabsContent value="preview" className="p-6">
                  {formSubmitted ? (
                    <div>
                      <div className="flex justify-end mb-4">
                        <Button 
                          onClick={handleDownloadPDF}
                          className="bg-brand-blue hover:bg-brand-darkBlue text-white"
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 mr-2" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                            />
                          </svg>
                          Descargar PDF
                        </Button>
                      </div>
                      
                      <div id="invoice-preview" ref={previewRef}>
                        <InvoicePreview invoiceData={invoiceData} />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">
                        Complete el formulario y haga clic en "Generar Factura" para ver la vista previa.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InvoiceGenerator;
