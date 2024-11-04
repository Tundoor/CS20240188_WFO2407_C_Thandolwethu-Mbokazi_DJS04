class DropdownMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Create a shadow root
    
      


       // Create the select element
        const selectElement = document.createElement('select');
        this.shadowRoot.appendChild(selectElement);

        // Store a reference to the select element for adding options later
        this.selectElement = selectElement;
    }

    // Method to add options
    addOptionAuthor(id, name) {
        const option = document.createElement('option');
        option.value = id;
        option.innerText = name;
        this.selectElement.appendChild(option);
    }

    addOptionGenre(id, name) {
        const option = document.createElement('option');
        option.value = id;
        option.innerText = name;
        this.selectElement.appendChild(option);
    }


}
// Define the custom element
customElements.define('dropdown-menu', DropdownMenu);
