let bullets = [];
let enemies = [];
let score = 0;
let gameOver = false;
let stage = 1;
let enemySpeed = 2;
let spaceshipX;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spaceshipX = width / 2;
  resetGame();
}

function resetGame() {
  bullets = [];
  enemies = [];
  score = 0;
  stage = 1;
  enemySpeed = 2;
  gameOver = false;
  spaceshipX = width / 2;
  background(0); // Black background to represent space
  drawStars(200); // Draw 200 stars
  spawnEnemies(10); // Spawn 10 enemies
}

function drawStars(numStars) {
  for (let i = 0; i < numStars; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(1, 3);
    fill(255);
    noStroke();
    ellipse(x, y, size, size);
  }
}

function draw() {
  if (gameOver) {
    displayGameOver();
    return;
  }

  background(0);
  drawStars(200);
  updateSpaceship();
  drawSpaceship(spaceshipX, height - 50);
  updateBullets();
  updateEnemies();
  checkCollisions();
  displayScore();
  checkStage();
}

function updateSpaceship() {
  if (keyIsDown(LEFT_ARROW)) {
    spaceshipX -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    spaceshipX += 5;
  }
  spaceshipX = constrain(spaceshipX, 0, width);
}

function drawSpaceship(x, y) {
  fill(0, 255, 0);
  noStroke();
  triangle(x, y, x - 20, y + 40, x + 20, y + 40);
}

function keyPressed() {
  if (gameOver && key === " ") {
    resetGame();
  } else if (key === " ") {
    bullets.push({ x: spaceshipX, y: height - 50 });
  }
}

function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y -= 5;
    fill(255, 0, 0);
    noStroke();
    ellipse(bullets[i].x, bullets[i].y, 5, 10);
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
    }
  }
}

function spawnEnemies(numEnemies) {
  for (let i = 0; i < numEnemies; i++) {
    enemies.push({ x: random(width), y: random(-1000, 0) });
  }
}

function updateEnemies() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].y += enemySpeed;
    fill(255, 255, 0);
    noStroke();
    ellipse(enemies[i].x, enemies[i].y, 20, 20);
    if (enemies[i].y > height) {
      gameOver = true;
    }
  }
}

function checkCollisions() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    for (let j = bullets.length - 1; j >= 0; j--) {
      let d = dist(enemies[i].x, enemies[i].y, bullets[j].x, bullets[j].y);
      if (d < 15) {
        enemies.splice(i, 1);
        bullets.splice(j, 1);
        score += 10;
        break;
      }
    }
  }
}

function displayScore() {
  fill(255);
  textSize(24);
  text(`Score: ${score}`, 10, 30);
  text(`Stage: ${stage}`, 10, 60);
}

function displayGameOver() {
  background(0);
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
  textSize(24);
  text("Press Space to Restart", width / 2, height / 2 + 50);
}

function checkStage() {
  if (score >= stage * 100 && stage < 5) {
    stage++;
    enemySpeed += 1; // Increase enemy speed with each stage
    spawnEnemies(10); // Spawn more enemies for the new stage
  }
}
