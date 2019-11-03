class Moon extends Planet {
    constructor() {
        super(0, 0, 0, 43, 0, "Moon", "assets/earth.jpg");
        this.orbitX = 0;
        this.orbitY = 0;
        this.orbitZ = 0;
        
                this.trail = [];
        for(var rep = 0; rep < 15; rep++){
            this.trail[rep] = [0,0,0];
        }
         
    }
    
    draw(){
        
        this.orbitX  += .01;
	    this.orbitZ  += .01;
        
        this.x = Math.sin(this.orbitX)*300;
        this.y = 0;
        this.z = Math.cos(this.orbitZ)*300;

        push();
            texture(this.texture);
  		    translate(this.x, this.y, this.z);
            sphere(43, 30, 30);
        pop();
        
         
        this.trail[Math.floor((frameCount%150)/10)] = [this.x ,this.y ,this.z];
        stroke(255);
        strokeWeight(7);
        noFill();
        
        this.drawTrail();
        
    }
    
     drawTrail(){
        
        stroke(250);
	    strokeWeight(7);
        noFill();
       
        beginShape();

			for(var rep = Math.floor((frameCount%150)/10)+1; rep < 15; rep++){

				curveVertex(this.trail[rep][0], this.trail[rep][1], this.trail[rep][2]);
                
			}

			for(var rep = 0; rep < Math.floor((frameCount%150)/10)+1; rep++){

				curveVertex(this.trail[rep][0], this.trail[rep][1], this.trail[rep][2]);
                
			}
        
        curveVertex(300,300,300);
        curveVertex(0,0,0);
            
		endShape();
       
       
    }
    
   
    
    
}