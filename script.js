const imageContainer = document.getElementById('image-container');

// Function to generate a random Imgur link
function getRandomImgurLink() {
    const randomId = Math.floor(Math.random() * 1000000000); // Random number for Imgur ID
    return `https://i.imgur.com/${randomId}.jpg`; // Assuming the image is a JPG
}

// Function to check if an image is valid
function checkImageValid(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true); // Image loaded successfully
        img.onerror = () => resolve(false); // Error loading image
        img.src = url;
    });
}

// Function to load a new image
async function loadImage() {
    let validImage = false;
    let imgUrl;

    // Keep generating random Imgur links until we find a valid image
    while (!validImage) {
        imgUrl = getRandomImgurLink();
        validImage = await checkImageValid(imgUrl);
    }

    // Create an img element and add it to the container
    const imgElement = document.createElement('img');
    imgElement.src = imgUrl;
    imageContainer.appendChild(imgElement);
}

// Infinite scroll functionality
let isLoading = false;
let page = 1;

function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 && !isLoading) {
        isLoading = true;
        loadImage().then(() => {
            isLoading = false;
        });
    }
}

// Load initial images
for (let i = 0; i < 10; i++) {
    loadImage();
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);
