
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 pt-10 pb-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold text-brand-blue flex items-center mb-4">
              <span className="mr-1">Quick</span>
              <span className="text-brand-darkBlue">Bill</span>
            </div>
            <p className="text-gray-600 mb-4">
              Genera facturas profesionales en segundos. Ideal para freelancers, diseñadores, programadores y autónomos.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <a href="#caracteristicas" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Características
                </a>
              </li>
              <li>
                <a href="#precios" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Precios
                </a>
              </li>
              <li>
                <a href="/crear-factura" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Generar factura
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Política de privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {currentYear} QuickBill. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
