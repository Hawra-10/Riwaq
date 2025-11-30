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



    // ===== IMAGE PREVIEW FUNCTIONALITY =====
    const fileInput = document.getElementById('workshop-photo');
    const fileDisplay = document.getElementById('file-upload');
    const fileUploadLabel = document.getElementById('file-upload-label');
    
    if (fileInput && fileDisplay) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                const file = this.files[0];
                fileDisplay.value = file.name;
                
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        // ===== LECTURE 9: String Concatenation =====
                        fileUploadLabel.innerHTML = '<img src="' + e.target.result + '" alt="Preview" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">';
                    };
                    
                    reader.readAsDataURL(file);
                } else {
                    fileUploadLabel.innerHTML = `
                        <span class="icon-wrapper">
                            <i class="fas fa-image main-icon"></i>
                            <i class="fas fa-plus badge-icon"></i>
                        </span>
                    `;
                }
            } else {
                fileDisplay.value = '';
                fileUploadLabel.innerHTML = `
                    <span class="icon-wrapper">
                        <i class="fas fa-image main-icon"></i>
                        <i class="fas fa-plus badge-icon"></i>
                    </span>
                `;
            }
        });
    }



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


        // تحقق من الصورة
        let imageUrl = "";  // المتغير الذي سيحمل عنوان الصورة
        if (photoFile) {
            const fileInput = document.getElementById('workshop-photo');
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            const file = fileInput.files[0];

            // تحقق من نوع الصورة
            if (!allowedTypes.includes(file.type)) {
                alert('Photo field accepts only image files');
                return;
            } else {
                // Create object URL for the uploaded image
                imageUrl = URL.createObjectURL(file);
            }
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

            
           // إعادة تعيين الصورة إلى الأيقونة الأصلية بعد تقديم الفورم
const fileUploadLabel = document.getElementById('file-upload-label');
fileUploadLabel.innerHTML = 
    '<span class="icon-wrapper">' +
        '<i class="fas fa-image main-icon"></i>' +
        '<i class="fas fa-plus badge-icon"></i>' +
    '</span>';
          // إعادة تعيين باقي الحقول

        }

    });
});

