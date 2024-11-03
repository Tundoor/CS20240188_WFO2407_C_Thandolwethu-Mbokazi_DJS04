// Web Component for Book Preview section. 

class BookPreview extends HTMLElement {
   constructor() {
      super()
       const shadow = this.attachShadow({ mode: 'open'})

       const link = document.createElement('link');
       link.rel = 'stylesheet';
       link.href = 'styles.css';

  // HTML Template
  const template = `
      <div class="preview">
          <img class="preview__image" src="" alt="Book Image" />
          <div class="preview__info">
              <h3 class="preview__title"></h3>
              <div class="preview__author"></div>
          </div>
      </div>
  `;

  // Append styles and template to shadow DOM
  this.shadowRoot.innerHTML = `
      ${template}
  `;

  shadow.appendChild(link)
}
  
  //Method to set the book details
 set bookDetails({ image, title, author }) {
  this.shadowRoot.querySelector('.preview__image').src = image;
  this.shadowRoot.querySelector('.preview__title').textContent = title;
  this.shadowRoot.querySelector('.preview__author').textContent = author;
  }

} 

// Defines the custom element. 
  customElements.define("book-preview", BookPreview )

