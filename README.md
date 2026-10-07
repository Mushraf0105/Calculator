# Premium Glassmorphism Calculator

A modern, visually stunning calculator web application built with HTML, CSS, and JavaScript. This project demonstrates responsive design, modern UI aesthetics (Glassmorphism), and object-oriented JavaScript for robust state management.

## Features

- **Basic Arithmetic Operations**: Supports addition, subtraction, multiplication, and division.
- **Decimal Support**: Allows floating-point calculations with safeguards against multiple decimals.
- **Divide-by-Zero Handling**: Elegantly handles division by zero by displaying an "Error" state with a subtle shake animation.
- **Keyboard Support**: Fully navigable using a physical keyboard (Numpad, Enter, Backspace, Escape).
- **Modern UI**: Features a sleek Glassmorphism design, animated gradient background, and hover micro-animations.
- **Safe Evaluation**: Arithmetic is handled via custom logic (`switch` statements) rather than using the potentially unsafe `eval()` function.

## Technologies Used

- **HTML5**: For semantic structure.
- **CSS3**: Utilizing CSS Grid for button layout, Custom Properties (variables) for theming, and keyframe animations.
- **JavaScript (ES6)**: Using ES6 Classes for state management and DOM manipulation.

## Project Structure

- `index.html`: The main HTML document containing the structure of the calculator.
- `style.css`: The stylesheet defining the premium visuals, animations, and responsive layout.
- `script.js`: The JavaScript file containing the `Calculator` class and event listeners.

## Approach and Outcome

- **Approach**: We adopted an Object-Oriented Programming (OOP) methodology to isolate the calculator's state from the UI. The UI was designed with a mobile-first philosophy using modern CSS features like Grid and Glassmorphism for a premium aesthetic. Arithmetic was safely evaluated using strict JavaScript logic (`switch` statements), completely avoiding the `eval()` function to eliminate security vulnerabilities and ensure predictable calculations.
- **Outcome**: A highly responsive, secure, and visually appealing web calculator. The separation of concerns ensures that the logic is scalable and maintainable, and the robust event handling covers both mouse clicks and physical keyboard inputs seamlessly.

## Deployment Configuration

This project is a static web application containing only HTML, CSS, and Vanilla JavaScript.
- **Hosting**: It can be hosted on any static file server such as GitHub Pages, Vercel, Netlify, or AWS S3.
- **Build Step**: None required. The files are production-ready.
- **CI/CD**: A simple GitHub Action can be configured to deploy the `main` branch directly to GitHub Pages upon push. 

## Rollback Evidence

Since this is a static site deployment:
- **Version Control**: All changes are tracked in Git. 
- **Rollback Process**: In the event of a critical bug in production, rolling back involves using `git revert <commit-hash>` to revert the `main` branch to the last known stable state, followed by a `git push`.
- **Hosting Rollback**: Platforms like Vercel or Netlify automatically keep immutable builds. A rollback is performed instantly via the hosting dashboard by clicking "Promote to Production" on a previous successful deployment, completely avoiding any downtime.

## How to Run

1. Clone or download this repository.
2. Open the `index.html` file directly in your preferred web browser. No local server or build tools are required!

## Usage

- Click the buttons on the screen to perform calculations.
- Use `AC` to clear the entire screen and memory.
- Use `DEL` to delete the last entered digit.
- **Keyboard shortcuts**:
  - `0-9` and `.` for numbers.
  - `+`, `-`, `*`, `/` for operations.
  - `Enter` or `=` for equals.
  - `Backspace` for delete.
  - `Escape` for All Clear (AC).
