const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "43225005-d66d61a579372833bf726388e";

import axios from "axios";

export async function fetchImages(nameImg) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: nameImg,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    });

    try {
        const response = await axios.get(`${BASE_URL}?${params}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}
