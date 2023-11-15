class Enemy {
    constructor() {
        this.x;
        this.y;
        this.r = 10;
        this.hp = 1;

        do {
            this.x = (Math.random() - 0.5) * (canvas.width + 200);
            this.y = (Math.random() - 0.5) * (canvas.width + 200);
        } while((this.x > -450 && this.x < 450) && (this.y > -450 && this.y < 450));
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 2*PI, false);
        c.fillStyle = "gray";
        c.fill();
        c.stroke();
    }

    update() {
        this.draw();
        this.angle = Math.atan(this.y/this.x);
        this.xSpeed = Math.cos(this.angle);
        this.ySpeed = Math.sin(this.angle);

        // Flip velocities if x > 1
        // Ensures 'enemy' move towards origin
        if (this.x > 0) {
            this.xSpeed = -this.xSpeed;
            this.ySpeed = -this.ySpeed;
        } else if (this.x === 0) {
            this.ySpeed = -this.ySpeed;
        }

        // Collision Detection
        // Hit planet
        if ((getDistance(this.x, this.y, 0, 0) < player.planetSize + this.r) ||
            (getDistance(this.x, this.y, player.x, player.planetSize * Math.sin(player.angle)) < player.playerSize + this.r)) {
            this.hp = 0;
            player.hp--;
        }

        // Hit bullet
        for (let i = bullets.length - 1; i >= 0; i--) { 
            if (getDistance(this.x, this.y, bullets[i].x, bullets[i].y) < bullets[i].r + this.r) {
                this.hp = 0;
                bullets[i].hp = 0;
                player.score++;
            }
        }

        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
}