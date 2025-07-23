# Tic-Tac-Toe Web Application
A classic Tic-Tac-Toe game built with a focus on clean, modern web technologies and core JavaScript principles. This project serves as a practical exercise in creating an interactive, user-friendly web application from the ground up.

Live Demo: 

## Technologies Used
This project was built using fundamental web technologies, emphasizing a solid understanding of the building blocks of the web.

-- HTML5: The structure and semantic foundation of the game. Elements like <header>, <footer>, <main>, and <section> are used to create a well-organized document outline. The game board itself is structured logically for easy manipulation with CSS and JavaScript.

CSS3: Used for all styling, layout, and responsive design. Advanced CSS features were leveraged to create a modern and intuitive user interface without relying on external frameworks.

JavaScript (ES6+): The core logic of the game resides here. Modern JavaScript (ECMAScript 6 and beyond) is used for its cleaner syntax and powerful features like const/let, arrow functions, and modules.

## UI/UX Design & Layout
The user interface was crafted with user experience in mind, ensuring the game is both visually appealing and easy to play. The layout is fully responsive and adapts to various screen sizes, from mobile phones to desktop monitors.

CSS Grid Layout: The 3x3 game board is built using CSS Grid (display: grid). This was the perfect tool for the job, allowing for the creation of a robust and perfectly proportioned grid with minimal code. It simplifies the alignment of cells and ensures the board maintains its shape.

Flexbox: The overall page layout, including the header, game status area, and reset button alignment, is managed with Flexbox (display: flex). Flexbox provides a powerful and efficient way to align and distribute space among items in a container, making it ideal for arranging the components of the UI around the central game board.

Responsive Design: Media queries are used to adjust the layout and font sizes for different viewports. This ensures a seamless experience whether playing on a small phone or a large desktop screen. The layout fluidly adapts without breaking.

Visual Feedback: The UI provides clear feedback to the user. This includes:

Highlighting the current player's turn.

Distinct visual styles for 'X' and 'O' markers.

A clear message indicating the winner or a draw.

Hover effects on clickable cells to show interactivity.

## Core JavaScript Concepts Explored
- This project was a deliberate effort to deepen my understanding of foundational and advanced JavaScript concepts.

**Modularity**

* Instead of writing all the code in one large file, the JavaScript was broken down into logical, self-contained modules. This approach, often called the "Module Pattern," helps in organizing the codebase and makes it more maintainable.

**Game Logic Module**: A dedicated module that handles the state of the game. It doesn't know anything about the HTML or CSS. Its only jobs are to track the board's state, check for a win or a draw, and manage player turns.

**UI Module**: This module is responsible for everything the user sees. Its job is to render the board, update the display when a move is made, and show messages to the user. It takes commands from the main controller but doesn't handle any game logic itself.

**Controller**: A central module that connects the Game Logic Module and the UI Module. It listens for user events (like a click on a cell), tells the game logic to update its state, and then tells the UI module to re-render the display based on the new state.

This separation of concerns makes the code easier to debug, test, and scale.

**Closures**
Closures are a fundamental concept in JavaScript, and they were used strategically in this project to manage state and create private data.

A closure occurs when a function "remembers" the environment in which it was created. In the context of this Tic-Tac-Toe game, a closure was used within the Game Logic Module to protect the game's state.

Example:
`
const gameController = (() => {
  // These variables are "private" to the outside world
  // but accessible to the functions returned below, thanks to closure.
  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';

  const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  };

  const makeMove = (index) => {
    if (board[index] === '') {
      board[index] = currentPlayer;
      // ... check for win ...
      switchPlayer();
      return true; // Move was successful
    }
    return false; // Cell was already taken
  };

  // We only expose the functions we want the public to use.
  return { makeMove };
})();`

// You can only call gameController.makeMove(0);
// You CANNOT access gameController.board or gameController.currentPlayer directly.

In this example, the board array and currentPlayer variable are not accessible from the global scope. They can only be modified by the makeMove function, which is exposed publicly. This prevents accidental changes to the game's state and is a powerful pattern for encapsulation.

## How to Run Locally
* To get a local copy up and running, follow these simple steps.

* Clone the repository:

* git clone https://github.com/Joseph-Scripture/tig-tag-toe.git

* Navigate to the project directory:

* cd tic-tac-toe

* Open index.html in your browser:
* You can simply double-click the index.html file, or use a live server extension in your code editor for a better development experience.