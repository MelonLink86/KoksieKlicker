/*
Urheberrechtliche Information:
Idee und Umsetzung: Oliver Prints
Hilfestellung: Arianna Otte, Miká Purwins

Sehr geehrter Leser (wahrscheinlich Herr Bringmann),
obwohl Ari und ich (Miká) an diesem Projekt beteiligt sind, beschränkt sich
diese Beteilung ausschließlich auf das geben von Ratschlägen und die vorläufige
Implementierung schwierigerer Features zu Demonstrationszwecken.
Die Entwicklung von Konzepten und Lösungen, die Optimierung des Programms, das
Lösen von eventuellen Problemen, etc. wird von Oliver übernommen. Es handelt
sich hier also keinesfalls um aus dem Internet gestohlenen Code. Es wäre
wahrscheinlich auch schwer, ein so fragwürdiges Projekt irgendwo zu finden.
MfG, Miká und Ari

P.S. Oliver weiß wirklich was er tut, da kann man ruhig schon mal eine Punktzahl
im Einserbereich vergeben.
*/

let koks;
let koksScale;
let mousedown = false;
let hfarbe = 0;
let kmenge = 0;
let kps = 0;
let kpsc = 0;
let kokserliste;
let panzahl = 0;
let gefahrmult = 1;
let haltstopsolipop = 0;
let extrakoks = 0;

function setup(){
    createCanvas(1200, 800);
    frameRate(60);
    kokserliste = [];
    kokserliste.push(new kokser(2, 60, 15,'Kreditkarte','assets/karte.png'));
    kokserliste.push(new kokser(9, 60, 100,'Kokslöffel','assets/loeffel.jpg'));
    kokserliste.push(new kokser(21, 30, 1100,'Koksjunkie','assets/junkie.jpg'));
    kokserliste.push(new kokser(234, 25, 23000,'Dealer','assets/dealer.jpg'));
    kokserliste.push(new kokser(974, 20, 150000,'gerollte 100$','assets/geld.jpg'));
    kokserliste.push(new kokser(2304, 15, 1700000,'Mies Dicke Line','assets/line.png'));
    kokserliste.push(new kokser(3683, 10,  22000000,'LEEEAAAANN','assets/lean.jpg'));
    kokserliste.push(new kokser(4187, 4, 350000000,'187','assets/187.jpg'));   
    print(this.menge);
}

function nuttation(n){
    const locale = document.documentElement.lang || 'en'
    const number = parseFloat(n, 10)
    return number.toLocaleString(locale);
}

function preload(){
    koks = loadImage('assets/koks.png');
    hmusik = loadSound('assets/hmusik.wav');
/*      Lyrics zur Background Musik
        und du mussts einfach verstehn mann
        sammel so viel schnee, mann
        weißer als ein schneeman

        koksi klicker

        kripo wird dich schon nicht holen
        komm, fang an zu koksen
        komm groß raus, ganz oben

        koksi klicker */
    schnief = loadSound('assets/schnief.mp3');
}

function draw(){
    gefahrcalc();
    epilepsiehintergrund();
    //ui box
    strokeWeight(5);
    rect(800, 0, 400, 800);   
    rect(0, 0, 800, 800);
    // console.log(mouseX, mouseY) 
    koksbild();
    koksinfos();
    kokserrechts();
    prestigeb();
    //console.log(panzahl)
}

/* function keyPressed(){
    if (keyCode === ENTER){
     hmusik.play();
    }
} */

function mouseClicked(){
    if (!hmusik.isPlaying()){
        hmusik.setVolume(0.35);
        hmusik.loop();
        hmusik.play(); 
    } 
    if (mouseX > 100 && mouseX < 700 
        && mouseY > 370 && mouseY < 770){
        kmenge++;
        kpsc++;
        schnief.setVolume(0.5);
        schnief.play();        
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
//panzahl wenn maus über knof
   if (mouseX > 0 && mouseX < 150
     && mouseY > 740 && mouseY < 800){
        if (kokserliste[7].menge >= 10) {
           presitge();
        }
    } 
}

function presitge(){
    for (let i = 0; i < kokserliste.length; i++){
        kokserliste[i].menge=0;
        kokserliste[i].preis = kokserliste[i].bpreis
    }
    panzahl++;
    console.log(panzahl)
    kmenge = 0;
}
 
function prestigeb(){
    fill(0);
    strokeWeight(5);
    rect(4, 740, 150, 60);
    textSize(32)
    colorMode(HSB, 100);
    hfarbe += kps/75000;
    fill(hfarbe%100, 100, 100);
    textAlign(LEFT);
    text('Prestige?',5, 760);
    textSize(20);
    text('k: 10x 187', 10, 787); 
}

function epilepsiehintergrund(){
    colorMode(HSB, 100);
    hfarbe += kps/75000;
    fill(hfarbe%100, 100, 100);
}

function koksbild(){
    koksScale = 1;
    if (mouseX > 100 && mouseX < 700 
     && mouseY > 370 && mouseY < 770){
        koksScale = 1.05;
        if (mousedown){
          koksScale = 0.95
        }   
    }    
    imageMode(CENTER);
    image(koks, 400, 570, 600*koksScale, 400*koksScale);
}

function koksinfos(){
    fill(0);
    textSize(70);
    textAlign(CENTER);
    text(nuttation(Math.round(kmenge)) + ' Koks', 400, 100);
    if (frameCount%60 == 0){
        kps = kpsc;
        kpsc = 0;
    }
    textSize(30);
    text('pro sekunde: ' + nuttation(kps*(panzahl+1)*gefahrmult), 400, 150);
    text('Einkommensfakttor durch GEFAHR:' + nuttation(gefahrmult),400,200);
}

function kokserrechts(){
    extrakoks = 0;
    for (let i = 0; i < kokserliste.length; i++){
        extrakoks += kokserliste[i].update(frameCount,800,i*100);
    }
    kpsc += (panzahl+1)*gefahrmult*extrakoks;
    kmenge += (panzahl+1)*gefahrmult*extrakoks;
}

function mousePressed(){
    mousedown = true;
}

function mouseReleased(){
    mousedown = false;
}

function gefahrcalc(){
    if(random(0,1000) <= 1){
        gefahrmult *= 1-((str(kmenge).length+random(0,3))/100)
        gefahrmult = constrain(gefahrmult, 0.1,1);
    }
}
    
function angrif(){
    if(random(0,100)<=haltstopsolipop){
        zugriff();
    }        
    let nebistemp = gefahrmult
    gefahrmult *=(1.5+(str(kmenge).length)/10)
    
    haltstopsolipop+=1*(1+gefahrmult-nebistemp);
} 

function zugriff(){
    console.log("Die Polizei hat eine Razzia gegen dich ausgeführt.")
    for (let i = 0; i < kokserliste.length; i++){
        kokserliste[i].menge=round(random(0,round(kokserliste[i].menge*0.75)));
    }
    kmenge -= random(0,kmenge/2);
    haltstopsolipop =0;
    
}