document.addEventListener('DOMContentLoaded', () => {
    if ('launchQueue' in window) {
        launchQueue.setConsumer(async (launchParams) => {
            if (launchParams.files && launchParams.files.length > 0) {
                const fileHandle = launchParams.files[0];
                const file = await fileHandle.getFile();
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                imageInput.files = dataTransfer.files;
                imageInput.dispatchEvent(new Event('change'));
            }
        });
    }
    const imageInput = document.getElementById('imageInput');
    const imageUrlDiv = document.getElementById('imageUrl');
    const dropZone = document.querySelector('.border-dashed');

    // Handle drag and drop events
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-indigo-600', 'ring-2', 'ring-indigo-600');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('border-indigo-600', 'ring-2', 'ring-indigo-600');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-indigo-600', 'ring-2', 'ring-indigo-600');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            imageInput.files = files;
            imageInput.dispatchEvent(new Event('change')); // Trigger change event manually
        }
    });

    // Handle file input change (for both direct selection and drag-and-drop)
    imageInput.addEventListener('change', () => {
        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const apiKey = 'a349ae9e138e2e7987bac1c00f5d13c2';
            const formData = new FormData();
            formData.append('image', file);

            imageUrlDiv.innerText = 'Uploading...';

            fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const imageUrl = data.data.url;
                    imageUrlDiv.innerHTML = `Image URL: <a href="${imageUrl}" target="_blank">${imageUrl}</a>`;
                    const koboUrl = `https://ee-eu.kobotoolbox.org/RbdL5CJM?d[Voucher_Link]=${encodeURIComponent(imageUrl)}`;
                    window.open(koboUrl, '_blank');
                } else {
                    imageUrlDiv.innerText = 'Image upload failed.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                imageUrlDiv.innerText = 'An error occurred during upload.';
            });
        } else {
            imageUrlDiv.innerText = 'Please select an image first.';
        }
    });
});

navigator.serviceWorker.addEventListener('message', (event) => {
  if (event.data.image) {
    const imageFile = event.data.image;
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File([imageFile], imageFile.name, { type: imageFile.type }));
    const imageInput = document.getElementById('imageInput');
    imageInput.files = dataTransfer.files;
    imageInput.dispatchEvent(new Event('change'));
  }
});
