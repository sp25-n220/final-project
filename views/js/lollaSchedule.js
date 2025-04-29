tripForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const schedule = {
        startDate: document.getElementById("start-date").value,
        endDate: document.getElementById("end-date").value,
        activities: document.getElementById("activities").value,
        ticketType: document.getElementById("ticket-type").value,
        ticketQuantity: document.getElementById("ticket-quantity").value,
        userName: document.getElementById("user-name").value,
        userEmail: document.getElementById("user-email").value,
    };
  
    if (!schedule.startDate || !schedule.endDate || !schedule.ticketQuantity || !schedule.userName || !schedule.userEmail) {
        alert("Please fill out all required fields.");
        return;
    }
  
    try {
        const res = await fetch("/api/schedules", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(trip)
        });
  
        if (!res.ok) throw new Error("Failed to save trip"); {
            tripForm.reset();
            loadSchedulesFromServer();
        }
            
    } catch (err) {
        console.error(err);
        alert("Error saving trip.");
    }
});


async function loadSchedulesFromServer() {
    try {
        const res = await fetch("/api/schedules");
        const data = await res.json();
        const schedule = data.schedule;
  
        const scheduleList = document.getElementById("trip-list");
        scheduleList.innerHTML = "";
  
        schedule.forEach((schedule) => {
            const div = document.createElement("div");
            div.classList.add("trip-card");
            div.innerHTML = `
                <h3>${schedule.user_name}'s Trip</h3>
                <p><strong>Start:</strong> ${schedule.start_date}</p>
                <p><strong>End:</strong> ${schedule.end_date}</p>
                <p><strong>Activities:</strong> ${schedule.activities || "None listed"}</p>
                <p><strong>Tickets:</strong> ${schedule.ticket_quantity} x ${trip.ticket_type}</p>
                <p><strong>Email:</strong> ${schedule.user_email}</p>
                <button class="edit-btn" data-id="${schedule.id}">Edit</button>
                <button class="delete-btn" data-id="${schedule.id}">Delete</button>
                `;
            scheduleList.appendChild(div);
        });
    } catch (err) {
        console.error(err);
        alert("Error loading trips.");
    }
}

async function deleteSchedule(id) {
    try {
        const res = await fetch(`/api/schedule/${id}`, {
            method: "DELETE"
    });
  
        if (!res.ok) throw new Error("Failed to delete trip");
        loadSchedulesFromServer();
    } catch (err) {
        console.error(err);
        alert("Error deleting trip.");
    }
}
  
  