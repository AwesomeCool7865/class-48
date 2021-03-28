var bg;
var harry, harryIMG, voldy, voldyIMG;
var hFLASH, vFLASH, flash1IMG, flash2IMG; 
var die, whoosh1, whoosh2, twinkle;
var harryHealth= 100;
var voldyHealth= 100;
var hDisarm, hShield, hStun, hHealing, hBurn;
var vDisarm, vStun, vKill;
var turn= 1;
var delayInMilliseconds = 3000; //3 second

function preload(){
  bg = loadImage("Background.jpg");
  harryIMG= loadImage("ClipartKey_77309.png")
  voldyIMG= loadImage("ClipartKey_2539150.png")
  flash1IMG= loadImage("Harry Flash.png");
  flash2IMG= loadImage("Voldemort FLash.png")

  die = loadSound("roblox-death-sound_1.mp3")
  whoosh1 = loadSound("Wand Whoosh.mp3")
  whoosh2 = loadSound("Whoosh.mp3")
  twinkle = loadSound("Twinkle.mp3")
  
}

function setup() {
  createCanvas(1400, 650);
  harry=createSprite(1250, 500, 50, 50);
  harry.addImage(harryIMG)
  harry.scale= 0.15

  voldy=createSprite(100, 500, 50, 50);
  voldy.addImage(voldyIMG)
  voldy.scale= 0.30

  hFLASH= createSprite(1030,550,50,50);
  hFLASH.addImage(flash1IMG);
  hFLASH.scale= 2;
  hFLASH.visible= false;

  vFLASH= createSprite(280,500,50,50);
  vFLASH.addImage(flash2IMG);
  vFLASH.scale= 2;
  vFLASH.visible= false;

  hDisarm= createButton("Expelliarmus");
  hStun=  createButton("Stupefy");
  hShield=createButton("Protego");
  hHealing= createButton("Healing Potion");
  hBurn= createButton("Throw Potion");
  hDisarm.position(1220, 100)
  hStun.position(1220, 130)
  hShield.position(1220, 160)
  hHealing.position(1220, 190)
  hBurn.position(1220, 220)
  hide();

}

function draw() {
  background(bg); 

  if (harryHealth===0 || harryHealth<0){
    clear();
    harry.visible = false;
    voldy.visible = false;
    vFLASH.visible= false;
    hFLASH.visible= false;
    
    turn = 0;
    textSize(50)
    fill("black")
    textFont("Courier New")
    text("Game Over", 550, 200);
    text("Voldemort Wins :(", 500, 350);
  }

  if (voldyHealth===0 || voldyHealth<0){
    clear();
    harry.visible = false;
    voldy.visible = false;
    vFLASH.visible= false;
    hFLASH.visible= false;
    
    turn = 0;
    textSize(50)
    fill("black")
    textFont("Courier New")
    text("Game Over", 550, 200);
    text("Harry Wins!!!", 500, 350);
  }

  if (harryHealth>100){
    harryHealth= 100;
  }

  if (turn === 1){
    show();
    vFLASH.visible= false;

    hDisarm.mousePressed(async()=>{
      console.log("Disarmed") ;
      hFLASH.visible= true;
      disarm(voldy);
      hide();
      setTimeout(function(){ turn=2; }, 3000);
      
       })

    hStun.mousePressed(async()=>{
        console.log("Stunned") ;
        hFLASH.visible= true;
        stun(voldy);
        hide();
        await setTimeout(function(){ turn=2; }, 3000);
        
    })

    hShield.mousePressed(async()=>{
          console.log("Protected") ;
          hFLASH.visible= true;
          hide();
          await setTimeout(function(){ turn=2; }, 3000);
         
    })
    hHealing.mousePressed(async()=>{
            console.log("Healed") ;
            heal(voldy)
            hide();
            await setTimeout(function(){ turn=2; }, 3000);
           
            
            
             })
    hBurn.mousePressed(async()=>{
              console.log("Opponent Hurt") ;
              hurt(voldy);
              hide();
              await setTimeout(function(){ turn=2; }, 3000);
           
                }
              //hFLASH.visible= true;
               )
          
  }

  if (turn === 2){
    hDisarm.hide()
    hStun.hide()
    hShield.hide()
    hHealing.hide()
    hBurn.hide()
    hFLASH.visible= false;
    

    vSpellCast();
    console.warn("cast");
    
    
  }

  

  drawSprites();
  textSize(24)
  fill("white")
  textFont("Courier New")
  text("Harry's Health: "+ harryHealth, 1100, 50);
  text("Voldemort's Health: "+ voldyHealth, 50, 50);

  
}



/*setTimeout(function() { turn=2; }
  , delayInMilliseconds);
setTimeout1(function() { turn=1; }
  , delayInMilliseconds);
 */ 


function disarm(person){
  if (person === harry){
    whoosh1.play();
    harryHealth= harryHealth-20;
    die.play();

  }

  if (person === voldy){
    whoosh2.play();
    voldyHealth= voldyHealth-20;
    die.play();
  }
}

function stun(person){
if (person === harry){
  whoosh1.play();
  harryHealth= harryHealth-15;
  die.play();
}

if (person === voldy){
  whoosh2.play();
  voldyHealth= voldyHealth-15;
  die.play();
}
}


function kill(person){
if (person === harry){
  whoosh1.play();
  harryHealth= harryHealth-30;
  die.play();
}

if (person === voldy){
  whoosh2.play();
  voldyHealth= voldyHealth-15;
  die.play();
}
}

function heal(person){
  if (person === voldy){
    //whoosh2.play();
    harryHealth= harryHealth+30;
    twinkle.play();
    
  }
  
  if (person === harry){
    whoosh1.play();
    voldyHealth= voldyHealth+15;
    twinkle.play();
  }
}

function hurt(person){
  if (person === harry){
    whoosh1.play();
    harryHealth= harryHealth-25;
    die.play();
  }
  
  if (person === voldy){
    whoosh2.play();
    voldyHealth= voldyHealth-25;
    die.play();
  }
}

function hide(){
  hDisarm.hide()
  hStun.hide()
  hShield.hide()
  hHealing.hide()
  hBurn.hide()
}

function show(){
  hDisarm.show()
    hStun.show()
    hShield.show()
    hHealing.show()
    hBurn.show()
}

async function vSpellCast(){
  var rand = Math.round(random(1,5));
  //console.log(rand);
  if (rand===1){
    disarm(harry);
   
    vFLASH.visible= true;
    await setTimeout(function(){ turn=1; }, 3000);

  }

  if (rand===2){
    stun(harry);
    
    vFLASH.visible= true;
    await setTimeout(function(){ turn=1; }, 3000);
  }

  if (rand===3){
    disarm(harry);
    
    vFLASH.visible= true;
    await setTimeout(function(){ turn=1; }, 3000);
  }

  if (rand===4){
    stun(harry);
    
    vFLASH.visible= true;
    await setTimeout(function(){ turn=1; }, 3000);
  }

  if (rand===5){
    kill(harry);
    
    vFLASH.visible= true;
    await setTimeout(function(){ turn=1; }, 3000);
  }

}

