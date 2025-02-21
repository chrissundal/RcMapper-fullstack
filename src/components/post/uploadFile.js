import axios from "axios";

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await axios.post('https://localhost:3000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            return response.data.url;
        } else {
            console.error('Failed to upload file');
        }
    } catch (error) {
        console.error(error);
    }
    return null
}

export default uploadFile;
