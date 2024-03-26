async function getInstagramData() {
    const urlInput = document.getElementById('url').value.trim();
    const resultContainer = document.querySelector('.result-posts');
    let loadingMessage = document.querySelector('.loading');

    try {
        if (!urlInput) {
            throw new Error('Required elements not found.');
        }

       
        if (!loadingMessage) {
            loadingMessage = document.createElement('div');
            loadingMessage.classList.add('loading');
            loadingMessage.style.display = 'none';
            loadingMessage.textContent = 'Loading...';
            resultContainer.appendChild(loadingMessage);
        }

        
        loadingMessage.style.display = 'block';

        const response = await fetch(`https://nice-gray-barnacle-yoke.cyclic.app/getInstagramData?url=${encodeURIComponent(urlInput)}`);
        const jsonData = await response.json();

         loadingMessage.style.display = 'none';

        if (jsonData.length > 0) {
             resultContainer.innerHTML = '';

            // Create elements for each object in the JSON array
            jsonData.forEach((data) => {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post');

                const h3 = document.createElement('h3');
                h3.textContent = `Highlight ${jsonData.indexOf(data) + 1}`;

                const downloadButton = document.createElement('button');
                downloadButton.textContent = 'Download';
                downloadButton.onclick = function () {
                    window.location.href = data.download_link;
                };

                // Append elements to the result container
                postDiv.appendChild(h3);
                postDiv.appendChild(downloadButton);
                resultContainer.appendChild(postDiv);
            });
        } else {
            alert('Please Try Again (Invalid URL/Instram Might Restricted/Server Problem');
        }
    } catch (error) {
        console.error('Error fetching Instagram URL:', error);
        alert("Please Try Again (Invalid URL/Instram might Restricted/Server Problem)");

         if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }
    }
}

document.getElementById('submit').onclick = function () {
     const resultContainer = document.querySelector('.result-posts');
    if (resultContainer) {
        resultContainer.innerHTML = '';
    }
    getInstagramData();
};
