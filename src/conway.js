(function (window, undefined) {

    function Conway(cnv,ctx) {
        this.canvas = cnv;
        this.context = ctx;
        this.elements = new Object;
        this.isEvolving = false;
        this.tmp_elements = new Object;
        this.DICT_POSITIONS = {
            '9':[-1,-1],
            '8':[-1, 0],
            '7':[-1, 1],
            '6':[ 0,-1],
            '5':[ 0, 0],
            '4':[ 0, 1],
            '3':[ 1,-1],
            '2':[ 1, 0],
            '1':[ 1, 1]};
        this.DICT_VALUES = {
            '-1' : {
                '-1' : false,
                '0' : false,
                '1' : false
            },
            '0' : {
                '-1' : false,
                '0' : true,
                '1' : false
            },
            '1' : {
                '-1' : false,
                '0' : false,
                '1' : false
            }
        };
    }

    var c = Conway.prototype;

    c.addElement = function(y,x,ciclo) {
        if (ciclo === 0) {
            return 1;
        }

        if (!ciclo) {
            var ciclo = 9;
        }

        exis = this.DICT_POSITIONS[ciclo][0];
        yes = this.DICT_POSITIONS[ciclo][1];
        xn = x+exis;
        yn = y+yes;

        if (this.tmp_elements.hasOwnProperty(yn)) {
        } else {
            this.tmp_elements[yn] = [];
        }

        if (this.tmp_elements[yn].hasOwnProperty(xn)) {
            if (this.DICT_VALUES[exis][yes] == true) {
                this.tmp_elements[yn][xn] = this.DICT_VALUES[exis][yes];
            }
        } else {
            this.tmp_elements[yn][xn] = this.DICT_VALUES[exis][yes];
        }
        return this.addElement(y,x,ciclo-1);
    }

    c.draw = function() {
        this.canvas.width = this.canvas.width;

        for (var i = 0; i <= this.canvas.width; i+=10) {
            context.beginPath();
            context.moveTo(i,0);
            context.lineTo(i,500);
            context.strokeStyle = '#BBBBBB';
            context.stroke();
        };

        for (var i = 0; i <= this.canvas.height; i+=10) {
            context.beginPath();
            context.moveTo(0,i);
            context.lineTo(700,i);
            context.stroke();
        };
        for (var key in this.elements) {
            var obj = this.elements[key];
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    var posY = key*10;
                    var posX = prop*10;
                    if (this.elements[key][prop] == true) {
                        context.rect(posX,posY,10,10);
                        context.fillStyle = '#FF0000';
                        context.fill();
                    }
                }
            }
        }
    }

    c.erase = function() {
        this.canvas.width = this.canvas.width;

        for (var i = 0; i <= this.canvas.width; i+=10) {
            context.beginPath();
            context.moveTo(i,0);
            context.lineTo(i,500);
            context.strokeStyle = '#BBBBBB';
            context.stroke();
        };

        for (var i = 0; i <= this.canvas.height; i+=10) {
            context.beginPath();
            context.moveTo(0,i);
            context.lineTo(700,i);
            context.stroke();
        };
    }

    c.evolve = function() {
        this.tmp_elements = new Object;

        for (var exs in this.elements) {
            var obj = this.elements[exs];
            for (var yes in obj) {
                if (obj.hasOwnProperty(yes)) {
                    if (this.isAlive(exs,yes)) {
                        this.addElement(parseInt(exs),parseInt(yes));
                    }
                }
            }
        }
        this.elements = this.tmp_elements;
        this.draw();
    }

    c.start = function() {
        this.isEvolving = true;
        var self = this;
        this.step = setInterval(this.evolve.bind(self), 500);
    }

    c.stop = function() {
        this.isEvolving = false;
        clearTimeout(this.step);
    }

    c.isAlive = function(y,x) {
        var neigh = 0;
        var xn = 0;
        var yn = 0;
        var result = false;

        yn = parseInt(y)-1;
        xn = parseInt(x)-1;
        if (this.elements.hasOwnProperty(yn) &&
            this.elements[yn].hasOwnProperty(xn) &&
            this.elements[yn][xn] == true) {
            neigh++;
        }

        yn = parseInt(y)-1;
        xn = parseInt(x);
        if (this.elements.hasOwnProperty(yn) &&
            this.elements[yn].hasOwnProperty(xn) &&
            this.elements[yn][xn] == true) {
            neigh++;
        }

        yn = parseInt(y)-1;
        xn = parseInt(x)+1;
        if (this.elements.hasOwnProperty(yn) &&
            this.elements[yn].hasOwnProperty(xn) &&
            this.elements[yn][xn] == true) {
            neigh++;
        }

        yn = parseInt(y);
        xn = parseInt(x)-1;
        if (this.elements.hasOwnProperty(yn) && 
            this.elements[yn].hasOwnProperty(xn) &&
            this.elements[yn][xn] == true) {
            neigh++;
        }

        yn = parseInt(y);
        xn = parseInt(x)+1;
        if (this.elements.hasOwnProperty(yn) &&
            this.elements[yn].hasOwnProperty(xn) && 
            this.elements[yn][xn] == true) {
            neigh++;
        }

        yn = parseInt(y)+1;
        xn = parseInt(x)-1;
        if (this.elements.hasOwnProperty(yn) &&
            this.elements[yn].hasOwnProperty(xn) &&
            this.elements[yn][xn] == true) {
            neigh++;
        }

        yn = parseInt(y)+1;
        xn = parseInt(x);
        if (this.elements.hasOwnProperty(yn) &&
            this.elements[yn].hasOwnProperty(xn) &&
            this.elements[yn][xn] == true) {
            neigh++;
        }

        yn = parseInt(y)+1;
        xn = parseInt(x)+1;
        if (this.elements.hasOwnProperty(yn) &&
            this.elements[yn].hasOwnProperty(xn) &&
            this.elements[yn][xn] == true) {
            neigh++;
        }

        if (neigh == 2 && this.elements[y][x] == true) {
            result = true;
        } else if (neigh == 3 && this.elements[y][x] == true) {
            result = true;
        } else if (neigh == 3 && this.elements[y][x] == false) {
            result = true;
        } else {
            result = false;
        }

        return result;
    }

    window.Conway = Conway;
})(window);