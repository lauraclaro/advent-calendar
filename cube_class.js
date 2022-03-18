class Cube extends ViewDate{
	 constructor(day, fill, stroke, stroke_width, colorText, pos, container, rayon){
		super(day, "rect", fill, stroke, stroke_width, colorText,  container, rayon); 
        this.tigeLength = rayon/4;
		this.ele.setAttribute("width", 2*rayon);
		this.ele.setAttribute("height", 2*rayon);
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
		var x = this.pos[0] - this.rayon;
		var y = this.pos[1] - this.rayon;
		this.ele.setAttribute("x", x);
		this.ele.setAttribute("y", y);
		var tigeX = pos[0];
		var tigeY = pos[1] - this.rayon - this.tigeLength;
		this.setTigePos([tigeX, tigeY]);
	}
	
}