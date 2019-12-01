class Venus extends Planet {
        /**
         * constructor
		 * @pre none
		 *		@param time
		 *		@post constructor
		 * 		@return none
		 */

    constructor(timescale) {
        super(0, 0, 0, 45, 0, "Venus", "assets/venus.jpg");
        this.orbitX = 0;
        this.orbitY = 0;
        this.orbitZ = 0;
        this.timescale = timescale;
        this.angle = 0;
         
    }

        /**
         * draws things to the program
		 * @pre none
		 *		@param none
		 *		@post draws things to the program
		 * 		@return none
		 */
    draw(){ 
        
        this.timescale = slider.value();
        
        this.orbitX  += .001 * this.timescale;
	    this.orbitZ  += .001 * this.timescale;
        
        this.x = Math.sin(this.orbitX)*500;
        this.y = 0;
        this.z = Math.cos(this.orbitZ)*500;


            
        /*
        camX = -1*Math.sin(rotateX)*camRad + Math.sin(this.orbitX) *1000;
        camY = 0;
        camZ = 1*Math.cos(rotateZ)*camRad + Math.cos(this.orbitZ)*1000;
       
        
        camX = Math.sin(this.orbitX) *1000 + -1*Math.sin(rotateX)*camRad;
        camY = 0;
        camZ = Math.cos(this.orbitZ)* 1000;
        
        camera(camX , camY, camZ, 0, 0, 0, 0, 1, 0);
        
        */
        push();
            texture(this.texture);
            translate(this.x, this.y, this.z);
            rotate(this.angle);
            sphere(this.radius, 25);
            this.angle += 1;
        pop();
        
        
        this.trail[Math.floor((frameCount%this.trailLength)/(this.trailLength/this.trailPoints))] = [this.x ,this.y ,this.z];
        
        this.drawTrail();
        
        
    }
    
   
}