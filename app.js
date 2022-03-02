const addBookmark = document.getElementById('add-bookmark');
const modalContainer = document.querySelector('.modal-container');
const closeModal = document.querySelector('.close-modal');
const bookmarkName = document.querySelector('.bookmark-name');
const bookmarkUrl = document.querySelector('.bookmark-url');
const bookmarkContainer = document.querySelector('.bookmark-container');
const bookmarkItem = document.querySelector('.bookmark-item');
const bookmarkForm = document.getElementById('bookmark-form');

let bookmarks = [];

function displayModal() {
    modalContainer.classList.add('show-modal');
}

function buildbookmarks() {
    bookmarkContainer.textContent = ''
    bookmarks.forEach((bookmark, i) => {
        const {name, url} = bookmark;

        const item = document.createElement('div');
        item.classList.add('bookmark-item')
        
        const removeItem = document.createElement('span');
        removeItem.textContent = 'X';
        removeItem.classList.add('remove');
        removeItem.setAttribute("onclick", `deleteBookmark(${i})`);

        const bookmarkName = document.createElement('div');
        bookmarkName.classList.add('bookmark-item__name');

        const link = document.createElement('a');
        link.href = url;
        link.textContent = name;
        bookmarkName.appendChild(link);
        item.appendChild(removeItem);
        item.appendChild(bookmarkName);
        bookmarkContainer.appendChild(item);
    });
}

function fetchBookmarks() {
    if(localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        bookmarks = [
            {
                name: 'blalblablabal',
                url: 'www.google.com',
            }
        ]
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildbookmarks();
}


function saveBookmark(e) {
    e.preventDefault();
    const bookName = bookmarkName.value;
    let bookUrl = bookmarkUrl.value;
    if (!bookUrl.includes('https://') && !bookUrl.includes('http://')) {
    bookUrl = `https://${bookUrl}`; 
    }
    if(!validate(bookName, bookUrl)){
        return false;
    }

    const bookmark = {
        name: bookName,
        url: bookUrl,
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
}

function validate(bookName, bookUrl) {
    const expresiion = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
    const regex = new RegExp(expresiion);
    if(!bookName || !bookUrl) {
        alert('please submit values for both fields');
        return false;
    }
    if(bookUrl.match(regex)) {
        alert('match');
    } else {
        alert('Please provide a valid web adress');
        return false;
    }
    return true;
}

function deleteBookmark(i) {
    bookmarks.splice(i, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

addBookmark.addEventListener('click', displayModal);
closeModal.addEventListener('click', () => modalContainer.classList.remove('show-modal'));
window.addEventListener('click', (event) => (event.target === modalContainer ? modalContainer.classList.remove('show-modal') : false));

bookmarkForm.addEventListener('submit', saveBookmark);

fetchBookmarks();