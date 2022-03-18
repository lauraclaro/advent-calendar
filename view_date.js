class ViewDate{
	constructor(day, eletype, fill, stroke, stroke_width, colorText, container, rayon){
	    this.day = day;
		this.container = container;
		this.rayon = rayon;
		
		// Ajout de la forme de la déco :
		this.ele = document.createElementNS("http://www.w3.org/2000/svg", eletype);
		this.ele.setAttribute("fill", fill);
		this.ele.setAttribute("stroke", stroke);
		this.ele.setAttribute("stroke-width", stroke_width);
		container.appendChild(this.ele);
		
		// Ajout des chiffres (date) :
		this.txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
		var strtxt = day.toString();
		var lettre = 0;
		for(var l = 0; l< strtxt.length; l++){
			lettre  = document.createElementNS("http://www.w3.org/2000/svg", "tspan"); 
			lettre.innerHTML = strtxt[l];
			this.txt.appendChild(lettre);
		}
		this.txt.setAttribute("fill", colorText);
		this.setFontSize(100);
		container.appendChild(this.ele);
		container.appendChild(this.txt);
		
		// Ajout de la tige de deco:
		this.tige = document.createElementNS("http://www.w3.org/2000/svg", "path");
		this.tige.setAttribute("stroke", "black");
		this.container.appendChild(this.tige);
		this.posTige = [100, 100];
		this.tigeLength = 20;
		
		var dayNow = new Date();
		if(day == dayNow.getDate()){
            var stateI = {fill : this.ele.getAttribute("fill"), 
			                stroke : this.ele.getAttribute("stroke"), 
						    txt_width: this.txt.getAttribute("stroke-width"), 
						    colorText : this.txt.getAttribute("fill"),
						    size_txt : this.font_size};
			var stateF = {fill : "white", 
			                stroke : "black", 
						    stroke_width: "5", 
						    colorText : "black",
						    size_txt : 200 };
			var states = [stateI, stateF];
			var i = 0;
			var obj = this;
			setInterval(function(){
				if(i> 1){
				  i = 0;	
				}
				obj.ele.setAttribute("fill", states[i].fill);
				obj.ele.setAttribute("stroke", states[i].stroke);
				obj.txt.setAttribute("stroke-width", states[i].txt_width);
				obj.txt.setAttribute("fill", states[i].colorText);
				obj.setFontSize(states[i].size_txt);
				i++;
			    }, 500);
	    }
	}
	
	setPosition(pos){
		this.pos = pos;
		var dl = this.font_size/25;
		this.txt.setAttribute("x", pos[0]);
		this.txt.setAttribute("y", pos[1]);
		this.txt.childNodes[0].setAttribute("x" , pos[0]);
		this.txt.childNodes[0].setAttribute("y" , pos[1]);
		this.txt.childNodes[0].setAttribute("dx" , -(this.day.toString().length * dl)); 
		this.txt.childNodes[0].setAttribute("dy" , dl); 
		if(this.day.toString().length == 2){
			this.txt.childNodes[1].setAttribute("y" , pos[1]);
            this.txt.childNodes[1].setAttribute("dx" , -dl/2); 
		    this.txt.childNodes[1].setAttribute("dy" , dl);
        }			
		
		
		
	}
	setTigePos(pos){
		this.posTige = pos;
		var d = "M " + pos[0].toString() + "," + pos[1].toString();
		d += " V ";
        d = d + (pos[1] + this.tigeLength).toString();	
        this.tige.setAttribute("d", d);		
	}
	setTigeLength(len){
		var dy = len - this.tigeLength;
		this.tigeLength = len;
		this.posTige[1] -= dy;
		var d = "M " + this.posTige[0].toString() + "," + this.posTige[1].toString();
		d += " V ";
        d = d + (this.posTige[1] + this.tigeLength).toString();	
        this.tige.setAttribute("d", d);	
        		
	}
    setFontSize(font_size){
		this.font_size = font_size;
		var dl = font_size/25;
		this.txt.style.fontSize = font_size.toString() + "%";	
		this.txt.childNodes[0].setAttribute("dx" , -(this.day.toString().length * dl)); 
		this.txt.childNodes[0].setAttribute("dy" , dl); 
		if(this.day.toString().length == 2){
            this.txt.childNodes[1].setAttribute("dx" , -dl/2); 
		    this.txt.childNodes[1].setAttribute("dy" , dl);
        }	
	}
	tourner(centre, pos, id, sens, dur){
		var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.id = "path" + id.toString();
		this.container.appendChild(path);
		var dy = this.rayon + this.tigeLength + parseFloat(this.ele.getAttribute("stroke-width"));
		var cx = centre[0];
		var cy = centre[1];
		var x1 = pos[0];
		var y1 = pos[1];
		var Dx = x1 - cx;
		var Dy = y1 - cy;
		var Dx2 = Math.pow(Dx, 2);
		var Dy2 = Math.pow(Dy, 2);
		var lg = Math.sqrt(Dx2 + Dy2);
		var cos = Dx/lg;
		var sin = Dy/lg;
		var angle = Math.acos(cos);
		if(sin < 0){
		   angle = angle * -1;	
		}
		var dAngle = 0.001;
		if(sens == 1){
		   dAngle = dAngle * -1;	
		}
		var angle2 = angle + dAngle;
		var x2 = cx + lg * Math.cos(angle2);
		var y2 = cy + lg * Math.sin(angle2);
		
		var d = "M " + x1.toString() + "," + y1.toString() + " A " + lg.toString() + "," + lg.toString();
		d = d + " 0 " + "1," + sens.toString() + " " + x2.toString() + "," + y2.toString();
		path.setAttribute("d", d);
		path.setAttribute("fill", "none");
		//path.setAttribute("stroke", "black");
		// g
		var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
		this.container.appendChild(g);	
		g.appendChild(this.ele);
		g.appendChild(this.tige);
		g.appendChild(this.txt);
		//animateMotion
		var anim = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
		anim.setAttribute("begin", "indefinite");
		anim.setAttribute("dur", dur);
		g.appendChild(anim);
		
		//mpath
		var mpath = document.createElementNS("http://www.w3.org/2000/svg", "mpath");
		mpath.setAttribute("href", "#" + path.id);
		anim.appendChild(mpath);
		
		this.setPosition([0, dy]);
		anim.beginElement();
		var obj = this;
		setTimeout(function(){
			obj.container.removeChild(g);
			obj.tourner(centre, pos, id, sens, dur);
		}, 1000 * dur);
	}

   

}