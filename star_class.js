class Star extends ViewDate{
    constructor(day, fill, stroke, stroke_width, colorText,  pos, container, rayon, angle){
		super(day, "polygon", fill, stroke, stroke_width, colorText,  container, rayon); 
		this.angle = angle;
		this.tigeLength = rayon/4;
		this.setPosition(pos);
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
		var cx = pos[0];
		var cy = pos[1];
		var r = this.rayon;
		var r2 = r * Math.cos(Math.PI/5);
		var rmin = r2 -  r * Math.sin(Math.PI/5) * Math.tan(Math.PI/5);
		var xsup = 0, ysup = 0;
		var xmin = 0, ymin = 0;
		var sommets = [];
		var a = 0;
		for(var s = 0; s < 5; s++){
			a = this.angle + 2*s*Math.PI/5;
			xsup = cx + r*Math.cos(a);
			ysup = cy + r*Math.sin(a);
			xmin = cx + rmin*Math.cos(a + Math.PI/5);
			ymin = cy + rmin*Math.sin(a + Math.PI/5);
			sommets.push([xsup, ysup]);
			sommets.push([xmin, ymin]);
		}
		var points = sommets.join();
		this.ele.setAttribute("points", points);
		var tigeX = pos[0];
		var tigeY = pos[1]; 
		tigeY = tigeY - r;
		tigeY = tigeY - this.tigeLength;
		this.setTigePos([tigeX, tigeY]);
	}
	
	
}