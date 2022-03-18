var svg = document.getElementById("svg");
svg.setAttribute("width", 750);
svg.setAttribute("height", 650);
var svg_width = parseFloat(svg.getAttribute("width"));
var svg_height = parseFloat(svg.getAttribute("height"));
var flake = new Flake([svg_width/2, svg_height/2- 50], 250, 0, svg);
flake.addDeco(1, "cube", "#3D79D2", "white", "1", "white", 17, 0, 50);
flake.addDeco(2, "star", "#BDC5B2", "none", "1", "black", 40, -Math.PI/2, 20);
flake.addDeco(3, "ball", "#244372", "white", "1", "white", 20, 0, 20);
flake.addDeco(4, "bell", "#F0E68C", "white", "1", "black", 25, -Math.PI/2, 20);


flake.tourner(20, 0);


//console.log(svg);

