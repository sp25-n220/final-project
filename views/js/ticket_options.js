document.addEventListener("DOMContentLoaded", async () => {
    const festivalId = document.body.dataset.festivalId;
    const optionsContainer = document.getElementById("ticket-options");
    if (!festivalId) {
      console.error("Missing data-festival-id on <body>");
      return;
    }
  
    try {
      const res = await fetch(`/api/festivals/${festivalId}`);
      if (!res.ok) throw new Error(res.statusText);
      const { ticketInventory } = await res.json();
  
      ticketInventory.forEach(item => {
        const { inventory_id, ticket_type, price, qty_available } = item;
  
        const wrapper = document.createElement("div");
        wrapper.className = "ticket-option";
  
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "ticketOption";
        radio.id = `ticket-${inventory_id}`;
        radio.value = inventory_id;
        if (qty_available === 0) radio.disabled = true;
        wrapper.appendChild(radio);
  
        const label = document.createElement("label");
        label.htmlFor = radio.id;
        label.textContent = 
          `${ticket_type} – $${price.toFixed(2)} (${qty_available} left)`;
        wrapper.appendChild(label);
  
        optionsContainer.appendChild(wrapper);
      });
    } catch (err) {
      console.error("Failed to load ticket options:", err);
      optionsContainer.innerHTML = 
        "<p>Unable to load ticket options at this time.</p>";
    }
  });
  