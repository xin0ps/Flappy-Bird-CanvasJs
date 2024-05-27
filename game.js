var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var gameOver = false;
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

const img = new Image();
img.src = "https://img1.pnghut.com/t/23/15/11/G9RVhK5kWU/flappy-bird-sprite-opengameartorg-artwork-flight.jpg";


var bird = { x: 250, y: canvasHeight / 2, size: 40, speedY: 0 };
var gravity = 0.05;


var score=0;






    canvas.addEventListener("click", function() {
        bird.speedY = -2; 
    });
    
    var pipes = [];
    
    function addPipes() {
        var pipeGap = 150; 
        var minHeight = 50;
        var maxHeight = canvasHeight - pipeGap - minHeight; 
    
        var randomHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
    
        
        pipes.push({ x: canvasWidth, y: randomHeight, type: "top" });
        pipes.push({ x: canvasWidth, y: randomHeight + pipeGap, type: "bottom" });
    
        
        if (pipes.length > 4) {
            pipes.splice(0, pipes.length - 4);
        }
    }
    
    function drawScore() {
        context.fillStyle = "red"; 
        context.font = "24px Arial"; 
        context.fillText("Score: " + score, 10, 30); 
    }
    
    function drawPipes() {
        context.fillStyle = "brown"; 
     
        for (var i = 0; i < pipes.length; i++) {
            var pipe = pipes[i];
            if (pipe.type === "top") {
                context.fillRect(pipe.x, 0, 50, pipe.y); 
            } else {
                context.fillRect(pipe.x, pipe.y, 50, canvasHeight - pipe.y); 
            }
        }
    }
    
    function updatePipes() {
        
        for (var i = 0; i < pipes.length; i++) {
            pipes[i].x -= 2; 
    
           
            if (pipes[i].x + 50 <= 0) {
                pipes.splice(i, 1);
                i--; 
            }
        }
        checkPipePass();
    }
    
    function gameLoop() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        drawScore();
        drawPipes(); 
        updatePipes();
        checkCollision();
      
        context.fillStyle = "red";
        context.drawImage(img,bird.x, bird.y, bird.size, bird.size);
    
    
        if (bird.y <= 0) {
            bird.y = 0;
            bird.speedY = 0; 
            gameover();
            cancelAnimationFrame(animationID);
        } else if (bird.y + bird.size >= canvasHeight || gameOver) {
            bird.y = canvasHeight - bird.size;
            bird.speedY = 0; 
            gameover();
            cancelAnimationFrame(animationID);
    
        } 
    
    
      
    
    
    
        bird.speedY += gravity;
        bird.y += bird.speedY;
    
        requestAnimationFrame(gameLoop);
    }
    
    
    gameLoop();
    
    
    pipeInterval = setInterval(addPipes, 2000);
    
    
    function gameover(){
        context.fillStyle = "red"; 
        context.font = "40px Arial"; 
        context.fillText("Game Over", 350, 200);
        
        context.fillText("Score: " + score, 370, 240);
    }
    
    
    function checkCollision() {
        for (var i = 0; i < pipes.length; i++) {
            var pipe = pipes[i];
            if (pipe.type === "bottom") {
                
                if (
                    bird.x < pipe.x + 50 &&
                    bird.x + bird.size > pipe.x &&
                    bird.y + bird.size > pipe.y
                ) {
                    gameOver = true;
                }
            } else {
                
                if (
                    bird.x < pipe.x + 50 &&
                    bird.x + bird.size > pipe.x &&
                    bird.y < pipe.y
                ) {
                    gameOver = true;
                }
            }
           
        }
        
    }
    
    
    function checkPipePass() {
        for (var i = 0; i < pipes.length; i += 2) {
            var topPipe = pipes[i];
            var bottomPipe = pipes[i + 1];
    
            
            if (bird.x > topPipe.x && !topPipe.passed) {
                topPipe.passed = true; 
                score++; 
            }
    
          
        }
    }
    

