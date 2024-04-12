// main.js

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages } from "./js/pixabay-api.js";
import { createMarkup } from "./js/render-functions.js";

const form = document.querySelector(".form");
const list = document.querySelector('.gallery');
const loader = document.getElementById('loader');
const input = document.querySelector('#nameImg');

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    console.log(input.value);
    if (input.value === "") {
        iziToast.error({
            position: 'topRight',
            message: 'The field is empty! Enter image name!',
        });
        return;
    } 
    const { nameImg } = event.currentTarget.elements;

    loader.style.display = 'inline-block';

    fetchImages(nameImg.value)
        .then(data => {
            if (data.total === 0) {
                iziToast.error({
                    position: 'topRight',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                });
            }
            list.innerHTML = createMarkup(data.hits);
            initializeLightbox();
        })
        .catch(error => alert(error))
        .finally(() => {
            loader.style.display = 'none';
            
        });
    input.value = "";
}
function initializeLightbox() {
    let gallery = new SimpleLightbox('.gallery a', {
        overlayOpacity: 0.8,
        scrollZoom: false,
        captionsData: 'alt',
        captionDelay: 250,
    });
    gallery.refresh();
}
