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
        colorMode(HSB, 100);
        hfarbe += kps/75000;
        fill(hfarbe%100, 100, 100);
        
        imageMode(CORNER);
        image(
            this.img,
            800,
            y,
            400,
            100
        );
        imageMode(CENTER);

        textSize(30);
        textAlign(LEFT);
        text(this.name, x+10, y+40);
        textSize(20);
        text('kk: ' +(nuttation(this.getPreis())), x+10, y+75);
        textSize(50);
        textAlign(RIGHT,CENTER);
        text(nuttation(this.menge), x+390, y+50);

        if (frameCount%this.krate == 0){
                return this.kzuwachs*this.menge;
        }   else return 0;  
    }
}