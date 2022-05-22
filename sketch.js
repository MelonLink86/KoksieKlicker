let koks;
let koksScale;
let mousedown = false;

let kmenge = 0;
let kps = 0;
let kpsc = 0;

let kreditkarte;

function setup(){
    createCanvas(1200, 800);
    frameRate(60)
    kreditkarte = new kokser(0.5, 60, 15,'Kreditkarte');

}

function preload(){
    koks = loadImage('assets/koks.png')
}

function draw(){
/*     colorMode(HSB, 100);
    fill(frameCount*25%100, 100, 100); */
    fill(200);
    strokeWeight(5);
    rect(800, 0, 400, 800);   
    rect(0, 0, 800, 800);
    imageMode(CENTER);
    koksScale = 1;
  
    if (mouseX > 100 && mouseX < 700 
     && mouseY > 370 && mouseY < 770){
        koksScale = 1.05;
        if (mousedown){
          koksScale = 0.95
        }   
    }    

    image(koks, 400, 570, 600*koksScale, 400*koksScale);

    fill(0);
    textSize(70);
    textAlign(CENTER);
    text(Math.round(kmenge) + ' Koks', 400, 100);

    if (frameCount%60 == 0){
        kps = kpsc;
        kpsc = 0;
    }
    textSize(30);
    text('pro sekunde: ' + kps, 400, 150);
   

    let extrakoks = kreditkarte.update(frameCount,800,0);
    kpsc += extrakoks;
    kmenge += extrakoks;


}

function mouseClicked(){
    if (mouseX > 100 && mouseX < 700
     && mouseY > 370 && mouseY < 770){
         kmenge++;
         kpsc++;
     }
    if (mouseX > 800 && mouseX < 1200
     && mouseY > 0 && mouseY < 100) {
         if (kmenge >= kreditkarte.getPreis()){
            kmenge -= kreditkarte.getPreis();
            kreditkarte.kaufen();
         }
     }
}

function mousePressed(){
    mousedown = true;
}

function mouseReleased(){
    mousedown = false;
}
