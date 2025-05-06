console.log("lollaSchedule.js loaded");
const scheduleForm = document.getElementById("trip-form");


scheduleForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const schedule = {
        startDate: document.getElementById("start-date").value,
        endDate: document.getElementById("end-date").value,
        activities: document.getElementById("activities").value,
        ticketType: document.getElementById("ticket-type").value,
        ticketQuantity: Number(document.getElementById("ticket-quantity").value), 
        userName: document.getElementById("user-name").value,
        userEmail: document.getElementById("user-email").value,
    };
  
    console.log("Collected trip data:", schedule);

    if (!schedule.startDate || !schedule.endDate || !schedule.ticketQuantity || !schedule.userName || !schedule.userEmail) {
        alert("Please fill out all required fields.");
        return;
    }
  
    try {
        const res = await fetch("/api/schedules", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(schedule)
        });

        console.log("Server response status:", res.status);
  
        if (!res.ok) {

            scheduleForm.reset();
            loadSchedulesFromServer();
            throw new Error("Failed to save plan"); 

        }
            
        const responseData = await res.json();
        console.log("Successfully saved trip:", responseData);
        alert("Trip successfully planned!");

        //Reset and refresh the Form and table
        loadSchedulesFromServer(); 
        scheduleForm.reset();

    } catch (err) {
        console.error(err);
        alert("Error saving plan.");
    }
    loadSchedulesFromServer();
});


async function loadSchedulesFromServer() {
    try {
        
        console.log("Making request to /api/schedules...");
        const res = await fetch("/api/schedules");
        console.log("Response status:", res.status);

           
        if (!res.ok) {
            throw new Error(`Failed to load schedules. Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Response data:", data);

        const schedule = data.schedules;
        if (!schedule) {
            console.error("No schedules returned in data.");
            return;
        }
  
        const scheduleList = document.getElementById("trip-list");
        scheduleList.innerHTML = "";
  
        schedule.forEach((schedule) => {
            const div = document.createElement("div");
            div.classList.add("trip-card");
            div.innerHTML = `
                <h3>${schedule.userName}'s Trip</h3>
                <p><strong>Start:</strong> ${schedule.startDate}</p>
                <p><strong>End:</strong> ${schedule.endDate}</p>
                <p><strong>Activities:</strong> ${schedule.activities || "None listed"}</p>
                <p><strong>Tickets:</strong> ${schedule.ticketQuantity} x ${schedule.ticketType}</p>
                <p><strong>Email:</strong> ${schedule.userEmail}</p>
                <button class="delete-btn" data-id="${schedule.id}">Delete</button>
                `;
            scheduleList.appendChild(div);
        });

        // Add deletion logic to the load schedule because that is where the delete method is!
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach((button) => {
            button.addEventListener('click', (e) => {

                // We are getting the clicked id for the delete button 
                const scheduleId = e.target.dataset.id;
                console.log("Schedule ID:", scheduleId);

                deleteSchedule(scheduleId);
            });
        });

    } catch (err) {
        console.error(err);
        alert("Error loading plans.");
    }
}

async function deleteSchedule(id) {
    try {
        const res = await fetch(`/api/schedules/${id}`, {
            method: "DELETE"
    });
  
        if (!res.ok){
            throw new Error("Failed to delete trip");
        }

        loadSchedulesFromServer();

    } catch (err) {
        console.error(err);
        alert("Error deleting trip.");
    }
}
  
  

document.addEventListener("DOMContentLoaded", loadSchedulesFromServer);