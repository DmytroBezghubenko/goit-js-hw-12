const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "43225005-d66d61a579372833bf726388e";

export function fetchImages(nameImg) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: nameImg,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    });

    return fetch(`${BASE_URL}?${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ooooops");
            }
            return response.json();
        });
}
