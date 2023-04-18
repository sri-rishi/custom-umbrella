// data object
const themeObject = {
    blue_color: {
        umbrellaSrc: "../images/blue-umbrella.png",
        mainBoxBgColor: "#e5f5fe",
        btnBgColor: "#34b5e5",
        imgSrc: "",
        uploder: "../images/upload_icon.svg"
    },
    pink_color: {
        umbrellaSrc: "../images/pink-umbrella.png",
        mainBoxBgColor: "#F9EBF9",
        btnBgColor: "#d9378d",
        imgSrc: "",
        uploder: "../images/upload_icon.svg"
    },
    yellow_color: {
        umbrellaSrc: "../images/yellow-umbrella.png",
        mainBoxBgColor: "#fffaed",
        btnBgColor: "#fccf41",
        imgSrc: "",
        uploder: "../images/upload_icon.svg"
    },
}

// selecting elements
let img = document.querySelector(".logo-here");

let blue = document.querySelector(".blue_color")
let pink = document.querySelector(".pink_color")
let yellow = document.querySelector(".yellow_color")
let main_box = document.querySelector("#container")
let label = document.querySelector(".file-input");

let upload_btn = document.querySelector(".upload-btn");
const button_div = document.querySelector(".color-selector")
let displayImage = document.querySelector(".umbrella-preview");
let upload_svg = document.querySelector("#change-color");
let uploadInput = document.querySelector(".upload-logo");

// default values
let logoImage = null;
let logoIsUploading = false;

// default styles
img.style.display = "none";
displayImage.src = "../images/blue-umbrella.png"
upload_svg.src = "../images/upload_icon.svg"


// converting file obj to base 64 encoded
const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = () => {
            reject(fileReader.error);
        };
    });
};

// handling file uploading
const uploadHandler = (e) => {
    const file = e.target.files[0];
    logoIsUploading = true;
    displayImage.style.display = "none";
    img.style.display = "block"
    img.setAttribute("src", "../images/loader_icon.svg");
    img.setAttribute('class', 'loader-image');
    upload_svg.setAttribute("src", "../images/loader_icon.svg");
    upload_svg.setAttribute('class', 'uploader');
    setTimeout(async () => {
        try {
            const base64File = await convertBase64(file);
            logoImage = base64File.toString();
            logoIsUploading = false;
            if (!logoIsUploading && logoImage) {
                displayImage.style.display = "block"
                img.setAttribute("src", logoImage);
                const fileName = file.name.length > 12 ? file.name.slice(0, 12) + "..." : file.name
                upload_btn.textContent = fileName
                upload_btn.style.fontSize = "30px"
                img.setAttribute('class', '');
                upload_svg.src = "../images/upload_icon.svg"
                upload_svg.setAttribute('class', '');
            }else {
                return; // exiting from function if no file is selected
            }
        } catch (err) {
            alert(err.message);
        }
    }, 3000);
}

// adding event on file upload input box
uploadInput.addEventListener("change", uploadHandler)

// changing color of umbrella
const colorThemeHandler = (payload) => {
    const { umbrellaSrc, mainBoxBgColor, btnBgColor, imgSrc, uploder } = payload;
    logoIsUploading = true;
    displayImage.style.display = "none";
    img.style.display = "block"
    img.setAttribute("src", "../images/loader_icon.svg");
    img.setAttribute('class', 'loader-image');
    upload_svg.setAttribute("src", "../images/loader_icon.svg");
    upload_svg.setAttribute('class', 'uploader');
    setTimeout(() => {
        displayImage.src = umbrellaSrc
        main_box.style.backgroundColor = mainBoxBgColor
        label.style.backgroundColor = btnBgColor
        img.src = imgSrc
        upload_svg.src = uploder
        upload_svg.setAttribute('class', '')
        img.style.display = "none"
        logoIsUploading = false;
        displayImage.style.display = "block"
        if (!logoIsUploading && logoImage) {
            img.style.display = "block"
            img.setAttribute("src", logoImage);
            img.setAttribute('class', '');
        }
    }, 3000)
}

// callback for color selector buttons 
const colorHandler = (e) =>  {
    let classNameArr = e.target.className.split(" ").slice(1);
    let color = classNameArr[0]
    colorThemeHandler(themeObject[color])
}

// adding event on color selector
button_div.addEventListener("click", colorHandler)