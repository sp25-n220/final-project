import { GeneratePdf } from './generate_pdf.js';

export class CoursePdf extends GeneratePdf {
  generateInvoice(user, email, items, imageUrl) {
    this.resetPdf();
    this.addHeader(festivalName, "blue", undefined, "bold");
    const currentDate = new Date().toLocaleDateString();
    const invoiceNumber = Math.floor(Math.random() * 1e8);
    this.addText(`Date: ${currentDate}`, "black");
    this.addText(`Invoice: ${invoiceNumber}`, "black");
    this.addHeader("Invoice for", "black");
    this.addHeader(`${user}, ${email}`, "black");
    this.addHeader("Items:", "black");
    let totalPrice = 0;
    items.forEach(item => {
      const lineTotal = item.price * item.quantity;
      this.addText(`${item.quantity} x ${item.name}: $${lineTotal.toFixed(2)}`);
      totalPrice += lineTotal;
    });
    this.addHeader(`Gross Total: $${totalPrice.toFixed(2)}`, "black");
    const netTotal = totalPrice * 1.07;
    this.addHeader(`Net Total (incl. 7% tax): $${netTotal.toFixed(2)}`, "black");
    this.showPdf();

    // If there is an imageUrl, add the image to the invoice
    if (imageUrl) {
      this.addImage(imageUrl);
  }
  }
}

const userName    = document.getElementById('user-name');
const userEmail   = document.getElementById('user-email');
const viewBtn     = document.getElementById('generate-invoice');
const downloadBtn = document.getElementById('download-invoice');
let ticketInventory = [];
let festivalName = '';
// Joseph addition
let selectedTicketImage = null;

// Create a map of ticket images
const ticketImages = {
  1: '/img/festivals/shaky1.jpg', 
  2: '/img/festivals/shaky2.jpg',  
  3: '/img/festivals/shaky3.jpg',  
  
};

async function loadInventory() {
  try {
    const festId = document.body.dataset.festivalId;
    const res = await fetch(`/api/festivals/${festId}`);
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    festivalName = data.festival.name;
    ticketInventory = data.ticketInventory;
  } catch (err) {
    console.error("Failed to load ticket inventory:", err);
  }
}

function getSelectedTicket() {
  const checked = document.querySelector('input[name="ticketOption"]:checked');
  if (!checked) return null;
  const invId = parseInt(checked.value, 10);
  return ticketInventory.find(i => i.inventory_id === invId) || null;
}

function checkStatus() {
  const hasTicket = !!getSelectedTicket();
  const hasUser   = userName.value.trim() !== '' && userEmail.value.trim() !== '';
  if (hasTicket && hasUser) {
    viewBtn.removeAttribute('disabled');
    downloadBtn.removeAttribute('disabled');
  } else {
    viewBtn.setAttribute('disabled', '');
    downloadBtn.setAttribute('disabled', '');
  }
}

function getSelectedTicketImage() {
  const selectedRadio = document.querySelector('input[name="ticketImageOption"]:checked');
  
  //Get the value of the selected radio image ticket
  if (selectedRadio) {
    selectedTicketImage = selectedRadio.value;

    const imageUrl = ticketImages[selectedTicketImage];

    console.log("Image URL from selected ID:", imageUrl);

    return imageUrl;
  }

  return null; 
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadInventory();
  const form = document.getElementById('ticket-form');
  form.addEventListener('change', checkStatus);
  viewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const ticket = getSelectedTicket();
    if (!ticket) return;

    const selectedImageUrl = getSelectedTicketImage();  
    const invoice = new CoursePdf('pdf-preview');
    console.log("Selected image URL:", selectedImageUrl);

    invoice.generateInvoice(
      userName.value,
      userEmail.value,
      [{ name: ticket.ticket_type, price: ticket.price, quantity: 1 }],
      // Generate selected image
      selectedImageUrl  

      
    );
  });
  checkStatus();
});

