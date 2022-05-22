let koks;
let koksScale;
let mousedown = false;

let hfarbe = 0;

let kmenge = 0;
let kps = 0;
let kpsc = 0;

let kokserliste;

//let prestige = 0
/* 
prestige button
    if press pbutt(){
        prestige
        lt(all) = 0
        kps*5(prestige/3)
        return true
    else if ()
        return false
    }
*/


function setup(){
    createCanvas(1200, 800);
    frameRate(60);
    kokserliste = []
    kokserliste.push(new kokser(2, 60, 15,'Kreditkarte'));
    kokserliste.push(new kokser(9, 60, 100,'Kokslöffel'));
    kokserliste.push(new kokser(21, 30, 1100,'Koksjunkie'));
    kokserliste.push(new kokser(234, 25, 23000,'Dealer'));
    kokserliste.push(new kokser(974, 20, 150000,'Cracknutte'));
    kokserliste.push(new kokser(2304, 15, 1700000,'Mies Dicke Line'));
    kokserliste.push(new kokser(3683, 10,  22000000,'LEEEAAAANN'));
    kokserliste.push(new kokser(4187, 4, 350000000,'187'));   
    print(this.menge);
}

function nuttation(n){
    const locale = document.documentElement.lang || 'en'
    const number = parseFloat(n, 10)
    return number.toLocaleString(locale);
}

function preload(){
    koks = loadImage('assets/koks.png');
    ksong = loadSound('assets/ksong.mp3');
}

function draw(){
  colorMode(HSB, 100);
    hfarbe += kps/75000;
    fill(hfarbe%100, 100, 100); 
  colorMode(RGB, 255);
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
    text(nuttation(Math.round(kmenge)) + ' Koks', 400, 100);

    if (frameCount%60 == 0){
        kps = kpsc;
        kpsc = 0;
    }
    textSize(30);
    text('pro sekunde: ' + nuttation(kps), 400, 150);
   

    let extrakoks = 0
    for (let i = 0; i < kokserliste.length; i++){
        extrakoks += kokserliste[i].update(frameCount,800,i*100);

    }
    kpsc += extrakoks;
    kmenge += extrakoks;





}

function mouseClicked(){
    if (mouseX > 100 && mouseX < 700
     && mouseY > 370 && mouseY < 770){
         kmenge++;
         kpsc++;
    }
    for (let i = 0; i < kokserliste.length; i++){
        if (mouseX > 800 && mouseX < 1200
        && mouseY > i*100 && mouseY < i*100+100) {
            if (kmenge >= kokserliste[i].getPreis()){
                kmenge -= kokserliste[i].getPreis();
                kokserliste[i].kaufen();
            }
        }
    }
}

function mousePressed(){
    mousedown = true;
}

function mouseReleased(){
    mousedown = false;
}
