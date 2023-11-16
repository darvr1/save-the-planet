class Player {
    constructor() {
        this.angle = -PI/2;
        this.speed = 0;
        this.playerSize = 15;
        this.planetSize = 100;
        this.x;
        this.y;
        this.hp = 5;
        this.score = 0;
    }

    draw() {
        // Player's (x,y) to polar coordinetes
        // (r * cos(theta), r * sin(theta))
        this.x = this.planetSize * Math.cos(this.angle);
        this.y = this.planetSize * Math.sin(this.angle);

        c.beginPath();
        c.arc(this.x, this.y, this.playerSize, 2*PI, false);
        c.fillStyle = "#E0E0E0";
        c.fill();
        c.stroke();
    }

    update() {
        this.draw();
        this.angle += this.speed;
    }
}

class Bullet {
    constructor() {
        this.x = player.x;
        this.y = player.y;
        this.r = 5;
        this.hp = 1;
        // Makes the bullet's velocity face the direction where the player is facing
        this.xSpeed = Math.cos(player.angle);
        this.ySpeed = Math.sin(player.angle);
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 2*PI, false);
        c.fillStyle = "black";
        c.fill();
        c.stroke();
    }

    update() {
        this.draw()

        // Destroy bullet if it's out of the screen
        if ((this.x < -450 || this.x > 450) || (this.y < -450 || this.y > 450)) {
            this.hp = 0;
        }

        this.x += 10 * this.xSpeed;
        this.y += 10 * this.ySpeed;
    }
}