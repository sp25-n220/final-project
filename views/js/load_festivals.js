window.addEventListener("DOMContentLoaded", async () => {
    const wrapper = document.querySelector(".cards-wrapper");
    wrapper.innerHTML = "";

    try {
      const res = await fetch("/api/festivals");
      if (!res.ok) throw new Error(res.statusText);
      const { festivals } = await res.json();

      festivals.forEach(festival => {
        const slug = festival.name
          .toLowerCase()
          .replace(/\s+/g, "_") + ".html";

        const card = document.createElement("a");
        card.className = "card";
        card.href = `festivals/${slug}`; 
        card.innerHTML = `
          <h2>${festival.name}</h2>
          <img src="${festival.image_url}" alt="${festival.name}" />
          <p class="description">${festival.description}</p>
        `;
        wrapper.appendChild(card);
      });
    } catch (e) {
      console.error("Failed to load festivals:", e);
      wrapper.innerHTML = "<p>Sorry, we couldn't load the festivals right now.</p>";
    }
  });