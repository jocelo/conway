var conway = (function() {
    var rules={},
    ctx,
    cvs,
    genAlive,
    init = function(canvas, context) {
        ctx = context;
        cvs = canvas;
        resizeCanvas();
        drawSpace();
        window.addEventListener('resize', resizeCanvas, false);
    },
    resizeCanvas = function() {
        // resize to 90%
        cvs.width = window.innerWidth-(window.innerWidth*.05);
        cvs.height = window.innerHeight-(window.innerHeight*.05);
    },
    drawSpace = function() {
        ctx.beginPath();
        ctx.fill();
        
        // vertical lines
        for (var i=0 ; i<cvs.width ; i+=10) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, cvs.height);
        }
        
        // horizontal lines
        for (var i=0 ; i<cvs.height ; i+=10) {
            console.log(i);
            ctx.moveTo(0, i);
            ctx.lineTo(cvs.width, i);
        }
        ctx.stroke();
        
    },
    run = function() {
        
    },
    testo = function() {
        return test;
    };
    
    return {
        start: init,
        run:run,
        testo:testo
    };
})();