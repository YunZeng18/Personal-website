//credit to https://github.com/emilyxxie/green_rain
var streams = [];
var fadeInterval = 1.6;
var symbolSize = 14;

function setup() {
    createCanvas(
        visualViewport.width, windowHeight
    );
    background(0);

    var x = 0;
    for (var i = 0; i <= width / (symbolSize + 50); i++) {
        var stream = new Stream();
        stream.generateSymbols(x, random(-2000, 0));
        streams.push(stream);
        x += (symbolSize + 50)
    }

    textFont('Consolas');
    textSize(symbolSize);
}

function draw() {
    background(0, 150);
    streams.forEach(function (stream) {
        stream.render();

    });

}
function windowResized() {
    resizeCanvas(visualViewport.width, windowHeight);
    draw();
}

function Symbol(x, y, speed, first, opacity) {
    this.x = x;
    this.y = y;
    this.value;

    this.speed = speed;
    this.first = first;
    this.opacity = opacity;

    this.switchInterval = round(random(20, 120));

    this.setToRandomSymbol = function () {
        var charType = round(random(0, 5));
        if (frameCount % this.switchInterval == 0) {
            if (charType > 1) {
                // set it to Katakana
                this.value = String.fromCharCode(
                    0x30A0 + floor(random(0, 97))
                );
            } else {
                // set it to numeric
                this.value = floor(random(0, 10));
            }
        }
    }

    this.rain = function () {
        this.y = (this.y >= height) ? -300 : this.y += this.speed;
    }
    this.randomSpeedChange = (speed) => {
        this.speed = speed;
    }

}

function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(5, 20));
    this.speed = random(1, 5);

    this.generateSymbols = function (x, y) {
        var opacity = 255;
        var first = round(random(0, 3)) == 1;
        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbol(
                x,
                y,
                this.speed,
                first,
                opacity
            );
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            opacity -= (255 / this.totalSymbols) / fadeInterval;
            y -= symbolSize;
            first = false;
        }
    }

    this.render = function () {
        let speedChange;

        this.symbols.forEach(function (symbol, index) {
            if (symbol.first) {
                fill(200, 255, 200, symbol.opacity);
            } else {
                fill(0, 255, 70, symbol.opacity);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();

            symbol.setToRandomSymbol();

            if (symbol.y >= height && index == 0) {
                speedChange = random(1, 5);
                symbol.first = round(random(0, 3)) == 1;
            }
            if (speedChange) {
                symbol.randomSpeedChange(speedChange);
            }

        });
    }

}