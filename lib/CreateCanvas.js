const { createCanvas } = require("canvas");

function createCanvasT(width, height, type) {
	return createCanvas(width, height, type);
}

exports.createCanvas = createCanvasT;
