class kokser {
    constructor(kzuwachs,krate,uvp,name,assetUrl = ""){
        this.kzuwachs = kzuwachs;
        this.krate = krate;
        this.preis = uvp;
        this.menge = 0;
        this.name = name;
        this.bpreis = uvp;
        this.img = loadImage(assetUrl);
    }

    kaufen(){
        this.menge++;
        this.preis*=1.05;
    }

    getPreis(){
        return Math.round(this.preis);
    }

    menge(){
        return this.menge;
    }

    update(frameCount,x,y){

        colorMode(HSB, 100);
        fill(y/8, 100, 80);
        colorMode(RGB, 255);
        rect(x,y,400,100);
        
        imageMode(CORNER);
        image(this.img,800,y,400,100);
        imageMode(CENTER);

        fill('rgba(0,0,0,0.1)');
        rect(x,y,400,100);

        hfarbe += kps/75000;
        // fill(hfarbe%100, 100, 100);
        fill(255);


        // drawingContext.shadowBlur = 4;
        // drawingContext.shadowColor = color(0)
        // drawingContext.shadowOffsetY = 2;

        textStyle(BOLD);

        drawingContext.shadowBlur = 16;
        colorMode(HSB, 100);
        drawingContext.shadowColor = color(hfarbe%100, 100, 100);
        colorMode(RGB, 255);
        drawingContext.shadowOffsetY = 2;

        textSize(30);
        textAlign(LEFT);
        text(this.name, x+10, y+40);
        textSize(20);
        textStyle(NORMAL);
        text('kk: ' +(nuttation(this.getPreis())), x+10, y+75);
        textSize(50);
        textAlign(RIGHT,CENTER);
        textStyle(BOLD);
        text(nuttation(this.menge), x+390, y+50);
        
        textStyle(NORMAL);

        drawingContext.shadowBlur = 0;
        drawingContext.shadowColor = color(0)
        drawingContext.shadowOffsetY = 0;

        if (frameCount%this.krate == 0){
                return this.kzuwachs*this.menge;
        }   else return 0;  
    }
}