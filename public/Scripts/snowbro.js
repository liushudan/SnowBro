
/*------------------------------------------Variables--------------------------------------------------*/

var game = document.getElementById("game");
var snowman1 = {
    x: 0,
    y: 0
};
var points = 0;
var lives= 3;
var blocks = [];
var goldblocks = [];
var blackblocks = [];
var snowMen = [];
var frame = 0;
var posleft = 0;
var posright = 0;
var pointsArray = [];
var fox = document.getElementsByClassName('full')[0];

$('#restartBox').hide();

document.getElementById('high').innerHTML = 'Current High Score, ' + localStorage.getItem("highscore");

/*------------------------------------------Snowfalke class--------------------------------------------------*/
var Block = function () {
    this.createElement = function () {
        var div = document.createElement('div');
        div.className = "block";
        return div;
    };
        /*------------------------------------------if snowman is moving on left or right edge and 
        screen is scrolling, snowflake moves in oposite direction --------------------------------------------------*/
    
    this.update = function () {
        this.y += this.speed;
       /* if (snowman1.x <= 10) {
            this.x += 5;
        }
        if (snowman1.x >= 800) {
            this.x -= 5;
        }*/
    }
    /*------------------------------------------Where snowflake starts from--------------------------------------------------*/
    this.draw = function () {
        this.element.style.top = this.y + "px";
        this.element.style.left = this.x + "px";
    };
     /*------------------------------------------is coliding with snowman??--------------------------------------------------*/
    this.isCollidingsnowman1 = function () {
        return (snowman1.x < this.x + 50 &&
            snowman1.x + 70 > this.x &&
            snowman1.y < this.y + 50 &&
            98 + snowman1.y > this.y);
    };
    
       /*------------------------------------------wheres snowflake starts generator--------------------------------------------------*/
    this.x = Math.floor((Math.random() * 900) + 0);
    this.y = 0;
       /*------------------------------------------Snowflake falling speed--------------------------------------------------*/
    this.speed = Math.floor((Math.random() * 14) + 1);
    this.element = this.createElement();
};

/*------------------------------------------Gold Snowflake Class-------------------------------------------------*/

var GoldBlock = function () {
    this.createElement = function () {
        var div = document.createElement('div');
        div.className = "goldblock";
        return div;
    };
    /*------------------------------------------if snowman is moving on left or right edge and 
        screen is scrolling, snowflake moves in oposite direction --------------------------------------------------*/
    this.update = function () {
        this.y += this.speed;
        /*if (snowman1.x <= 10) {
            this.x += 7;
        }
        if (snowman1.x >= 800) {
            this.x -= 7;
        }*/
    }
        /*------------------------------------------Where snowflake starts from--------------------------------------------------*/
    this.draw = function () {
        this.element.style.top = this.y + "px";
        this.element.style.left = this.x + "px";
    };
        /*------------------------------------------is coliding with snowman??--------------------------------------------------*/
    this.isCollidingsnowman1 = function () {
        return (snowman1.x < this.x + 30 &&
            snowman1.x + 70 > this.x &&
            snowman1.y < this.y + 30 &&
            98 + snowman1.y > this.y);
    };
      /*------------------------------------------wheres snowflake starts generator--------------------------------------------------*/
    this.x = Math.floor((Math.random() * 900) + 0);
    this.y = 0;
       /*------------------------------------------Snowflake falling speed--------------------------------------------------*/
    this.speed = Math.floor((Math.random() * 14) + 1);
    this.element = this.createElement();
};

/*------------------------------------------Black Snowflake--------------------------------------------------*/

var BlackBlock = function () {
    this.createElement = function () {
        var div = document.createElement('div');
        div.className = "blackblock";
        return div;
    };
    /*------------------------------------------if snowman is moving on left or right edge and 
        screen is scrolling, snowflake moves in oposite direction --------------------------------------------------*/
    this.update = function () {
        this.y += this.speed;
       /* if (snowman1.x <= 10) {
            this.x += 5;
        }
        if (snowman1.x >= 800) {
            this.x -= 5;
        }*/
    };
        /*------------------------------------------Where snowflake starts from--------------------------------------------------*/
    this.draw = function () {
        this.element.style.top = this.y + "px";
        this.element.style.left = this.x + "px";
    };
     /*------------------------------------------is coliding with snowman??--------------------------------------------------*/
    this.isCollidingsnowman1 = function () {
        return (snowman1.x < this.x + 100 &&
            snowman1.x + 70 > this.x &&
            snowman1.y < this.y + 100 &&
            98 + snowman1.y > this.y);
    };
       /*------------------------------------------wheres snowflake starts generator--------------------------------------------------*/
    this.x = Math.floor((Math.random() * 900) + 0);
    this.y = 0;
       /*------------------------------------------Snowflake falling speed--------------------------------------------------*/
    this.speed = Math.floor((Math.random() * 14) + 1);
    this.element = this.createElement();
};


/*------------------------------------------Update GameState--------------------------------------------------*/

var tick = function () {
    getPosition();
    frame++;
    
    /*------------------------------------------how often/ at what interval to create snowflakes--------------------------------------------------*/

    if (frame % 20 == 0) {
        CreateShit();
    }
    if (frame % 100 == 0) {
        CreateGold();
    }
    if (frame % 40 == 0) {
        CreateBlack();
    }

/*------------------------------------------determine when to scroll screen, currently not used--------------------------------------------------*/
    /*if (snowman1.x <= 10) {
        posleft += 5;
        fox.style.backgroundPosition = posleft + "px 0px";
    }
    if (snowman1.x >= 750) {
        posright -= 5;
        fox.style.backgroundPosition = posright + "px 0px";
    }*/

/*------------------------------------------on collision of snowman and blackflake, and collision of goldflake and ground--------------------------------------------------*/
    for (var z in blackblocks) {
        blackblocks[z].update();
        blackblocks[z].draw();
        if (blackblocks[z].isCollidingsnowman1()) {
                $('.snowMan').css('font-size','40px');
                $('.snowMan').html('POW!');
            setTimeout(function(){
                $('.snowMan').html('');
            }, 500);
            
            $(".snowMan").effect("explode", 400, 30);
            game.removeChild(blackblocks[z].element);
            blackblocks.splice(z, 1);
            if(lives == 1){
                $('#restartBox').show();
                $('#restartBox').html('<center><h2>You Loose!<br/> You have 0 lives left<br/>Final Score | ' + points + '<h2/><button onClick="Restart()" class="button1">Restart</button></center>')
            }else{
                lives--;
                $('#restartBox').show();
                $('.snowMan').css('font-size','20px');
                $('#restartBox').html('<center><h2>You Loose!<br/>You have ' + lives + ' lives left<h2/><button class="button1" onClick="Restart()">Restart</button><button onClick="Continue()" class="button1">Continue</button></center>')
            }
        }
        if (blackblocks[z].y >= 700) {
            game.removeChild(blackblocks[z].element);
            blackblocks.splice(z, 1);
        }
    }

    /*------------------------------------------on collision of snowman and goldflake, and collision of goldflake and ground--------------------------------------------------*/
    for (var g in goldblocks) {
        goldblocks[g].update();
        goldblocks[g].draw();
        if (goldblocks[g].isCollidingsnowman1()) {
            game.removeChild(goldblocks[g].element);
            goldblocks.splice(g, 1);
            points += 500;
            document.getElementById('points').innerHTML = points;
              $('.snowMan').html('+500');
            setTimeout(function(){
                $('.snowMan').html('');
            }, 500);
        }
        if (goldblocks[g].y >= 700) {
            game.removeChild(goldblocks[g].element);
            goldblocks.splice(g, 1);
        }
    }
    
    /*------------------------------------------on collision of snowman and whiteflake, and collision of goldflake and ground--------------------------------------------------*/

    for (var b in blocks) {
        blocks[b].update();
        blocks[b].draw();
        if (blocks[b].isCollidingsnowman1()) {
            game.removeChild(blocks[b].element);
            blocks.splice(b, 1);
            points += 100;
            document.getElementById('points').innerHTML = points;
            $('.snowMan').html('+100');
            setTimeout(function(){
                $('.snowMan').html('');
            }, 500);
        }
        if (blocks[b].y >= 700) {
            game.removeChild(blocks[b].element);
            blocks.splice(b, 1);
        }
    }
/*------------------------------------------if currnt points is higher than high score, set new high score and save to local storage--------------------------------------------------*/
    if (points > localStorage.getItem("highscore")) {
        localStorage.setItem("highscore", points);
        document.getElementById('high').innerHTML = 'Current High Score, ' + localStorage.getItem("highscore");
    }
}
/*------------------------------------------create white snowflake--------------------------------------------------*/
function CreateShit() {
    var block = new Block();
    game.appendChild(block.element);
    blocks.push(block);
};
/*------------------------------------------create gold snowflake--------------------------------------------------*/
function CreateGold() {
    var goldblock = new GoldBlock();
    game.appendChild(goldblock.element);
    goldblocks.push(goldblock);
};
/*------------------------------------------create black snowflake--------------------------------------------------*/
function CreateBlack() {
    var blackblock = new BlackBlock();
    game.appendChild(blackblock.element);
    blackblocks.push(blackblock);
};

//Update the game and draw the screen 30 times per second!
setInterval(tick, Math.floor(1000 / 30));


/*------------------------------------------Restart--------------------------------------------------*/

var Restart = function(){
    window.location = "";
};

/*------------------------------------------Continue-------------------------------------------------*/

var Continue = function(){
    $('#restartBox').hide();
    $('#restartBox').html('');
   $('.snowMan').show();
};

/*------------------------------------------SnowMan Class--------------------------------------------------*/
var SnowMan = function () {

    this.createElement = function () {
        var div = document.createElement('div');
        div.className = "snowMan";
        return div;
    };
        /*------------------------------------------Where snowman starts from--------------------------------------------------*/
    this.x = 250;
    this.y = 800;
    this.element = this.createElement();
};


/*------------------------------------------Create Snowman--------------------------------------------------*/
var snowMan = new SnowMan();
game.appendChild(snowMan.element);
snowMen.push(snowMan);

/*------------------------------------------Keyboard Controls for snowman--------------------------------------------------*/
var pane = $('#game'),
    box = $('.snowMan'),
    w = pane.width() - box.width(),
    d = {},
    x = 14;

function newv(v, a, c) {
    var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[c] ? x : 0);
    return n < 0 ? 0 : n > w ? w : n;
}

$(window).keydown(function (e) {
    d[e.which] = true;
});
$(window).keyup(function (e) {
    d[e.which] = false;
});

setInterval(function () {
    box.css({
        left: function (i, v) {
            return newv(v, 37, 39);
        },
        /*top: function (i, v) {
            return newv(v, 38, 40);
        }*/
    });
}, 20);

/*------------------------------------------Get current position of snowman--------------------------------------------------*/

function getPosition() {
    var myElement = document.getElementsByClassName("snowMan")[0];
    var xPosition = 0;
    var yPosition = 0;

    while (myElement) {
        xPosition += (myElement.offsetLeft);
        yPosition += (myElement.offsetTop);
        myElement = myElement.offsetParent;
    }
    snowman1.x = (xPosition - game.offsetLeft);
    snowman1.y = (yPosition - game.offsetTop);
}