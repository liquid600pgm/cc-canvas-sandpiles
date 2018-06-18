var canvas = document.getElementById('sandpiles');
var c = canvas.getContext('2d');

draw();

var RES = 8;
var ITER = 1000;
var palette = [
	'#320A28',
	'#511730',
	'#8E443D',
	'#CB9173',
	'#E0D68A'
]

// clear background
c.fillStyle = '#000';
c.fillRect(0, 0, canvas.width, canvas.height);

var sand = [];
var next = [];

for (let x = 0; x < canvas.width/RES; x++) {
	sand[x] = [];
	next[x] = [];
	for (let y = 0; y < canvas.height/RES; y++) {
		sand[x][y] = 0;
		next[x][y] = 0;
	}
}

// let startX = Math.round(Math.random() * (canvas.width/RES));
// let startY = Math.round(Math.random() * (canvas.height/RES));
let startX = Math.round(canvas.width/RES/2);
let startY = Math.round(canvas.height/RES/2);

sand[startX][startY] = 4**10;

function draw() {
	requestAnimationFrame(draw);

	for (let y = 0; y < canvas.height/RES; y++) {
		for (let x = 0; x < canvas.width/RES; x++) {
			switch (sand[x][y]) {
				case 0: c.fillStyle = palette[0]; break;
				case 1: c.fillStyle = palette[1]; break;
				case 2: c.fillStyle = palette[2]; break;
				case 3: c.fillStyle = palette[3]; break;
				default:
				case 4: c.fillStyle = palette[4]; break;
			}
			c.fillRect(x*RES, y*RES, RES, RES);
		}
	}

	for (let n = 0; n < ITER; n++) {
		algorithm();
	}
}

function algorithm() {
	for (let y = 1; y < sand[0].length-1; y++) {
		for (let x = 1; x < sand.length-1; x++) {
			if (sand[x][y] > 3) {
				sand[x][y] -= 4;
				next[x+1][y]++;
				next[x-1][y]++;
				next[x][y+1]++;
				next[x][y-1]++;
			}
		}
	}
	let buf = sand;
	sand = next;
	next = buf;
}
