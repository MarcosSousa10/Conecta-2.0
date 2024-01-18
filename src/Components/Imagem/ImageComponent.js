import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [imageToShow, setImageToShow] = useState('');

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const fetchImages = async () => {
        try {
            const savedUserData = localStorage.getItem('@detailUser');
            if (!savedUserData) {
                console.log('Nenhuma informação encontrada no localStorage.');
                return;
            }
            const userData = JSON.parse(savedUserData);
            const token = userData.uid;
            const response = await axios.get('http://192.168.2.181:5555/images1', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.data.length > 0) {
                setImageToShow(response.data[0]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleUpload = async () => {
        try {
            const savedUserData = localStorage.getItem('@detailUser');
            if (!savedUserData) {
                console.log('Nenhuma informação encontrada no localStorage.');
                return;
            }
            const userData = JSON.parse(savedUserData);
            const token = userData.uid;
            const formData = new FormData();
            formData.append('file', selectedImage);

            const response = await axios.post('http://192.168.2.181:5555/images1', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUploadStatus(response.data);
            fetchImages();
        } catch (error) {
            console.error(error);
            setUploadStatus('Error uploading image');
        }
    };

    return (
        <div>
            <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload Image</button>
            {uploadStatus && <p>{uploadStatus}</p>}
            {imageToShow && <img src={imageToShow} alt={`Image`} />}
        </div>
    );
};

export default ImageUploader;
