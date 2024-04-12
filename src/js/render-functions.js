export function createMarkup(arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, views, downloads, likes, comments }) => `
    <li class="imageItme">
    <a class="gallery-link" href="${largeImageURL}">
    <img class="imgAdd" src="${webformatURL}" alt="${tags}">
    <ul class="imgInfo">
    <li class="info_item"><p>Likes</p>${likes}</li>
    <li class="info_item"><p>Views</p>${views}</li>
    <li class="info_item"><p>Comments</p>${comments}</li>
    <li class="info_item"><p>Downloads</p>${downloads}</li>
    </ul>
    </a>
    </li>
`).join("");
}
