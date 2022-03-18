class Cloche extends ViewDate{
	constructor(day, fill, stroke, stroke_width, colorText, pos, container, rayon){
		super(day, "path", fill, stroke, stroke_width, colorText, container, rayon);
		this.tigeLength = rayon/5;
	    this.wmin = 4*rayon/5;	
	    this.h = 1.5*this.wmin; 	
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
            this.txt.childNodes[1].setAttribute("dx", -dl/2); 
		    this.txt.childNodes[1].setAttribute("dy", dl);
        }		
		this.ele.setAttribute("cx", pos[0]);
		this.ele.setAttribute("cy", pos[1]);
		
		var wmax = 7 * this.wmin/4;
       
        // Gauche
        
  
        // Courbe concave gauche:
        var pG1 =  [pos[0] - this.wmin/2, pos[1] - this.h/2];
        var pG2 =  [pos[0] - wmax/2, pos[1] + this.h/2];
        var pGc = [pos[0] - this.wmin/2, pos[1] + this.h/3];
		var dG = "M " + pG1[0].toString() + "," + pG1[1].toString() + " Q " + pGc[0].toString() + "," + pGc[1].toString();
        dG = dG + " "  + pG2[0].toString() + "," + pG2[1].toString();
		
		// Courbe concave droite:
        var pD1 =  [pos[0] + this.wmin/2, pos[1] - this.h/2];
        var pD2 =  [pos[0] + wmax/2, pos[1] + this.h/2];
        var pDc = [pos[0] + this.wmin/2, pos[1] + this.h/3];
        var dD =  " Q " + pDc[0].toString() + "," + pDc[1].toString() + " " + pD1[0].toString() + "," + pD1[1].toString();
		
		//Barre Gauche : 
        var barreG = " V " + (pG2[1] + this.h/5).toString();
		
		// Base : 
		var dLinf = " L " +  pD2[0].toString() + "," + (pD2[1] + this.h/5).toString();
		
		// Barre droite : 
		var barreD = " V " +  pD2[1].toString();
		
		// Vertex : 
        var rw = this.wmin/2; 
        var darc = " A " + rw.toString() + "," +  rw.toString() + " 0  1,0 " + pG1[0].toString() + "," + pG1[1].toString(); 
  
         /* Setting d attribute of path object:
		                                 
										 
										 
								    . . 6 Vertex . . .
								 .                      .
								.		                 .
								*                        *
							    *			             *
			     1 Courbe concave gauche            5 Courbe concave droite
				              *                            *
			             _*                                    *_
			            |                                        |
						|                                        |
                    2 Barre Gauche                          4 Barre Droite   
                        |					                     |
                        |______________  3  Base ________________|               */
						
        var d = dG + barreG + dLinf + barreD + dD + darc;
        this.ele.setAttribute("d", d);
		
		var tigeX = pos[0];
		var tigeY = pos[1]; 
		tigeY = tigeY - this.rayon;
		tigeY = tigeY - this.tigeLength;
		this.setTigePos([tigeX, tigeY]);
		
	}
	
	
}