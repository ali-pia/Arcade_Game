// Initial player score 
var score = 0;
document.getElementById('playerScore').innerHTML = score;

// variables'setting  Game's Enemies 
var Enemy = function(x, y, speed) {
    this.sprite = 'images/spider.png';
    this.speed = speed;
    this.x = x;
    this.y = y;
};

/* Update the enemy's position, required method for game
 * Parameter: dt, a time delta between ticks 
 */
Enemy.prototype.update = function(dt) {
    if (this.x < 505) {
        this.x = (this.speed * dt) + this.x;
        this.x += (150 * dt);
    } else {
        this.x = -90;
    }

    // If the enemy and the player collide
    if (this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
        score = 0;
        document.getElementById('playerScore').innerHTML = score;
        player.reset();
    }
};

/* Draw enemy on the screen
 * required method for game
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* player class
 * update(), render() and
 * a handleInput() method.
 */

var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 320;
};

// Every time the player position is updated
Player.prototype.update = function() {

    // when player reaches the water
    if (player.y < 20) {
        score++;
        document.getElementById('playerScore').innerHTML = score;
        this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (direction == 'left' && this.x > 0) {
        this.x -= 50;
    }
    if (direction == 'right' && this.x < 400) {
        this.x += 50;
    }
    if (direction == 'up' && this.y > 3) {
        this.y -= 50;
    }
    if (direction == 'down' && this.y < 400) {
        this.y += 50;
    }
};

//  player's reset to the starting point
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.
var enemy1 = new Enemy(-90, 60, 10) ;
var enemy2 = new Enemy(-190, 140, 40);
var enemy3 = new Enemy(-290, 230, 90);
var enemy4 = new Enemy(-390, 140, 30);
var enemy5 = new Enemy(-490, 60, 60);
var enemy6 = new Enemy(-890, 230, 90);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});