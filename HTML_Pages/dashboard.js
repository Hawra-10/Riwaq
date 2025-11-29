document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".workshop-container");
    const workshops = JSON.parse(localStorage.getItem("providerWorkshops")) || [];


localStorage.removeItem("providerWorkshops") //for remove



    if (workshops.length === 0) {
        container.innerHTML = "<p>No workshops added yet.</p>";
    } else {
        container.innerHTML = ""; // مسح المحتوى القديم
        workshops.forEach(workshop => {
            const div = document.createElement("div");
            div.classList.add("workshop-box");

            const imgBox = document.createElement("div");
            imgBox.classList.add("img-box");
            if (workshop.photo) {
                const img = document.createElement("img");
                img.src = workshop.photo;
                imgBox.appendChild(img);
            } else {
                imgBox.textContent = "No Image";
            }

            const info = document.createElement("div");
            info.classList.add("workshop-info");
            info.innerHTML = `<h3>${workshop.name}</h3><p>${workshop.desc}</p>`;

            const price = document.createElement("div");
            price.classList.add("price");
            price.textContent = `SAR ${workshop.price}`;

            div.appendChild(imgBox);
            div.appendChild(info);
            div.appendChild(price);

            container.appendChild(div);
        });
    }
});
