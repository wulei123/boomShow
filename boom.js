/**
 * Created by Administrator on 2016/7/15.
 */
var WINDOW_HEIGHT = document.body.clientHeight;
var WINDOW_WIDTH = document.body.clientWidth;


window.onload = function () {
    var cvs = document.getElementById("cvs");
    cvs.height = WINDOW_HEIGHT;
    cvs.width = WINDOW_WIDTH;
    console.log(WINDOW_HEIGHT);
    var cxt = cvs.getContext("2d");
    cvs.onmousedown = function (e) {
        cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        // cxt.beginPath();
        // cxt.moveTo(e.pageX, e.pageY);
        // cxt.strokeStyle = "red";
        var sx = e.pageX;
        var sy = e.pageY;
        cvs.onmousemove = function (e) {
            cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
            draw(sx, sy, e.pageX, e.pageY, cxt);
            drawCircle(e.pageX, e.pageY, 4, cxt);
            // cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
            // cxt.lineTo(e.pageX, e.pageY);
            // cxt.stroke();
        }
        cvs.onmouseup = function (e) {
            var vx = getV(e.pageX-sx);
            //var vx = 0;
            var vy = getV(e.pageY-sy);
            //var vy = 0;
            var x = sx;
            var y = sy;
            setInterval(
                function () {
                    x = updateX(x,vx);
                    vy = updateVy(vy,0.3);
                    y = updateY(y,vy);
                    console.log(vx,vy);
                    // if(x>100)
                    //     return;
                    // if(y>200)
                    //     return;
                    if(vy>100)
                        vy=100;
                    drawCircle(x,y,10,cxt);
                    drawCircleEveryPath(x,y,10,cxt);

                }, 10
            )


            //cvs.onmousedown = null;
            cvs.onmousemove = null;
            cvs.onmouseup = null;
        }


        function draw(sx, sy, ex, ey, cxt) {
            cxt.beginPath();
            cxt.moveTo(sx, sy);
            cxt.lineTo(ex, ey);
            cxt.stroke();
            cxt.strokeStyle = "red";
            cxt.lineWidth = 5;
            //cxt.closePath();
        }


    }


    function drawCircle(cx, cy, r, cxt) {
        cxt.beginPath();
        cxt.arc(cx, cy, r, 0, 2 * Math.PI, true);
        cxt.stroke();
        cxt.fillStyle = "red";
        cxt.fill();

    }
    function drawCircleEveryPath(cx, cy, r, cxt) {
        cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
        drawCircle(cx,cy,r+4,cxt);
        cxt.beginPath();
        cxt.arc(cx, cy, r, 0, 2 * Math.PI, true);
        cxt.stroke();
        cxt.fillStyle = "orange";
        cxt.fill();
    }
    function getV(x) {
        return x / 20;
    }




    function updateX(x,vx) {
        return x+vx;
    }
    function updateY(y,vy) {
        return y+vy;
    }
    function updateVy(vy,a) {
        return vy+a;
    }

}