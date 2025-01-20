const imageContainer = document.getElementById('image-container');

// Function to generate a random Imgur link
function getRandomImgurLink() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    for (let i = 0; i < 7; i++) { // Imgur IDs are typically 7 characters long
        randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `https://i.imgur.com/${randomId}.jpg`; // Assuming the image is a JPG
}

// Function to check if an image is valid (not the error image)
function checkImageValid(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            // Check if the image is the error image (161x81)
            if (img.width === 161 && img.height === 81) {
                resolve(false); // Invalid image
            } else {
                resolve(true); // Valid image
            }
        };
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
    imageContainer.appendChild(imgElement); // Append the image to the container
}

// Infinite scroll functionality with preloading
let isLoading = false;

function handleScroll() {
    // Check if the user is near the bottom (200px before the bottom)
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200 && !isLoading) {
        isLoading = true;
        // Load 3 images at once (or any number you prefer)
        const numberOfImagesToLoad = 3;
        let loadPromises = [];
        for (let i = 0; i < numberOfImagesToLoad; i++) {
            loadPromises.push(loadImage());
        }
        Promise.all(loadPromises).then(() => {
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
