function display(){

    W=1330;
    H=500;

    e1={
        x: 250,
        y: 50,
        w: 30,
        h: 30,
        speed: 20
    };
    
    e2={
        x: 400,
        y: 50,
        w: 40,
        h: 40,
        speed: 30
    };
    
    e3={
        x: 550,
        y: 50,
        w: 30,
        h: 30,
        speed: 40
    };
    
    
    e4={
        x: 700,
        y: 50,
        w: 40,
        h: 40,
        speed: 50
    };

    e5={
        x: 1000,
        y: 50,
        w:30,
        h: 30,
        speed: 70
    };
    
    enemies = [e1,e2,e3,e4,e5];
    
    player = {
        x: 20,
        y: H/2,
        w: 60,
        h: 60,
        speed: 20,
        moving: "false",
        forward:"true"
    };

    firstAid = {
        x: 850,
        y: 50,
        w: 40,
        h: 40,
        speed: 20
    };


    
    home = {
        x: 1250,
        y: H/2,
        w: 60,
        h: 60
    };
    gameOver="false";
    score= 0;

    //document.addEventListener('mousedown',function(){
      //player.moving= true;
    //})

    //document.addEventListener('mouseup',function(){
      //  player.moving= false;
    //})

    canvas=document.getElementById("canvas");
    
    button1=document.getElementById("button1");
    button1.addEventListener('click',function(){
        player.moving= true;
        player.forward=true;
    })
    
    button2=document.getElementById("button2");
    button2.addEventListener('click',function(){
        player.moving= true;
        player.forward=false;
    })
    
    
    
    canvas.width=W;
    canvas.height=H;
    
    pen =canvas.getContext("2d");
    console.log(pen);
    pen.font = "30px algerian";
}


function loadImages(){
    virus= new Image;
    virus.src="coronavirus.png";
    playerImg= new Image;
    playerImg.src="patient.png";
    firstAidImg= new Image;
    firstAidImg.src= "first-aid-kit.png";
    homeImg=new Image;
    homeImg.src="stay-home.png";
}

function draw(){

    pen.clearRect(0,0,W,H);
    pen.fillStyle = "white";
    pen.drawImage(firstAidImg,firstAid.x,firstAid.y,firstAid.w,firstAid.h)
    pen.drawImage(playerImg,player.x,player.y,player.w,player.h)
    pen.drawImage(homeImg,home.x,home.y,home.w,home.h)
    for(let i=0;i<enemies.length;i++){
        pen.drawImage(virus,enemies[i].x,enemies[i].y,enemies[i].w,enemies[i].h)
    }

    pen.fillText("Score: "+ score,10,40);
   
}

function isColliding(b1,b2){
    if( Math.abs(b1.x -b2.x)<=b1.h && Math.abs(b1.y-b2.y)<=b1.y){
        return true
    }
    else{
        return false;
    }
}

function update(){

    if(player.moving==true && player.forward==true){
        player.x+=player.speed;
        player.moving=false;
       
        score+=20;
    }
    
    if(player.moving==true && player.forward==false){
        player.x-=player.speed;
       player.moving=false;
        
    }
    
    if(isColliding(home,player)){
        gameOver=true;
        alert("You won and your score is "+ score);

    }
  
    for(let i=0;i<enemies.length;i++){
        if(isColliding( enemies[i],player)){
            score-=i*100;
        }
        if(score<0){
            gameOver=true;
            alert("Game Over and your score is 0");
        }
    }
   
if(isColliding(firstAid,player)){
    score+=50;
    firstAidImg.src="";
}
    for(let i=0;i<enemies.length;i++){
        enemies[i].y+= enemies[i].speed;
if(enemies[i].y<0 || enemies[i].y>H-enemies[i].h){
    enemies[i].speed*=-1;
   }
  }

  firstAid.y+=firstAid.speed;
  if(firstAid.y<0 || firstAid.y>H-firstAid.h){
      firstAid.speed*=-1;
  }
  
  
}



function gameLoop(){
    if(gameOver==true){
        clearInterval(f);
    }
    draw();
    update();

}



loadImages();
display();


var f=setInterval(gameLoop,100);
clearInterval()

