/*
	The Coding Train
	Coding Challenge #107: Sandpiles
	
	YouTube: https://youtu.be/diGjw5tghYU
	GitHub: https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_107_sandpiles
	
	Original by Daniel Shiffman @shiffman
	Remade in pure HTML and JS by iLiquid
*/

// Here we get the canvas element from HTML.
var canvas = document.getElementById('sandpiles');
var c = canvas.getContext('2d');

draw();

/* 
	SETTINGS:
	You can modify them however you really want!
*/
var WIDTH = 2000;
var HEIGHT = 2000;
var RES = 8;
var ITER = 1000;
var palette = [
	'#320A28',
	'#511730',
	'#8E443D',
	'#CB9173',
	'#E0D68A'
]
/* End of settings */

// Set the canvas's size
canvas.width = WIDTH;
canvas.height = HEIGHT;

// Clear the background
c.fillStyle = '#000';
c.fillRect(0, 0, canvas.width, canvas.height);

// Create and initialize the buffers
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

// Get the buffer's center
let startX = Math.round(canvas.width/RES/2);
let startY = Math.round(canvas.height/RES/2);

// Spill some sand onto the center
sand[startX][startY] = 4**10;

function draw() {
	requestAnimationFrame(draw);
	
	// Draw all the 'pixels'
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
	
	// Do the algorithm
	for (let n = 0; n < ITER; n++) {
		algorithm();
	}
}

/*
	The original algorithm is better described on the original issue by @simon-tiger.
	https://github.com/CodingTrain/Rainbow-Topics/issues/815
	
	Basically, we start with a blank grid.
	0  0  0  0  0
	0  0  0  0  0
	0  0  0  0  0
	0  0  0  0  0
	0  0  0  0  0
	
	Then we spill some sand.
	0  0  0  0  0
	0  0  0  0  0
	0  0  80 0  0
	0  0  0  0  0
	0  0  0  0  0
	
	If a cell has more than 3 sand 'particles' in it, subtract 4 from it and add 1 to its neighbours.
	0  0  0  0  0
	0  0  1  0  0
	0  1  66 1  0
	0  0  1  0  0
	0  0  0  0  0
	
	That's it. The whole algorithm.
*/
function algorithm() {
	// I don't like edge cases, I just avoid them because I am lazy.
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
	
	/*
		Having 2 buffers in algorithms like this is mandatory, because
		if we just had one, cells would override each other as the loop
		continues, and that's not what we want, am I right?
	*/
	let buf = sand;
	sand = next;
	next = buf;
}
