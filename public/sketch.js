let player = new Player();
let bullets = [];
let enemies = [];
let gameOver = false;
let difficultyScale = 0;

// Restart
addEventListener("mouseup", () => {
    if (gameOver) {
        gameOver = false;
        player.hp = 5;
        player.score = 0;
        difficultyScale = 0;
        shootBullet();
        generateEnemy();
        enemies.splice(0, enemies.length - 1);
        bullets.splice(0, enemies.length - 1);
    }
})

function generateEnemy() {
    if (!gameOver) {
        setTimeout(generateEnemy, 2500 - difficultyScale);
        enemies.push(new Enemy());
    }
}

function shootBullet() {
    if (!gameOver) {
        setTimeout(shootBullet, 400 - (difficultyScale * 0.1));
        bullets.push(new Bullet());
    }
}

function animate() {
    if (!gameOver) {
        c.clearRect(0, 0, canvas.width, canvas.height);
        
        // Save current transformations of the canvas
        c.save();
        // Translate the canvas to the middle so that
        // Point (0,0) will be at the center of the canvas
        // Instead of top left
        c.translate(canvas.width / 2, canvas.height / 2);

        // If enemy's health is zero, remove it from the array
        for (let i = enemies.length - 1; i >= 0; i--) { 
            if (enemies[i].hp <= 0) {
                enemies.splice(i, 1);
                difficultyScale += (50 / Math.pow(Math.E, player.score / 60));
            } else {
                enemies[i].update();
            }
        }
        
        // Same idea as 'enemies' deletion
        for (let i = bullets.length - 1; i >= 0; i--) { 
            if (bullets[i].hp <= 0) {
                bullets.splice(i, 1);
            } else {
                bullets[i].update();
            }
        }
        
        player.update();
        
        // Text
        c.font = "24px calibri";
        c.fillStyle = "black";
        c.fillText("HP: " + player.hp, -380, -360);
        c.fillText("Score: " + player.score, -300, -360);
        if (player.hp <= 0) {
            c.font = "40px calibri";
            c.fillText("Press anywhere to restart.", -250, 200);
        }

        // Revert translation
        c.restore();
        
        // Player Movement
        if ( key.right && key.space) {
            player.speed = 0.04;
        } else if (key.left && key.space) {
            player.speed = -0.04;
        } else if (key.right) {
            player.speed = 0.01;
        } else if (key.left) {
            player.speed = -0.01;
        } else {
            player.speed = 0;
        }
        
        if (player.hp <= 0) {
            gameOver = true;
        }
    }
    window.requestAnimationFrame(animate);
}

shootBullet();
generateEnemy();
animate();