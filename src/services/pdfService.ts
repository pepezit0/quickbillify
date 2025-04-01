
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async (elementId: string, fileName: string): Promise<void> => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error(`Element with ID ${elementId} not found`);
    return;
  }
  
  try {
    // Capture the element as a canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });
    
    // Create PDF with proper dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add image to PDF
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 0.9), 
      'JPEG', 
      0, 
      0, 
      imgWidth, 
      imgHeight
    );
    
    // Save the PDF
    pdf.save(fileName);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
