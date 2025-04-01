
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

export type InvoiceData = {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  
  // Sender info
  fromName: string;
  fromAddress: string;
  fromCity: string;
  fromPostalCode: string;
  fromCountry: string;
  fromEmail: string;
  fromPhone: string;
  fromTaxId: string;
  
  // Client info
  toName: string;
  toAddress: string;
  toCity: string;
  toPostalCode: string;
  toCountry: string;
  toEmail: string;
  toPhone: string;
  toTaxId: string;
  
  // Items
  items: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
  
  // Tax and totals
  taxRate: number;
  notes: string;
}

type InvoiceFormProps = {
  onSubmit: (data: InvoiceData) => void;
  invoiceData: InvoiceData;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>;
}

const InvoiceForm = ({ onSubmit, invoiceData, setInvoiceData }: InvoiceFormProps) => {
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (value: string, name: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...invoiceData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: field === 'description' ? value : Number(value)
    };
    
    setInvoiceData((prev) => ({
      ...prev,
      items: newItems
    }));
  };
  
  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, price: 0 }]
    }));
  };
  
  const removeItem = (index: number) => {
    if (invoiceData.items.length === 1) {
      toast({
        title: "No se puede eliminar",
        description: "Debe haber al menos un ítem en la factura",
        variant: "destructive"
      });
      return;
    }
    
    const newItems = [...invoiceData.items];
    newItems.splice(index, 1);
    
    setInvoiceData((prev) => ({
      ...prev,
      items: newItems
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(invoiceData);
  };
  
  const today = new Date().toISOString().split('T')[0];
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const nextMonthDate = nextMonth.toISOString().split('T')[0];
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="invoiceNumber">Número de Factura</Label>
              <Input
                id="invoiceNumber"
                name="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="date">Fecha de Emisión</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={invoiceData.date}
                onChange={handleChange}
                required
                defaultValue={today}
              />
            </div>
            
            <div>
              <Label htmlFor="dueDate">Fecha de Vencimiento</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={invoiceData.dueDate}
                onChange={handleChange}
                required
                defaultValue={nextMonthDate}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sender Information */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Información del Emisor</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="fromName">Nombre o Razón Social</Label>
                <Input
                  id="fromName"
                  name="fromName"
                  value={invoiceData.fromName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="fromTaxId">NIF/CIF</Label>
                <Input
                  id="fromTaxId"
                  name="fromTaxId"
                  value={invoiceData.fromTaxId}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="fromAddress">Dirección</Label>
                <Input
                  id="fromAddress"
                  name="fromAddress"
                  value={invoiceData.fromAddress}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fromCity">Ciudad</Label>
                  <Input
                    id="fromCity"
                    name="fromCity"
                    value={invoiceData.fromCity}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="fromPostalCode">Código Postal</Label>
                  <Input
                    id="fromPostalCode"
                    name="fromPostalCode"
                    value={invoiceData.fromPostalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="fromCountry">País</Label>
                <Select 
                  value={invoiceData.fromCountry} 
                  onValueChange={(value) => handleSelectChange(value, 'fromCountry')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar país" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="España">España</SelectItem>
                    <SelectItem value="México">México</SelectItem>
                    <SelectItem value="Argentina">Argentina</SelectItem>
                    <SelectItem value="Colombia">Colombia</SelectItem>
                    <SelectItem value="Chile">Chile</SelectItem>
                    <SelectItem value="Perú">Perú</SelectItem>
                    <SelectItem value="Ecuador">Ecuador</SelectItem>
                    <SelectItem value="Venezuela">Venezuela</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="fromEmail">Email</Label>
                <Input
                  id="fromEmail"
                  name="fromEmail"
                  type="email"
                  value={invoiceData.fromEmail}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="fromPhone">Teléfono</Label>
                <Input
                  id="fromPhone"
                  name="fromPhone"
                  value={invoiceData.fromPhone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Client Information */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Información del Cliente</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="toName">Nombre o Razón Social</Label>
                <Input
                  id="toName"
                  name="toName"
                  value={invoiceData.toName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="toTaxId">NIF/CIF</Label>
                <Input
                  id="toTaxId"
                  name="toTaxId"
                  value={invoiceData.toTaxId}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="toAddress">Dirección</Label>
                <Input
                  id="toAddress"
                  name="toAddress"
                  value={invoiceData.toAddress}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="toCity">Ciudad</Label>
                  <Input
                    id="toCity"
                    name="toCity"
                    value={invoiceData.toCity}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="toPostalCode">Código Postal</Label>
                  <Input
                    id="toPostalCode"
                    name="toPostalCode"
                    value={invoiceData.toPostalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="toCountry">País</Label>
                <Select 
                  value={invoiceData.toCountry} 
                  onValueChange={(value) => handleSelectChange(value, 'toCountry')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar país" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="España">España</SelectItem>
                    <SelectItem value="México">México</SelectItem>
                    <SelectItem value="Argentina">Argentina</SelectItem>
                    <SelectItem value="Colombia">Colombia</SelectItem>
                    <SelectItem value="Chile">Chile</SelectItem>
                    <SelectItem value="Perú">Perú</SelectItem>
                    <SelectItem value="Ecuador">Ecuador</SelectItem>
                    <SelectItem value="Venezuela">Venezuela</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="toEmail">Email</Label>
                <Input
                  id="toEmail"
                  name="toEmail"
                  type="email"
                  value={invoiceData.toEmail}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="toPhone">Teléfono</Label>
                <Input
                  id="toPhone"
                  name="toPhone"
                  value={invoiceData.toPhone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Invoice Items */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Conceptos</h3>
            <Button 
              type="button" 
              variant="outline" 
              onClick={addItem}
              className="flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Añadir Concepto
            </Button>
          </div>
          
          <div className="space-y-4">
            {invoiceData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-4 border-b border-gray-100">
                <div className="md:col-span-6">
                  <Label htmlFor={`item-${index}-description`}>Descripción</Label>
                  <Input
                    id={`item-${index}-description`}
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor={`item-${index}-quantity`}>Cantidad</Label>
                  <Input
                    id={`item-${index}-quantity`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    required
                  />
                </div>
                
                <div className="md:col-span-3">
                  <Label htmlFor={`item-${index}-price`}>Precio Unitario (€)</Label>
                  <Input
                    id={`item-${index}-price`}
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    required
                  />
                </div>
                
                <div className="md:col-span-1 flex items-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <Label htmlFor="taxRate">IVA (%)</Label>
            <Select 
              value={String(invoiceData.taxRate)} 
              onValueChange={(value) => handleSelectChange(value, 'taxRate')}
            >
              <SelectTrigger className="w-full md:w-1/4">
                <SelectValue placeholder="Seleccionar IVA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0%</SelectItem>
                <SelectItem value="4">4%</SelectItem>
                <SelectItem value="10">10%</SelectItem>
                <SelectItem value="21">21%</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="mt-6">
            <Label htmlFor="notes">Notas</Label>
            <Textarea
              id="notes"
              name="notes"
              value={invoiceData.notes}
              onChange={handleChange}
              placeholder="Condiciones de pago, información adicional, etc."
              className="h-24"
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button type="submit" className="bg-brand-blue hover:bg-brand-darkBlue">
          Generar Factura
        </Button>
      </div>
    </form>
  );
};

export default InvoiceForm;
