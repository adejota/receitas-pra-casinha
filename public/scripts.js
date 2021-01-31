// ESCONDER e MOSTRAR @ RECIPE DETAILS
const hideSpans = document.querySelectorAll("#details span")

for (let hideSpan of hideSpans) {
    hideSpan.addEventListener("click", function() {
        
        if (hideSpan.nextElementSibling.classList == "active") {
            hideSpan.nextElementSibling.classList.remove("active")
            hideSpan.innerHTML = "ESCONDER"
        } else {
            hideSpan.nextElementSibling.classList.toggle("active")
            hideSpan.innerHTML = "MOSTRAR"
        }

    })
}


// === SELECTED LINK @ HEADER ===
const currentPage = location.pathname
const menuItems = document.querySelectorAll("header a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("bold")
    }
}

// IMAGE PREVIEW @ SHARE-RECIPE
function imagePreview() {
    const previewImg = document.querySelector(".preview-img")
    const inputFile = document.querySelector(".inputfile")
    
    inputFile.onchange = e => {
        const fileToUpload = e.target.files.item(0);
        const reader = new FileReader();
    
        reader.onload = e => previewImg.src = e.target.result;
    
        reader.readAsDataURL(fileToUpload);
    }
}

if (currentPage.includes("/share-recipe")) {
    imagePreview()
}

if (currentPage.includes("/edit")) {
    imagePreview()
}


