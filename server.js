const express = require('express');
const app = express();
var Canvas = require('canvas');
var initials = require('initials');

createCanvas = function (width, height, type) {
    return new Canvas(width, height, type)
};

function drawString(ctx, text, textColor, rotation, font, fontSize, width, height) {
    var lines = text.split("<br>");
    if (!rotation) rotation = 0;
    if (!font) font = "'serif'";
    if (!fontSize) fontSize = 16;
    if (!textColor) textColor = '#000000';
    ctx.save();
    ctx.moveTo(width / 2, height / 2);
    ctx.font = fontSize + "px " + font;
    ctx.fillStyle = textColor;
    //ctx.translate(posX, posY);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.textAlign = "center";
    // ctx.textBaseline = 'middle'
    for (i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], width / 2, height / 2 + i * fontSize);
    }
    ctx.restore();
}

function drawAvatar(ctx, text, textColor, fontSize, width, height) {
    var font = "'serif'";
    if (!fontSize) fontSize = 16;
    if (!textColor) textColor = '#000000';

    ctx.save();
    var twidth = ctx.measureText(text).width;
    ctx.font = fontSize + "px " + font;
    ctx.fillStyle = textColor;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(text, width/2, height / 2);
    
    ctx.restore();
}

/**
 * Generate a banner
 * req.params
 * - :width: width of the banner (in pixels)
 * - :height: heigh of the banner (in pixels)
 * - :bg: Background color of the banner (Hexadecimal)
 *
 * req.query (Query parameters)
 * - txt: Text for the banner
 * - textColor: Font color of the banner text (Hexadecimal)
 * - font: Font style of the banner text
 * - fontSize: Font size of the banner text (in pixels)
 *
 * Example: /800/400/ff5b5b/?fontSize=64&txt=How<br>Cool is that
 */
app.get('/:width/:height/:bg', function (req, res) {
    console.log(req.query);
    console.log(req.params);
    var height = Number(req.params.height);
    var width = Number(req.params.width);
    var canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d')
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = '#' + req.params.bg;
    ctx.fill();
    drawString(ctx, req.query.txt || 'Awesome! \n Library', '#' + (req.query.textColor || 'fff'), 0, req.query.font, req.query.fontSize, width, height);
    res.writeHead(200, { 'Content-Type': 'image/png' })
    canvas.pngStream().pipe(res)
});

/**
 * Generate an avatar image
 * req.params
 * - :size: Size of the image (in pixels)
 * - :bg: Background color of the avatar (hexadecimal)
 * - :name: Text from which the avatar is generated
 * - :color: Font color (hexadecimal) [Default:- #fff]
 *
 * Example: /avatar/500/ffa22b/Saad%20Hassan/ffffff
 */
app.get('/avatar/:size/:bg/:name/:color?', function (req, res) {
    try {
        console.log(req.query);
        console.log(req.params);
        var size = Number(req.params.size);
        var canvas = createCanvas(size, size);
        var ctx = canvas.getContext("2d");
    
        ctx.beginPath();
        ctx.fillStyle = '#' + req.params.bg;
        ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
        ctx.fill();

        drawAvatar(ctx, initials(req.params.name), '#' + (req.params.color || 'fff') , size - size / 2, size, size);
        
        // ctx.beginPath();
        // ctx.lineTo(0, size/2);
        // ctx.lineTo(size, size/2);
        // ctx.stroke();

        // ctx.beginPath();
        // ctx.lineTo(size/2, 0);
        // ctx.lineTo(size/2, size);
        // ctx.stroke();

        res.writeHead(200, { 'Content-Type': 'image/png' });
        canvas.pngStream().pipe(res);

    }
    catch (e) {
        console.error(e);
    }
});

app.listen(4000, function () {
    console.log('Bantar listening on port 4000!')
});
