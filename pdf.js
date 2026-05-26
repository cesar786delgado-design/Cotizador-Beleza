function generatePDF(){
 const {jsPDF}=window.jspdf;
 const doc=new jsPDF();
 doc.text('Cotización Beleza Stone',10,10);
 doc.save('cotizacion.pdf');
}