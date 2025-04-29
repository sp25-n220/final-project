import { GeneratePdf } from './generate_pdf.js';

export class CoursePdf extends GeneratePdf {
  generateInvoice(user, email, items) {
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
  }
}

const userName    = document.getElementById('user-name');
const userEmail   = document.getElementById('user-email');
const viewBtn     = document.getElementById('generate-invoice');
const downloadBtn = document.getElementById('download-invoice');
let ticketInventory = [];
let festivalName = '';

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

document.addEventListener("DOMContentLoaded", async () => {
  await loadInventory();
  const form = document.getElementById('ticket-form');
  form.addEventListener('change', checkStatus);
  viewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const ticket = getSelectedTicket();
    if (!ticket) return;
    const invoice = new CoursePdf('pdf-preview');
    invoice.generateInvoice(
      userName.value,
      userEmail.value,
      [{ name: ticket.ticket_type, price: ticket.price, quantity: 1 }]
    );
  });
  checkStatus();
});
