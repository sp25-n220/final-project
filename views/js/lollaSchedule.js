document.addEventListener("DOMContentLoaded", () => {
   
    // Load festivals into dropdown
    loadFestivals();  
    
    // Load existing schedules
    loadSchedules();  
  
    // Handle creating a schedule
    const scheduleForm = document.getElementById("schedule-form");
    scheduleForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const festivalId = document.getElementById("festival").value;
        const eventName = document.getElementById("activities").value; 
        const startTime = document.getElementById("start-time").value;  
        const endTime = document.getElementById("end-time").value;

        // Validate inputs before submitting
        if (!festivalId || !eventName || !startTime || !endTime) {
            alert("All fields are required!");
            return;
        }

        try {
            const response = await fetch("/api/schedules", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ festivalId, eventName, startTime, endTime })
            });

            if (!response.ok) throw new Error("Failed to save schedule");

            alert("Schedule saved!");
            scheduleForm.reset();
            // Refresh schedule list
            loadSchedules(); 
        } catch (err) {
            console.error(err);
            alert("Error saving schedule.");
        }
    });
  
    // Handle deleting a schedule
    document.getElementById("schedule-list").addEventListener("click", async (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const scheduleId = e.target.dataset.id;
  
        try {
          const response = await fetch(`/api/schedules/${scheduleId}`, {  
            method: "DELETE",
          });
  
          if (!response.ok) throw new Error("Failed to delete schedule");
  
          alert("Schedule deleted!");
          loadSchedules(); // Refresh schedule list
        } catch (err) {
          console.error(err);
          alert("Error deleting schedule.");
        }
      }
    });
});
  
// Load festivals into dropdown
async function loadFestivals() {
    try {
        // Fetch all festivals
        const response = await fetch("/api/festivals"); 
        const data = await response.json();
        const festivals = data.festivals; 
      
  
        const festivalSelect = document.getElementById("festival");
        const ticketFestivalSelect = document.getElementById("ticket-festival");
  
        festivals.forEach(festival => {
            const option = document.createElement("option");
            option.value = festival.id;
            option.textContent = festival.name;
  
            // For the ticket selection
            const option2 = option.cloneNode(true); 
            festivalSelect.appendChild(option);
            ticketFestivalSelect.appendChild(option2);
        });
    } catch (err) {
        console.error(err);
        alert("Failed to load festivals");
    }
}
  
// Load schedules and display them
async function loadSchedules() {
    try {
        // Fetch all schedules
        const response = await fetch("/api/schedules");  
        const data = await response.json();
        const schedules = data.schedules

        console.log("Loaded schedules:", schedules); 

        const scheduleList = document.getElementById("schedule-list");

        // Clear existing schedules
        scheduleList.innerHTML = "";

        schedules.forEach(schedule => {
            const div = document.createElement("div");
            div.classList.add("schedule-item");
            div.innerHTML = `
                <h3>${schedule.event_name}</h3>  <!-- Corrected to match event_name -->
                <p><strong>Start Time:</strong> ${schedule.start_time}</p>
                <p><strong>End Time:</strong> ${schedule.end_time}</p>
                <button class="delete-btn" data-id="${schedule.id}">Delete</button>
            `;
            scheduleList.appendChild(div);
        });
    } catch (err) {
        console.error(err);
        alert("Failed to load schedules");
    }
}