var boardElement;
var context;

var dashboard = {
  blockSize: 25,
  totalRow: 20,
  totalCol: 20,
  height: 0,
  width: 0,
  generateDimensions: function() {
    this.height = this.blockSize * this.totalRow;
    this.width = this.blockSize * this.totalCol;
  }
};

var apple = {
  x: 0,
  y: 0,
  generateLocation: function() {
    this.x = Math.random() * dashboard.totalCol;
    this.x = Math.floor(this.x);
    this.y = Math.random() * dashboard.totalRow;
    this.y = Math.floor(this.y);
  }
};

var snake = {
  segments: [{ x: 10, y: 10 }],
  direction: { x: 1, y: 0 },
  move: function() {
    // Get the head of the snake
    var head = this.segments[0];

    // Create a new head position based on the current direction
    var newHead = {
      x: head.x + this.direction.x,
      y: head.y + this.direction.y,
    };

    // Add the new head to the beginning of the segments array
    this.segments.unshift(newHead);

    // Remove the last segment
    this.segments.pop();
  },
};

function draw() {
  // Clear the canvas
  context.clearRect(0, 0, dashboard.width, dashboard.height);

  // Draw the snake
  context.fillStyle = "blue";
  for (var i = 0; i < snake.segments.length; i++) {
    var segment = snake.segments[i];
    context.fillRect(
      segment.x * dashboard.blockSize,
      segment.y * dashboard.blockSize,
      dashboard.blockSize,
      dashboard.blockSize
    );
  }

  // Draw the apple
  context.fillStyle = "red";
  context.fillRect(
    apple.x * dashboard.blockSize,
    apple.y * dashboard.blockSize,
    dashboard.blockSize,
    dashboard.blockSize
  );
}

function update() {
  snake.move();

  // Check if the snake has hit a wall
  var head = snake.segments[0];
  if (head.x < 0 || head.x >= dashboard.totalCol || head.y < 0 || head.y >= dashboard.totalRow) {
      // Snake has hit a wall, reset the game
      alert("You hit a wall! Game over.");
      snake.segments = [{ x: 10, y: 10 }];
      snake.direction = { x: 1, y: 0 };
      apple.generateLocation();
  }

  // Check if the snake has eaten the apple
  if (head.x == apple.x && head.y == apple.y) {
      // Snake has eaten the apple, add a new segment to the snake and generate a new apple
      snake.segments.push({});
      apple.generateLocation();
  }

  draw();
}



function changeDirection(event) {
  switch (event.keyCode) {
    case 37: // Left arrow
      snake.direction = { x: -1, y: 0 };
      break;
    case 38: // Up arrow
      snake.direction = { x: 0, y: -1 };
      break;
    case 39: // Right arrow
      snake.direction = { x: 1, y: 0 };
      break;
    case 40: // Down arrow
      snake.direction = { x: 0, y: 1 };
      break;
  }
}

window.onload = function() {
  boardElement = document.getElementById("board");
  dashboard.generateDimensions();
  boardElement.height = dashboard.height;
  boardElement.width = dashboard.width;
  context = boardElement.getContext("2d");
  boardElement.style.border = "2px solid black";

  apple.generateLocation();

  document.addEventListener("keyup", changeDirection);
  setInterval(update, 2000 / 10);
};