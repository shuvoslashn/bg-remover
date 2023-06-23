var imageURL;
const uploadBtn = document.querySelector('#upload');
const handleUpload = () => {
    const fileInput = document.querySelector('#filepicker');
    const image = fileInput.files[0];
    const formData = new FormData();
    formData.append(`image_file`, image);
    formData.append(`size`, `auto`);

    // api keyhere
    const apikey = `qss4jbPSHLoMv1fJuajpykTz`;

    // fetch data
    fetch(`https://api.remove.bg/v1.0/removebg`, {
        method: 'post',
        headers: {
            'X-Api-Key': apikey,
        },
        body: formData,
    })
        .then((response) => response.blob())
        .then((blob) => {
            const url = URL.createObjectURL(blob);
            imageURL = url;
            const img = document.createElement('img');
            img.src = url;
            document.body.appendChild(img);
        })
        .catch((err) => console.log(err));
};
uploadBtn.addEventListener('click', handleUpload);

// for download button
const download = document.querySelector('#download');
const handleDownload = () => {
    const anchor = document.createElement('a');
    anchor.href = imageURL;
    anchor.download = 'no-bg.png';
    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
};
download.addEventListener('click', handleDownload);
