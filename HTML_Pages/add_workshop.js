document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".forms");
    const nameInput = document.getElementById("name");
    const priceInput = document.getElementById("price");
    const descInput = document.getElementById("workshop-description");
    const photoInput = document.getElementById("workshop-photo");
    const fileText = document.getElementById("file-upload");

    // عرض اسم الملف عند اختيار صورة
    photoInput.addEventListener("change", () => {
        if (photoInput.files.length > 0) {
            fileText.value = photoInput.files[0].name;
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // منع الفورم من الإرسال الافتراضي

        const name = nameInput.value.trim();
        const price = priceInput.value.trim();
        const desc = descInput.value.trim();
        const photoFile = photoInput.files[0];

        // تحقق من الحقول الفارغة
        if (!name || !price || !desc) {
            alert("Please fill all fields.");
            return;
        }

        // تحقق من اسم الورشة (لا يبدأ برقم)
        if (/^\d/.test(name)) {
            alert("Workshop name cannot start with a number.");
            return;
        }

        // تحقق من السعر (يجب أن يكون رقم موجب)
        if (isNaN(price) || Number(price) <= 0) {
            alert("Price must be a positive number.");
            return;
        }

        // إعداد الصورة (إن وجدت)
        let photoURL = "";
        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                photoURL = event.target.result;
                saveWorkshop();
            }
            reader.readAsDataURL(photoFile);
        } else {
            saveWorkshop(); // بدون صورة
        }

        function saveWorkshop() {
            const workshops = JSON.parse(localStorage.getItem("providerWorkshops")) || [];

            const newWorkshop = {
                name: name,
                price: price,
                desc: desc,
                photo: photoURL
            };

            workshops.push(newWorkshop);
            localStorage.setItem("providerWorkshops", JSON.stringify(workshops));

            alert(`Workshop "${name}" has been added successfully!`);
            form.reset();
        }
    });
});
