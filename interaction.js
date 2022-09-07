var can=document.querySelector("canvas");
can.width=window.innerWidth;
can.height=window.innerHeight;
var c=can.getContext("2d");


// score and coins
var score=0;
var coins=0;
document.getElementById("score").value=score
//document.getElementById("coins").value=coins
/////////////


/// obstacle

const BgX=200;
const BgY=50;
const BgX2=600;

const VELOCITYOFSPACES=1;
const GAMEHEIGHT=1800;
const THICKNESS=60;
const HEIGHTEMPTYSPACES=50;
const MINIMUMDISTANCEBETWEENSPACES=200;

var lastOneIsEmptySpace=false;
var lastOneIsEmptySpace2=false;
var lastOneIsEmptySpaceMiddle=false;
var block=[0];
var block2=[0];
var blockMiddle=[0];
var time=new Date().getTime();
var minDistanceBetweenBlocks=0;
const D = (BgX2-BgX)-THICKNESS;

/// player
const BALLRADIUS = 10;
const GRAVITY = 10;
const SCALINGFACTOR=5;
const DISTANCEMAX=1000;
const XMIN=BgX+THICKNESS;
const YMIN=50;
const XMAX = 600;
const YMAX = 1600;

//

const MIDDLEBLOCKSX=(BgX+BgX2)/2;
const WIDTHOFMIDDLESPACES=40;
const HEIGTHOFMIDDLESPACES=60;


//

//var UpwardsForceWhenOnwalls=0;
var playing=true;
var clicked=false;
var onceClicked = 0;
var thisIsRunned=false;
var reachedEndPoints=true;

const INITIALX=200+THICKNESS+BALLRADIUS;
const INITIALY=500;

var initial = {
    x:INITIALX,
    y:INITIALY
}
var final = {
    x:INITIALX,
    y:INITIALY
}

var lastLocation = {
    x:INITIALX,
    y:INITIALY
}
var clickTime = 0;
var upTime = 1;
function mouseOnClick(event){
    clicked=true;
    initial.x = event.clientX;
    initial.y  = event.clientY;
    // if(clickTime<=upTime){
    //     initial.x = event.clientX;
    //     initial.y  = event.clientY;
    // }
    clickTime=new Date().getTime();
}

const TIMEOFSTART=new Date().getTime();

var onRed=false;
var inside=false; 
var gameStatus=1;
var moved=false;

var clickFromTime=0;
var numberOfMouseUp=0;  
var timeStarting=[0];
function mouseUp(event) {
    moved=true;
    clicked=false;
    upTime=new Date().getTime();
    numberOfMouseUp=numberOfMouseUp+1;
    final.x = event.clientX;
    final.y = event.clientY;
    timeStarting.push(new Date().getTime());
    onceClicked=onceClicked+1;
    clickFromTime=new Date().getTime();
}

function distanceBetween(p1,p2) {
    var dis=Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2))
    if(dis>=DISTANCEMAX){
        return DISTANCEMAX;
    }
    return dis;}

function angleBetween(p1, p2) {
    return  Math.atan2(p2.y-p1.y, p2.x-p1.x);
}
///////////////
function drawBall(ballPosition,ballRadius){
    c.beginPath();
    c.arc(ballPosition.x, ballPosition.y, ballRadius, 0, 2 * Math.PI, false);
    c.fillStyle = 'green';
    c.fill();
    c.lineWidth = 5;
    c.strokeStyle = '#003300';
    c.stroke();
}

function draw_bg(){
    c.fillStyle="red";
    c.fillRect(BgX,BgY,THICKNESS,GAMEHEIGHT);
    c.fillStyle="red";
    c.fillRect(BgX2,BgY,THICKNESS,GAMEHEIGHT);
    }
    
function drawSpaces(block){
    var lenghtBlockArray=block.length;
    for(var i=0;i<lenghtBlockArray;i++){
        c.fillStyle="white";
        c.fillRect(BgX,block[i],THICKNESS,HEIGHTEMPTYSPACES);
    }
}
    
function callBlock(block){
    if(lastOneIsEmptySpace){
        lastOneIsEmptySpace=false;
        return 0;
    }
    else {
        var t=Math.floor(Math.random()*3)+1;
        if(t%2==0){
            lastOneIsEmptySpace=true;
            return 1;
        }
        
        else{
            lastOneIsEmptySpace=false;
            return 0;}
    }
}
    
function removeCloseValue(a){a.pop();}

function addBlock(block){
    block.push(0);
    var len=block.length;
    //console.log(block);
    if(len>=2 && (block[len-2]-block[len-1])<MINIMUMDISTANCEBETWEENSPACES){
        removeCloseValue(block);
    }
}
    /////////////////////////////////////////
    
function drawSpaces2(block2){
    var lenghtBlock2Array=block2.length;
    for(var i=0;i<lenghtBlock2Array;i++){
        c.fillStyle="white";
        c.fillRect(BgX2,block2[i],THICKNESS,HEIGHTEMPTYSPACES);
    }
}
    
function callBlock2(block2){
    if(lastOneIsEmptySpace2){
        lastOneIsEmptySpace2=false;
        return 0;
    }
    else {
        var t=Math.floor(Math.random()*4)+1;
        if(t%2==0){
            lastOneIsEmptySpace2=true;
            return 1;
            }
        else{
            lastOneIsEmptySpace2=false;
            return 0;}
    }
}

function removeCloseValue2(a){a.pop();}

function addBlock2(block2){
    block2.push(0);
    var len=block2.length;
    //console.log(block2);
    if(len>=2 && (block2[len-2]-block2[len-1])<MINIMUMDISTANCEBETWEENSPACES){
        removeCloseValue2(block2);
    }
}
///
function drawSpacesMiddle(blockMiddle){
    var lenghtBlockMiddleArray=blockMiddle.length;
    for(var i=0;i<lenghtBlockMiddleArray;i++){
        c.fillStyle="blue";
        c.fillRect(MIDDLEBLOCKSX,block[i],WIDTHOFMIDDLESPACES,HEIGTHOFMIDDLESPACES);
    }
}
function callBlockMiddle(blockMiddle){
    if(lastOneIsEmptySpaceMiddle){
        lastOneIsEmptySpaceMiddle=false;
        return 0;
    }
    else {
        var t=Math.floor(Math.random()*3)+1;
        if(t%2==0){
            lastOneIsEmptySpaceMiddle=true;
            return 1;
        }
        
        else{
            lastOneIsEmptySpaceMiddle=false;
            return 0;}
    }
}
    
function removeCloseValueMiddle(a){a.pop();}

function addBlockMiddle(blockMiddle){
    blockMiddle.push(0);
    var len=blockMiddle.length;
    //console.log(block);
    if(len>=2 && (blockMiddle[len-2]-blockMiddle[len-1])<MINIMUMDISTANCEBETWEENSPACES){
        removeCloseValueMiddle(blockMiddle);
    }
}
    /////////////////////////////////////////
    




//////////
function draw(ballPosition,BALLRADIUS,block,block2,blockMiddle){
    draw_bg();
    drawSpaces(block);
    drawSpaces2(block2);
    drawSpacesMiddle(blockMiddle);
   //// c.fillStyle="blue";
   // c.fillRect(0,0,100,100);
    drawBall(ballPosition,BALLRADIUS);
}

//////////////////////////
function ballUpdate(ballPosition,vx,vy){
    var currentTime= new Date().getTime()
    if(clickFromTime==0){
        var newX=ballPosition.x;
        var newY=ballPosition.y;
    }
    else{
        var t=(currentTime-clickFromTime)/(1000*10);
        var newX=ballPosition.x+vx*t;
        var newY=ballPosition.y+vy*t+1/2*(GRAVITY)*(Math.pow(t,2));
        if(newY>=YMAX){
            newY=YMAX;
        }
        if(newX>=XMAX){
            if(vx>=0){newX=XMAX;
            }
        }
        if(newX<=XMIN){
            if(vx<=0){newX=XMIN;
            }
        }
    }
    return [newX,newY];

}
//////////
function velocities(initial,final){
    var angle=angleBetween(initial,final);
    var distancePulled=distanceBetween(initial,final)/SCALINGFACTOR;
    if(initial.x>=final.x && initial.y>=final.y){
        vx=distancePulled*Math.abs(Math.cos(angle));
        vy=distancePulled*Math.abs(Math.sin(angle));
    }
    else if(initial.x>=final.x && initial.y<=final.y){
        vx=distancePulled*Math.abs(Math.cos(angle));
        vy=-distancePulled*Math.abs(Math.sin(angle));
    }
    else if(initial.x<=final.x && initial.y>=final.y){
        vx=-distancePulled*Math.abs(Math.cos(angle));
        vy=distancePulled*Math.abs(Math.sin(angle));

    }else if(initial.x<=final.x && initial.y<=final.y){
        vx=-distancePulled*Math.abs(Math.cos(angle));
        vy=-distancePulled*Math.abs(Math.sin(angle));

    }
    return [vx,vy];
}
/////////
const SCORECHANGETIME=100;



function update(block,block2,blockMiddle,ballPosition,vx,vy){
    
    if(vx==0){
    onRed=true;
    }
    c.clearRect(0,0,can.width,can.height);
    if(callBlock(block)==1){
        addBlock(block);
    }
    var lenghtBlockArray=block.length;
    for(var i=0;i<lenghtBlockArray;i++){
        block[i]=block[i]+VELOCITYOFSPACES;
        // console.log(block[i]);
    }
    // MIDDLE BLOCK

    if(callBlockMiddle(blockMiddle)==1){
        addBlockMiddle(blockMiddle);
    }
    var lenghtBlockMiddleArray=blockMiddle.length;
    for(var i=0;i<lenghtBlockMiddleArray;i++){
        blockMiddle[i]=blockMiddle[i]+VELOCITYOFSPACES;
        // console.log(block[i]);
    }
    

        //BLOCK 2
    if(callBlock2(block2)==1){
        addBlock2(block2);
    }
    var lenghtBlock2Array=block2.length;
    for(var i=0;i<lenghtBlock2Array;i++){
        block2[i]=block2[i]+VELOCITYOFSPACES;
    
    }
    return (ballUpdate(ballPosition,vx,vy));
}

function checkGameStatus(block,block2,blockMiddle,xnew,ynew){
    
    var gamePlaying=true;
    var len=block2.length;
    for(var i=0;i<len;i++){
        if( xnew >= BgX2 && ynew>block2[i] &&((ynew-block2[i])<HEIGHTEMPTYSPACES)){
            inside=true;
            gamePlaying=false;
            onRed=false;
            break;
        }
        if( xnew <= XMIN && ynew>block[i] &&((ynew-block[i])<HEIGHTEMPTYSPACES)){
            inside=true;
            gamePlaying=false;
            onRed=false;
            break;
        }
    }
    var len=blockMiddle.length;
    for(var i=0;i<len;i++){
        if( xnew+BALLRADIUS >= MIDDLEBLOCKSX && xnew-BALLRADIUS<=(MIDDLEBLOCKSX+WIDTHOFMIDDLESPACES) && ynew+BALLRADIUS>blockMiddle[i] &&((ynew-BALLRADIUS-blockMiddle[i])<HEIGTHOFMIDDLESPACES)){
            //console.log(blockMiddle[i],ynew,blockMiddle[i]+HEIGTHOFMIDDLESPACES);
            inside=true;
            gamePlaying=false;
            onRed=false;
            break;
        }
    }  
    if(gamePlaying && xnew==BgX2 && xnew==BgX){
        console.log("on red");
        onRed=true;
    }
    return gamePlaying;
}
 
setInterval(showScore,SCORECHANGETIME);
function main(){ 
    if(playing==true){
        requestAnimationFrame(main);
            if(thisIsRunned==false ){
                vx=0;
                vy=0;
            }
            if(clicked==false && (onceClicked!=0)){
                [vx,vy] = velocities(initial,final) 
                thisIsRunned=true;
            }
            var [xnew,ynew] = update(block,block2,blockMiddle,lastLocation,vx,vy);
            //console.log(xnew);
            lastLocation.x=xnew;
            lastLocation.y=ynew;
           // console.log(lastLocation);
            draw(lastLocation,BALLRADIUS,block,block2,blockMiddle);
            playing=checkGameStatus(block,block2,blockMiddle,xnew,ynew);
        
        }
    else console.log("GameOver");
}


function showScore(){
   // var timenew=new Date().getTime();
    //showScore(timenew);
    //var timenew=new Date().getTime();
        ////var timegap=timenew-TIMEOFSTART;
        //if(timegap%SCORECHANGETIME==0){
            
if(playing==true){score=score+1;
    document.getElementById("score").value=score;
}
            //}
}



// function centerObstacles(){

// }


function startgame(){
    main();
}
startgame();