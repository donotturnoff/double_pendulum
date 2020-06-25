
var cvs, ctx, xa, ya, xb, yb, a, b, da, db, d2a, d2b, ma, mb, la, lb, g, dt, interval, zoom;

function paint() {
	ctx.clearRect(-200, -200, 400, 400);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(xa, ya);
	ctx.lineTo(xb, yb);
	ctx.stroke();
}

function updateAcceleration() {
	var sa = Math.sin(a);
	var sb = Math.sin(b);
	var ca = Math.cos(a);
	var cb = Math.cos(b);
	var s = Math.sin(a-b);
	var c = Math.cos(a-b);
	var num1 = (2*ma+mb-mb*Math.cos(2*a-2*b));
	d2a = (-g*(2*ma+mb)*sa - mb*g*Math.sin(a-2*b) - 2*s*mb*(db*db*lb+da*da*la*c))/(la*num1);
	d2b = (2*s*(da*da*la*(ma+mb) + g*(ma+mb)*ca + db*db*lb*mb*c))/(lb*num1);
}

function change() {
	for (var i = 0; i < 40000; i++) {
		
		updateAcceleration();
		
		da += d2a * dt;
		db += d2b * dt;
		
		a += da * dt;
		b += db * dt;
	}
	
	var sa = Math.sin(a);
	var sb = Math.sin(b);
	var ca = Math.cos(a);
	var cb = Math.cos(b);
	
	xa = la*sa*zoom;
	ya = la*ca*zoom;
	
	xb = (la*sa+lb*sb)*zoom;
	yb = (la*ca+lb*cb)*zoom;
	paint();
}

function setParams() {
	if (interval != undefined) {
		clearInterval(interval);
	}
	a = parseFloat(document.getElementById("a").value);
	b = parseFloat(document.getElementById("b").value);
	da = parseFloat(document.getElementById("da").value);
	db = parseFloat(document.getElementById("db").value);
	g = parseFloat(document.getElementById("g").value);
	ma = parseFloat(document.getElementById("ma").value);
	mb = parseFloat(document.getElementById("mb").value);
	la = parseFloat(document.getElementById("la").value);
	lb = parseFloat(document.getElementById("lb").value);
	interval = setInterval(change, 40);
}

function init() {
	cvs = document.getElementById("canvas");
	ctx = cvs.getContext("2d");
	dt = 0.000001;
	
	zoom = 100;
	
	ctx.translate(200, 200);
}

document.addEventListener("DOMContentLoaded", init, false);
