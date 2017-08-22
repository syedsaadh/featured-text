export function drawString(ctx, text, textColor, rotation, font, fontSize, width, height) {
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