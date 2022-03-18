class Flake{
	constructor(centre, rayon, angle, container){
		this.centre = centre;
		this.container = container;
        this.triangles = [];
		// Triangles
		var sommets = 0, middles = 0;
		for(var t = 1; t <= 4; t++){
		    var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		    polygon.id = "triangle" + t.toString();
			polygon.setAttribute("stroke", "#DDD7CE");
			polygon.setAttribute("stroke-width", "2");
			polygon.setAttribute("fill", "none");
			this.container.appendChild(polygon);
		    this.triangles[t-1] = {poly : polygon, 
			                       sommets: new Array(3), 
								   middles: new Array(3)};
			// Pivots
			sommets = this.triangles[t-1].sommets;
			middles = this.triangles[t-1].middles;
			for(var s = 1; s <= 3; s++){
				sommets[s - 1] = {};
				middles[s - 1] = {};
			    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute("stroke", "#DDD7CE");
			    path.setAttribute("stroke-width", "2");
			    path.setAttribute("fill", "none");
				this.container.appendChild(path);
				sommets[s-1].pivot = path;
			}
			this.container.appendChild(polygon);
		}
        
		this.setPositions(centre, rayon, angle);
	    //console.log(container);
		
		this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		this.circle.setAttribute("cx", centre[0]);
		this.circle.setAttribute("cy", centre[1]);
		this.circle.setAttribute("r", rayon/10);
		this.circle.setAttribute("stroke", "#DDD7CE");
		this.circle.setAttribute("stroke-width", "5");
		this.circle.setAttribute("fill", "none");
		container.appendChild(this.circle);
		
		this.dates = [];
		for(var i= 1; i<= 24; i++){
			this.dates.push(i);
		}
		this.shuffleDates();
		this.addTiges();
		//console.log(this.dates);
	}
	shuffleDates(){
		var tab = [];
        for(var i=1; i<=24; i++){
			tab.push(i);
        }	
		
		var randomIndex = 0;
		var idate = 0;
		while(tab.length != 0){
			randomIndex = Math.floor(Math.random() * tab.length);
			this.dates[idate] = tab[randomIndex];
            tab.splice(randomIndex, 1);			
			idate++;
	    }
	}
	setPositions(centre, rayon, angle){
		this.centre = centre;
		this.rayon = rayon;
		this.angle = angle;
		var cx = centre[0], cy = centre[1]; 
	    var x = 0, y = 0, x1 = 0, y1 = 0, x2 = 0, y2 = 0, xmid = 0, ymid = 0;
		var angleNode = 0;
	    var points = 0;
		var sommetsTriangle = 0;
	    var dp = 0;
		var sommets = 0, middles = 0;
		//Triangles
		for(var t = 1; t <= 4;t++){ 
            angleNode = this.angle + Math.PI*(t - 1)/6;
			//console.log(angleNode*180/Math.PI);
			sommetsTriangle = [];
			sommets = this.triangles[t-1].sommets;
			middles = this.triangles[t-1].middles;
			//Sommets et milieux
			for(var s = 1; s <= 3; s++){ 
			   x = cx + rayon*Math.cos(angleNode);
			   y = cy + rayon*Math.sin(angleNode);
			   x2 = cx + rayon*Math.cos(angleNode + 2*Math.PI/3);
			   y2 = cy + rayon*Math.sin(angleNode + 2*Math.PI/3);
			   xmid = (x + x2)/2;
			   ymid = (y + y2)/2;
			   sommets[s-1].point = [x, y];
			   middles[s-1].point = [xmid, ymid];
			   sommetsTriangle.push([x, y]);
			   x1 = cx + rayon*Math.cos(angleNode)/10;
			   y1 = cy + rayon*Math.sin(angleNode)/10;
			   dp = "M ";
			   dp = dp + x.toString() + "," + y.toString();
			   dp += " L ";
			   dp = dp + x1.toString() + "," + y1.toString();
			   sommets[s-1].pivot.setAttribute("d", dp);
			   angleNode += 2*Math.PI/3;
			}
			points = sommetsTriangle.join();
			this.triangles[t-1].poly.setAttribute("points", points);
	    }
	}

    addTiges(){
		var boucleSommet = 0;
		var boucleMiddle = 0;
		var sommetX =0, sommetY = 0, middleX = 0, middleY = 0;
	
		var sommets = 0, middles = 0;
		for(var t = 1; t <= 4; t++){
			sommets = this.triangles[t-1].sommets;
		    middles = this.triangles[t-1].middles;
			for(var s = 1; s <= 3; s++){
				boucleSommet = document.createElementNS("http://www.w3.org/2000/svg", "circle");
				boucleMiddle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
				sommetX = sommets[s-1].point[0]; 
				sommetY = sommets[s-1].point[1];
				middleX = middles[s-1].point[0];
				middleY = middles[s-1].point[1];
				boucleSommet.setAttribute("cx", sommetX);
				boucleSommet.setAttribute("cy", sommetY);
				boucleMiddle.setAttribute("cx", middleX);
				boucleMiddle.setAttribute("cy", middleY);
				boucleSommet.setAttribute("r", 5);
				boucleSommet.setAttribute("stroke", "black");
				boucleSommet.setAttribute("stroke-width", "2");
				boucleSommet.setAttribute("fill", "none");
				boucleMiddle.setAttribute("r", 5);
				boucleMiddle.setAttribute("stroke", "black");
				boucleMiddle.setAttribute("stroke-width", "2");
				boucleMiddle.setAttribute("fill", "none");
				sommets[s-1].tige = boucleSommet;
				middles[s-1].tige = boucleMiddle;
				this.container.appendChild(boucleSommet);
				this.container.appendChild(boucleMiddle);
			}
		}
	}
	
	addDeco(t, type, fill, stroke, stroke_width, colorText, rayon, angle, tigeLength){
		var decoSum = 0, decoMid = 0;
		var triangle = this.triangles[t - 1];
		var posS = new Array(2), posM = new Array(2);
		var i = 6 *(t-1);
		var dayS = 0;
		var dayM = 0;
		var is = 0, im = 0;
		for(var s = 1; s <= 3; s++){
			posS[0] = triangle.sommets[s-1].point[0];
			posS[1] = triangle.sommets[s-1].point[1] + rayon + tigeLength;
			posM[0] = triangle.middles[s-1].point[0];
			posM[1] = triangle.middles[s-1].point[1] + rayon + tigeLength;
			is = i + 2*(s - 1);
			im = is + 1;
			dayS = this.dates[is];
			dayM = this.dates[im];
			switch(type){
				case "star":
				    decoSum = new Star(dayS, fill, stroke, stroke_width, colorText, posS, this.container, rayon, angle);
			        decoMid = new Star(dayM, fill, stroke, stroke_width, colorText, posM, this.container, rayon, angle);
				    break;
				case "cube":
				    decoSum = new Cube(dayS, fill, stroke, stroke_width, colorText, posS, this.container, rayon);
					decoMid = new Cube(dayM, fill, stroke, stroke_width, colorText, posM, this.container, rayon);
					break;
				case "ball":
                	decoSum = new Ball(dayS, fill, stroke, stroke_width, colorText,  posS, this.container, rayon);	
					decoMid = new Ball(dayM, fill, stroke, stroke_width, colorText,  posM, this.container, rayon);
					break;
				case "bell":     //     Bell (day, fill, stroke, stroke_width, colorText, pos, container, rayon)
				    decoSum = new Cloche(dayS, fill, stroke, stroke_width, colorText, posS, this.container, rayon);
					decoMid = new Cloche(dayM, fill, stroke, stroke_width, colorText, posM, this.container, rayon);
					break;
				default:
				    console.log("type inconnu");
			}
			
			decoSum.setTigeLength(tigeLength);
			decoMid.setTigeLength(tigeLength);
			triangle.sommets[s-1].ele_view = decoSum;
			triangle.middles[s-1].ele_view = decoMid;
		}
	}
	
	
	
	tournerCharpenteTriangle(t, dur, sens){
		var id = 0;
		var triangle = this.triangles[t-1];
		var sommets = triangle.sommets;
		var middles = triangle.middles;
		var a1 = 0, a2 = 360;
		if(sens == 0){
		    a1 = 360;
            a2 = 0;		  
		}
		var groupRotate = document.createElementNS("http://www.w3.org/2000/svg", "g");
		this.container.appendChild(groupRotate);
		var animateRotate = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
		animateRotate.setAttribute("type", "rotate"); 
		animateRotate.setAttribute("attributeName", "transform");
		animateRotate.setAttribute("begin" , "indefinite");
		var from = a1.toString() + " " + this.centre[0].toString() + " " + this.centre[1].toString(); 
	    var to = a2.toString() + " " + this.centre[0].toString() + " " + this.centre[1].toString(); 
		animateRotate.setAttribute("from", from);
	    animateRotate.setAttribute("to", to);
		animateRotate.setAttribute("dur", dur.toString() + "s");
		groupRotate.appendChild(animateRotate);
		
		//Ajout des éléments tournant : triangle et pivots
		groupRotate.appendChild(triangle.poly);
		
		for(var s = 1; s <= 3; s++){
			groupRotate.appendChild(sommets[s-1].pivot);
			groupRotate.appendChild(sommets[s-1].tige);
			groupRotate.appendChild(middles[s-1].tige);
		}
		animateRotate.beginElement();
		var obj = this;
		setTimeout(function(){
			obj.container.removeChild(groupRotate);
		    obj.tournerCharpenteTriangle(t, dur, sens);
		}, 1000 * dur);
	}
	tournerDecoTriangle(t, dur, sens){
		var triangle = this.triangles[t-1];
		var sommets = triangle.sommets;
		var middles = triangle.middles;
		
		
		// Décos tournant
		var ids = 0, idm = 0;
		for(var s = 1; s <= 3; s++){
			ids = t.toString() + s.toString() + "sommet";
			idm = t.toString() + s.toString() + "middle";
		    sommets[s-1].ele_view.tourner(this.centre, sommets[s-1].point, ids, sens, dur);
			middles[s-1].ele_view.tourner(this.centre, middles[s-1].point, idm, sens, dur);
		}
    }
	
	tournerCharpente(dur, sens){
		for(var t = 1; t <= 4; t++){
			this.tournerCharpenteTriangle(t, dur, sens);
		}
	}
	
	tournerDeco(dur, sens){
		for(var t = 1; t <= 4; t++){
			this.tournerDecoTriangle(t, dur, sens);
		}
	}
	tourner(dur, sens){
		this.tournerCharpente(dur, sens);
		this.tournerDeco(dur, sens);
	}
    
}