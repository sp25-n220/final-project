document.addEventListener("DOMContentLoaded", () => {
    loadFestivals();
    loadSchedules();
  
    // Handle creating a schedule
    const scheduleForm = document.getElementById("schedule-form");
    scheduleForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const festivalId = document.getElementById("festival").value;
      const date = document.getElementById("date").value;
      const activities = document.getElementById("activities").value;
  
      try {
        const response = await fetch("/lollaSchedule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ festivalId, date, activities })
        });
        if (!response.ok) throw new Error("Failed to save schedule");
  
        alert("Schedule saved!");
        scheduleForm.reset();
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
          const response = await fetch(`/lollaSchedule/${scheduleId}`, {
            method: "DELETE",
          });
          if (!response.ok) throw new Error("Failed to delete schedule");
  
          alert("Schedule deleted!");
          loadSchedules();
        } catch (err) {
          console.error(err);
          alert("Error deleting schedule.");
        }
      }
    });
  
    // You can add ticket purchase logic separately if needed later
  });
  
  // Load festivals into dropdowns
  async function loadFestivals() {
    try {
      const response = await fetch("/festivals");
      const festivals = await response.json();
  
      const festivalSelect = document.getElementById("festival");
      const ticketFestivalSelect = document.getElementById("ticket-festival");
  
      festivals.forEach(festival => {
        const option = document.createElement("option");
        option.value = festival.id;
        option.textContent = festival.name;
  
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
      const response = await fetch("/lollaSchedule");
      const schedules = await response.json();
  
      const scheduleList = document.getElementById("schedule-list");
      scheduleList.innerHTML = "";
  
      schedules.forEach(schedule => {
        const div = document.createElement("div");
        div.classList.add("schedule-item");
        div.innerHTML = `
          <h3>${schedule.activities}</h3>
          <p><strong>Date:</strong> ${schedule.date}</p>
          <button class="delete-btn" data-id="${schedule.id}">Delete</button>
        `;
        scheduleList.appendChild(div);
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load schedules");
    }
  }
  