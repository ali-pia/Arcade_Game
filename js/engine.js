/* Engine.js
 * Game loop functionality: game board and
 * render methods for player and enemy objects.
 */

var Engine = (function(global) {
    //Canvas element, setting and insertion in DOM.
     
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 600;
    doc.body.appendChild(canvas);

    /* Game's loop point
     * update and render methods.
     */
    function main() {
    var now = Date.now(),
        dt = (now - lastTime) / 1000.0;
        update(dt);
        render();
        lastTime = now;

        // Browser's requestAnimationFrame function 
        
        win.requestAnimationFrame(main);
        }

    //LastTime variable (for game loop) 
     
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* Function update entity's data. 
     * Collision detection
    */

    function update(dt) {
        updateEntities(dt);
    // checkCollisions();
    }

    // Update function for player object
  
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    //Function render (draws the "game level")

    function render() {
        /* array holds relative URL to the image used
         * for row of level's game.
         */
        var rowImages = [
                'images/water-block.png',   
                'images/stone-block.png',   
                'images/stone-block.png',  
                'images/stone-block.png',   
                'images/grass-block.png',   
                'images/grass-block.png'    
            ],
            numRows = 6,
            numCols = 5,
            row, col;
        
        // Clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        /* RowImages array, draw the correct 
         * grid's image
         */
        for (row = 0; row < numRows; row++) {
        for (col = 0; col < numCols; col++) {

        // Canvas' context element's drawImage function 
        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    //Render function  
    function renderEntities() {

        /* allEnemies array and loop through all of the objects, call
         * the render function
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    // Reset function
    function reset() {
       
    }

    /* Load images for draw game level 
     * Set callback method (init) 
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/spider.png',
        'images/char-cat-girl.png'
    ]);
    Resources.onReady(init);

    //Canvas' context object to the global variable 
     
    global.ctx = ctx;
})(this);
