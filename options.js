class DropdownMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Create a shadow root
    
    const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'styles.css';
      this.shadowRoot.appendChild(link)


       // Create the select element
        const selectElement = document.createElement('select');
        this.shadowRoot.appendChild(selectElement);

        // Store a reference to the select element for adding options later
        this.selectElement = selectElement;
    }

    // Method to add options
    addOption(id, name) {
        const option = document.createElement('option');
        option.value = id;
        option.innerText = name;
        this.selectElement.appendChild(option);
    }


}
// Define the custom element
customElements.define('dropdown-menu', DropdownMenu);
