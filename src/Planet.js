

class Planet {
        /**
         * constructor
		 * @pre none
		 *		@param x, y, z, radius, mass, name,and texture
		 *		@post constructor
		 * 		@return none
		 */
    constructor(x, y, z, radius, mass, name, texture, distance, timescale, moon, parent){
		
        this.x = x; // the xyz position, will add velocity later (vectors hehe)
        this.y = y;
		this.z = z;
		
		this.orbitX = 0;
		this.orbitZ = 0;
        this.radius = radius;
		this.mass = mass;
        this.name = name;
		
		this.moon = moon;
		
		if(this.moon){ 
			this.parent = parent;
		}
		
		this.distance = distance;
		this.timescale = timescale;
		
		this.angle = 0;
		
		this.weightedTimescale = slider.value()*this.timescale;

        this.texture = loadImage(texture);
        
        this.trailPoints = 30; // how many points in the trail
        
        this.trailLength = 150; //the length (in frames) of the trail
        this.trail = [];
        for(var rep = 0; rep < this.trailPoints; rep++){
            this.trail[rep] = [0,0,0];
        }
		
		this.state1 = {
			distance : 2000,
			center   : [this.x ,this.y ,this. z],
			rotation : [1,1,0,0],
		  }; 
        

    } 
	
	
        /**
         * draw planet in the scene 
		 * where it is supposed to go, velocity, etc
		 * @pre none
		 *		@param none
		 *		@post draws things on the program
		 * 		@return none
		 */
    
    draw() {
		
		this.weightedTimescale = slider.value()*this.timescale;

        
        
        this.orbitX  += .001 * this.weightedTimescale;
	    this.orbitZ  += .001 * this.weightedTimescale;
		
		if(this.moon){
			this.x = -1*Math.sin(12*this.orbitX)*this.distance + this.parent.x;
        	this.y = 0;
        	this.z = Math.cos(12*this.orbitZ)*this.distance + this.parent.x;
			
		}
		
		else{
			this.x = Math.sin(this.orbitX)*this.distance;
        	this.y = 0;
        	this.z = Math.cos(this.orbitZ)*this.distance;
		}
        
        
		
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
    
    
        /**
         * keep track of the trails of the object (the path behind it)
		 * @pre none
		 *		@param none
		 *		@post draws the trail
		 * 		@return none
		 */
    drawTrail(){
		this.state1.center = [this.x, this.y, this.z];
        let iterator = Math.floor((frameCount%this.trailLength)/(this.trailLength/this.trailPoints))+1;
        
        if(frameCount < this.trailLength){
            iterator = Math.floor(this.trailPoints * ( frameCount / this.trailLength));
        }
            
        stroke(255);
	    strokeWeight(10);
        fill(255);
        noFill();
    
        beginShape();
            
            if(frameCount > this.trailLength){
                for(var rep = iterator; rep < this.trailPoints; rep++){

                    curveVertex(this.trail[rep][0], this.trail[rep][1], this.trail[rep][2]);

                }
            }

			for(var rep = 0; rep < iterator; rep++){

				curveVertex(this.trail[rep][0], this.trail[rep][1], this.trail[rep][2]);
                
			}
        
         curveVertex(this.x, this.y, this.z);
		endShape();
		
		//line(camX,camY,camZ, this.x,this.y,this.z); 
        
        stroke(255);
		
	    strokeWeight(0.01);
        fill(255);
        noFill();
       
       
    }
    
        /**
         * gets coordinates
		 * @pre none
		 *		@param none
		 *		@post gets coordinates
		 * 		@return coordinates
		 */
    getCoordinates(){
        return [this.x, this.y, this.z];
    }
    
    getX(){
        return this.x;
    }
    
    getY(){
        return this.y;
    }
    
    getZ(){
        return this.z;
    }
    
    setX(x){
        this.x = x;
    }
    
    setY(y){
        this.y = y;
    }
    
    setZ(z){
        this.z = z;
    }
        /**
         * gets radius
		 * @pre none
		 *		@param none
		 *		@post gets radius
		 * 		@return radius
		 */
    getRadius(){
        return this.radius;
    }
    
        /**
         * gets mass
		 * @pre none
		 *		@param none
		 *		@post gets mass
		 * 		@return mass
		 */
    getMass(){
        return this.mass;
    }
    
        /**
         * gets name
		 * @pre none
		 *		@param none
		 *		@post gets name
		 * 		@return name
		 */
    getName(){
        return this.name
    }

    getTexture(){
        return this.texture;
    }

    getDistance(){
        return this.distance;
    }
    
    getTrailPoints(){
        return this.trailPoints;
    }
    
    getTrailLength(){
        return this.trailLength;
    }
    
    getTrail(){
        return this.trail;
    }
    
    setTrail(x,y,z){
       this.x = x;
       this.y = y;
       this.z = z; this.trail[Math.floor((frameCount%this.trailLength)/(this.trailLength/this.trailPoints))] = [this.x,this.y,this.z];
    }
    
    createTexture(t){
        t = this.texture;
        texture(t);
    }
	
        /**
         * prints info about the planet
		 * @pre none
		 *		@param none
		 *		@post prints info about the planet
		 * 		@return none
		 */
    log(){
        console.log("Object name: " + this.name + 
                    "\nObject XYZ: " + Math.floor(this.x) + ", " + Math.floor(this.y) + ", " + Math.floor(this.z) + 
                    "\nObject radius: " + Math.floor(this.radius) +
                    "\nObject mass: " + Math.floor(this.mass));
    }
}