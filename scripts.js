import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

// Elements from HTML
const elements = {
    dataListItems : document.querySelector('[data-list-items]'),
    showMoreBtn : document.querySelector('[data-list-button]'),
    noResultMsg : document.querySelector('[data-list-message]'),

    // elements for search modal

    searchGenre: document.querySelector('[data-search-genres]'),
    searchAuthors : document.querySelector('[data-search-authors]'),
    searchCancelBtn : document.querySelector('[data-search-cancel]'),
    searchHeader : document.querySelector('[data-header-search]'),
    searchModal : document.querySelector('[data-search-overlay]'),
    searchForm : document.querySelector('[data-search-form]'),
    searchBookTitles : document.querySelector('[data-search-title]'),

    // elements for setings modal

    settingsTheme : document.querySelector('[data-settings-theme]'),
    settingsCancelBtn : document.querySelector('[data-settings-cancel]'),
    settingsModal :  document.querySelector('[data-settings-overlay]'),
    settingsHeader : document.querySelector('[data-header-settings]'),
    settingsForm : document.querySelector('[data-settings-form]'),
    
   // elements for book info modal 
    dataListCloseModalBtn : document.querySelector('[data-list-close]'),
    dataListModal : document.querySelector('[data-list-active]'),
    
}

// So that users can see books on the UI
function renderBookList (author, id, image, title, fragment) {
    const element = document.createElement('button')
    element.classList = 'preview'
    element.setAttribute('data-preview', id)

    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    ` 
    fragment.appendChild(element)
}

// Creates options for user to choose from in dropDown

function dropDownMenuOptions (id, name, html) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    html.appendChild(element)
}

// Handles the theme colors 
function themeDarkColor () {
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
}

function themeLightColor () {
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}


let page = 1;
let matches = books

const starting = document.createDocumentFragment()

// Preview showing the image and authors name on UI when loaded

for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
  renderBookList(author, id, image, title, starting)
  
}

elements.dataListItems.appendChild(starting)

// Dropdown with genres user can pick from

const genreHtml = document.createDocumentFragment()
const firstGenreElement = document.createElement('option')
firstGenreElement.value = 'any'
firstGenreElement.innerText = 'All Genres'
genreHtml.appendChild(firstGenreElement)

// Allows Users to select a genre

for (const [id, name] of Object.entries(genres)) {
    dropDownMenuOptions (id, name, genreHtml) 
}

elements.searchGenre.appendChild(genreHtml)

// Dropdown with authors user can pick from

const authorsHtml = document.createDocumentFragment()
const firstAuthorElement = document.createElement('option')
firstAuthorElement.value = 'any'
firstAuthorElement.innerText = 'All Authors'
authorsHtml.appendChild(firstAuthorElement)

// Allows users to pick a author

for (const [id, name] of Object.entries(authors)) {
   dropDownMenuOptions (id, name, authorsHtml)
}

elements.searchAuthors.appendChild(authorsHtml)

//Toggles theme 

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    elements.settingsTheme.value = 'night'
    themeDarkColor ()
} else {
    elements.settingsTheme.value = 'day'
    themeLightColor ()
}

// Allows users to view more books
elements.showMoreBtn.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
elements.showMoreBtn.disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0
elements.showMoreBtn.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`

// Buttons section

//
elements.searchCancelBtn.addEventListener('click', () => {
    elements.searchModal.open = false
})

elements.settingsCancelBtn.addEventListener('click', () => {
    elements.settingsModal.open = false
})

elements.searchHeader.addEventListener('click', () => {
    elements.searchModal.open = true 
    elements.searchBookTitles.focus()
})

elements.settingsHeader.addEventListener('click', () => {
    elements.settingsModal.open = true 
})

elements.dataListCloseModalBtn.addEventListener('click', () => {
    elements.dataListModal.open = false
})

// Modal for toggling themes

elements.settingsForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        themeDarkColor ()
    } else {
        themeLightColor ()
    }
    
    elements.settingsModal.open = false
})

// Gets the user input from the search modal and then displays it.

elements.searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    page = 1;
    matches = result

// Shows filtered books in the UI
    if (result.length < 1) {
        elements.noResultMsg.classList.add('list__message_show')
    } else {
        elements.noResultMsg.classList.remove('list__message_show')
    }

    elements.dataListItems.innerHTML = ''
    const newItems = document.createDocumentFragment()

// Shows list of book by author

    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
        renderBookList(author, id, image, title, newItems)
    }

    elements.dataListItems.appendChild(newItems)
    elements.showMoreBtn.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

     //Let's user know how many books are in show more. 
elements.showMoreBtn.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `

    window.scrollTo({top: 0, behavior: 'smooth'});
    elements.searchModal.open = false
})

  elements.showMoreBtn.addEventListener('click', () => {
    const fragment = document.createDocumentFragment()

    // Shows preview on book

    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
         renderBookList( author, id, image, title, fragment)
    }

    elements.dataListItems.appendChild(fragment)
    page += 1
})

//Checks which book was clicked 

elements.dataListItems.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
 // Show Details of book

    if (active) {
        document.querySelector('[data-list-active]').open = true
        document.querySelector('[data-list-blur]').src = active.image
        document.querySelector('[data-list-image]').src = active.image
        document.querySelector('[data-list-title]').innerText = active.title
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        document.querySelector('[data-list-description]').innerText = active.description
    }
})