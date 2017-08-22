export function drawAvatar(ctx, text, textColor, fontSize, width, height) {
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