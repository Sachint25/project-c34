//Create variables here
var dog,dogImg,happyDog,foodS,foodStock;
var database;

function preload(){
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref("food");
  foodStock.on("value",readStock);

  textSize(20);
}


function draw() {  
  background(46,139,87);

  

  drawSprites();
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  fill("white");
  stroke("white");
  text("Food remaining: " + foodS,170,200);

  textSize(13);
  text("Note: Press UP_ARROW key to feed the dog",130,10);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }

  else{
    x = x-1;
  }

  database.ref("/").update({
    food: x
  })
}