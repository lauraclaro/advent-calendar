class Ball extends ViewDate{
	constructor(day, fill, stroke, stroke_width, colorText,  pos, container, rayon){
		super(day, "circle", fill, stroke, stroke_width, colorText,  container, rayon); 
		this.ele.setAttribute("r", rayon);
		this.tigeLength = rayon/5;
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
		this.ele.setAttribute("cx", pos[0]);
		this.ele.setAttribute("cy", pos[1]);
		var tigeX = pos[0];
		var tigeY = pos[1]; 
		tigeY = tigeY - this.rayon;
		tigeY = tigeY - this.tigeLength;
		this.setTigePos([tigeX, tigeY]);
	}
	
	
	
	
	
	
}