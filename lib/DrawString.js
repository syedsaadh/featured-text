function drawString(
	ctx,
	text,
	textColor,
	rotation,
	font,
	fontSize,
	width,
	height
) {
	var lines = text.split("<br>");

	var text = ctx.measureText(text);

	if (!rotation) rotation = 0;
	if (!font) font = "'serif'";
	if (!fontSize) fontSize = 16;
	if (!textColor) textColor = "#000000";
	const textSize = Number(fontSize) || 16;
	const totalTextSize = textSize * lines.length;
	const startPoint = height / 2 - totalTextSize / 2;

	console.log("TextSize -> ", textSize);
	console.log("TotalTextSize -> ", totalTextSize);

	ctx.save();
	ctx.moveTo(width / 2, height / 2);
	ctx.font = fontSize + "px " + font;
	ctx.fillStyle = textColor;
	//ctx.translate(posX, posY);
	ctx.rotate((rotation * Math.PI) / 180);
	ctx.textAlign = "center";
	// ctx.textBaseline = 'middle'
	for (i = 0; i < lines.length; i++) {
		console.log(
			"Printing " +
				lines[i] +
				" at <> " +
				width / 2 +
				"," +
				(startPoint + textSize * i)
		);
		ctx.fillText(lines[i], width / 2, startPoint + textSize / 2 + i * textSize);
	}
	ctx.restore();
}

exports.drawString = drawString;
