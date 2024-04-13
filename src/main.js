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
const btnLoadMore = document.querySelector(".btn_load_more")

form.addEventListener("submit", handleSubmit);

let inputValue = "";
let currentPage = 1;
function handleSubmit(event) {
    event.preventDefault();
    let currentPage = 1;
    inputValue = input.value;
    btnLoadMore.style.display = 'none';
    list.innerHTML = "";
    if (input.value === "") {
        iziToast.error({
            position: 'topRight',
            message: 'The field is empty! Enter image name!',
        });
        return;
    } 
    const { nameImg } = event.currentTarget.elements;


    fetchImages(nameImg.value, currentPage)
        .then(data => {
            if (data.total === 0) {
                iziToast.error({
                    position: 'topRight',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                });
            }
            if (data.total === 0 || data.totalHits <= currentPage * 15) {
                btnLoadMore.style.display = 'none';
            }
            list.innerHTML = createMarkup(data.hits);
            initializeLightbox();
        })
        .catch(error => alert(error))
        .finally(() => {
            loader.style.display = 'none';
        });
    btnLoadMore.style.display = 'block';
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

btnLoadMore.addEventListener("click", loadMore);


function loadMore() {
    currentPage++;
    let numberOnSite = document.querySelectorAll(".imageItme");
    
    fetchImages(inputValue, currentPage)
        .then(data => {
            if (data.total === 0 || data.totalHits === numberOnSite.length) {
                btnLoadMore.style.display = 'none';
                iziToast.warning({
                    position: 'topRight',
                    message: "We're sorry, but you've reached the end of search results.",
                });
            } else {
                const cardHeight = document.querySelector('.imageItme').getBoundingClientRect().height;
                list.innerHTML += createMarkup(data.hits);
                initializeLightbox();
                window.scrollBy({
                    top: 2 * cardHeight,
                    behavior: 'smooth'
                });
            }
                numberOnSite = document.querySelectorAll(".imageItme");
                if (data.totalHits == numberOnSite.length) {
                    btnLoadMore.style.display = 'none';
                }
        })
        .catch(error => alert(error))
        .finally(() => {
            loader.style.display = 'none';
        });
}
