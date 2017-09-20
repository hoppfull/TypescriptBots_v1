var Graphics;
(function (Graphics) {
    function drawSpot(ctx, pos, appearance) {
        ctx.fillStyle = appearance.color;
        ctx.strokeStyle = 'darkslategray';
        ctx.lineWidth = appearance.radius / 4;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, appearance.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
    Graphics.drawSpot = drawSpot;
    function drawEntityValue(ctx, pos, radius, color, value) {
        ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
        ctx.lineCap = 'butt';
        ctx.stroke();
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, -Math.PI / 2, Math.PI * (value * 2 - 1 / 2));
        ctx.stroke();
    }
    Graphics.drawEntityValue = drawEntityValue;
    function drawEntityText(ctx, pos, text) {
        ctx.fillStyle = 'black';
        ctx.font = "18px Consolas";
        ctx.textAlign = 'center';
        ctx.fillText(text, pos.x, pos.y + 5);
    }
    Graphics.drawEntityText = drawEntityText;
    function renderLoop(ctx, f) {
        function rec() {
            ctx.restore();
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.save();
            f();
            window.requestAnimationFrame(rec);
        }
        rec();
    }
    Graphics.renderLoop = renderLoop;
    function camPos(ctx, pos, zoom) {
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.scale(zoom, zoom);
        ctx.translate(-pos.x, -pos.y);
    }
    Graphics.camPos = camPos;
})(Graphics || (Graphics = {}));
