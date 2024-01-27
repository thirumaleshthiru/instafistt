async function getInstagramData() {
    const urlInput = document.getElementById('url').value.trim();
    const resultContainer = document.querySelector('.result-story');
    let loadingMessage = document.querySelector('.loading');

    try {
        if (!urlInput) {
            throw new Error('Required elements not found.');
        }

        // Create loading message if it doesn't exist
        if (!loadingMessage) {
            loadingMessage = document.createElement('div');
            loadingMessage.classList.add('loading');
            loadingMessage.style.display = 'none';
            loadingMessage.textContent = 'Loading...';
            resultContainer.appendChild(loadingMessage);
        }

        // Display loading message
        loadingMessage.style.display = 'block';

        const response = await fetch(`https://instafist-ymd3.onrender.com/getInstagramData?url=${encodeURIComponent(urlInput)}`);
        const jsonData = await response.json();

        // Hide loading message
        loadingMessage.style.display = 'none';

        if (jsonData.length > 0) {
            // Clear existing content in the result container
            resultContainer.innerHTML = '';

            // Create elements for each object in the JSON array
            jsonData.forEach((data) => {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post');

                const video = document.createElement('video');
                video.src = data.download_link;
                video.controls = true; // Add controls to the video element

                const downloadButton = document.createElement('button');
                downloadButton.textContent = 'Download';
                downloadButton.onclick = function () {
                    window.location.href = data.download_link;
                };

                // Append elements to the result container
                postDiv.appendChild(video);
                postDiv.appendChild(downloadButton);
                resultContainer.appendChild(postDiv);
            });
        } else {
            alert('Invalid Instagram URL or no data found.');
        }
    } catch (error) {
        console.error('Error fetching Instagram data:', error);
        alert(error.message);

        // Hide loading message in case of an error
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }
    }
}

document.getElementById('submit').onclick = function () {
    // Clear resultContainer when submitting a new URL
    const resultContainer = document.querySelector('.result');
    if (resultContainer) {
        resultContainer.innerHTML = '';
    }
    getInstagramData();
};