
# Calculator.js

A sleek and functional web-based calculator built with vanilla JavaScript, HTML, and CSS. This project demonstrates modern JavaScript practices, including ES6 modules, for DOM manipulation and event handling to create an interactive user interface.


## Features

*   Standard arithmetic operations: addition, subtraction, multiplication, and division.
*   Percentage and negation functions.
*   Clear (AC) and decimal point support.
*   Responsive design for use on various screen sizes.
*   Displays the ongoing calculation in a memory view.

## Tech Stack

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6 Modules)

## Getting Started

To run this project locally, you'll need a local web server because it uses ES6 modules, which are subject to CORS restrictions when run directly from the local filesystem (`file:///`).

### Prerequisites

*   A modern web browser.
*   Node.js (optional, for using `npx serve`).

### Installation & Usage

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SoroushSadeghzadeh/calculator-js.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd calculator-js
    ```

3.  **Serve the project:**
    The easiest way is to use a simple HTTP server. If you have Node.js installed, you can run:
    ```bash
    npx serve
    ```
    Alternatively, you can use a code editor extension like "Live Server" for VS Code.

4.  **Open the application:**
    Open your web browser and navigate to the local address provided by your server (e.g., `http://localhost:3000`).

## File Structure

```
calculator-js/
├── index.html          # The main HTML file with the calculator structure.
├── style.css           # All styles for the calculator UI.
├── README.md           # Project documentation.
└── src/
    ├── Calculator.js   # ES6 module with the core calculator logic.
    └── index.js        # Main script to handle DOM events and UI updates.
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

