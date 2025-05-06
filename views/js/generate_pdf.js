import {jsPDF} from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.0.0/jspdf.es.js";

export class GeneratePdf {
    pdfDoc; 

    position = {
        x: 20,
        y: 10,

    }

    margin = {
        y:20,
        x:10,
    }

    pageCounter = 1;

    domRef = "";

    font;

    constructor (domRefId) {
        this.pdfDoc = new jsPDF();
        this.pdfDoc.setFontSize(11);

        if(domRefId) {
            this.domRef = document.querySelector(`#${domRefId}`)
        }

        this.font = this.pdfDoc.getFont();
    }

    downloadPdf() {
        this.pdfDoc.save("mydoc.pdf")
    }

    getPdfUrl () {
        return this.pdfDoc.output("bloburl") + "#toolbar = 1";
    }

    addHeader(text, color="black", family=this.font.fontName, style=this.font.fontStyle) {
        this.pdfDoc.setFontSize(18);
        this.pdfDoc.setTextColor(color);
        this.pdfDoc.setFont(family, style);
        this.position.y += 3;
        this.pdfDoc.text(text, this.position.x, this.position.y);
        this.position.y += 10;
        this.pdfDoc.setTextColor("black");
        this.pdfDoc.setFontSize(14);
    }

    addText(text, color="black", family=this.font.fontName, style=this.font.fontStyle) {
        this.pdfDoc.setTextColor(color);
        this.pdfDoc.setFont(family, style);
        this.pdfDoc.text(text, this.position.x, this.position.y);
        this.pdfDoc.setTextColor("black");
        this.position.y += 6;
    }
    
    resetPdf() {
        for (let i = this.pageCounter; i > 0; i--) {
            this.pdfDoc.deletePage(i);
        }

        this.pageCounter = 1;
        this.pdfDoc.addPage();

        this.showPdf()
    }

    newPage() { 
        this.position = {...this.margin}; 
        this.pdfDoc.addPage();
        this.pageCounter++;
    }

    showPdf() {
        if(this.domRef) {
            this.domRef.src = this.getPdfUrl();
        }
    }

    addBackground({color = "black", fontSize = 11} = {}) {
        const offSet = fontSize / 2;
        this.pdfDoc.setFillColor(color);
        this.pdfDoc.rect(
        this.position.x,
        this.position.y - (offSet * 3) / 4,
        100,
        offSet,
        "F"
    );
        this.pdfDoc.setFillColor("white");
    }

    addImage(imageUrl, x = 20, y = this.position.y + 10, width = 120, height = 70) {
        console.log("Attempting to load image:", imageUrl);  

        const img = new Image();
        
        // Load the image to the page
        img.onload = () => {
            console.log("Image loaded successfully!"); 
            this.pdfDoc.addImage(img, x, y, width, height);
            this.position.y = y + height + 10;
            this.showPdf();
        };

        // Search for which url you will add to the page
        img.src = imageUrl;

       
    }

    
}