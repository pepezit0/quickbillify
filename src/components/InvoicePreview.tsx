
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { InvoiceData } from "./InvoiceForm";

type InvoicePreviewProps = {
  invoiceData: InvoiceData;
}

const InvoicePreview = ({ invoiceData }: InvoicePreviewProps) => {
  // Calculate totals
  const subtotal = invoiceData.items.reduce((acc, item) => {
    return acc + (item.quantity * item.price);
  }, 0);
  
  const taxAmount = subtotal * (invoiceData.taxRate / 100);
  const total = subtotal + taxAmount;
  
  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };
  
  return (
    <Card className="p-8 bg-white shadow-md">
      <div className="text-3xl font-bold text-brand-blue mb-2">FACTURA</div>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-sm text-gray-500">De:</p>
          <p className="font-semibold">{invoiceData.fromName}</p>
          <p>{invoiceData.fromTaxId}</p>
          <p>{invoiceData.fromAddress}</p>
          <p>{invoiceData.fromCity}, {invoiceData.fromPostalCode}</p>
          <p>{invoiceData.fromCountry}</p>
          {invoiceData.fromEmail && <p>{invoiceData.fromEmail}</p>}
          {invoiceData.fromPhone && <p>{invoiceData.fromPhone}</p>}
        </div>
        
        <div className="text-right">
          <div className="mb-4">
            <p className="text-sm text-gray-500">Factura #:</p>
            <p className="font-semibold">{invoiceData.invoiceNumber}</p>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500">Fecha de emisión:</p>
            <p>{formatDate(invoiceData.date)}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Fecha de vencimiento:</p>
            <p>{formatDate(invoiceData.dueDate)}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <p className="text-sm text-gray-500">Para:</p>
        <p className="font-semibold">{invoiceData.toName}</p>
        <p>{invoiceData.toTaxId}</p>
        <p>{invoiceData.toAddress}</p>
        <p>{invoiceData.toCity}, {invoiceData.toPostalCode}</p>
        <p>{invoiceData.toCountry}</p>
        {invoiceData.toEmail && <p>{invoiceData.toEmail}</p>}
        {invoiceData.toPhone && <p>{invoiceData.toPhone}</p>}
      </div>
      
      <div className="mb-8">
        <div className="grid grid-cols-12 bg-gray-50 py-2 px-4 font-semibold">
          <div className="col-span-6">Descripción</div>
          <div className="col-span-2 text-right">Cantidad</div>
          <div className="col-span-2 text-right">Precio</div>
          <div className="col-span-2 text-right">Importe</div>
        </div>
        
        {invoiceData.items.map((item, index) => (
          <div key={index} className="grid grid-cols-12 py-3 px-4 border-b border-gray-100">
            <div className="col-span-6">{item.description}</div>
            <div className="col-span-2 text-right">{item.quantity}</div>
            <div className="col-span-2 text-right">{formatCurrency(item.price)}</div>
            <div className="col-span-2 text-right">{formatCurrency(item.quantity * item.price)}</div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end">
        <div className="w-full max-w-xs">
          <div className="flex justify-between py-2">
            <span>Subtotal:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          
          <div className="flex justify-between py-2">
            <span>IVA ({invoiceData.taxRate}%):</span>
            <span>{formatCurrency(taxAmount)}</span>
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex justify-between py-2 font-bold">
            <span>Total:</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      
      {invoiceData.notes && (
        <div className="mt-8 p-4 bg-gray-50 text-sm">
          <div className="font-semibold mb-2">Notas:</div>
          <p>{invoiceData.notes}</p>
        </div>
      )}
    </Card>
  );
};

export default InvoicePreview;
