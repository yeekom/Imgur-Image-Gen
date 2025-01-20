const imageContainer = document.getElementById('image-container');
const loadImagesButton = document.getElementById('load-images-button');
const imageCountInput = document.getElementById('image-count');

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

// Function to load a specified number of images
function loadMultipleImages(count) {
    for (let i = 0; i < count; i++) {
        loadImage();
    }
}

// Add event listener to the button to load images when clicked
loadImagesButton.addEventListener('click', () => {
    const count = parseInt(imageCountInput.value, 10); // Get the number from the input field
    if (count > 0) {
        loadMultipleImages(count); // Load the specified number of images
    } else {
        alert('Please enter a valid number');
    }
});
