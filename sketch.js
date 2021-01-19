var dog,happyDog,sadDog,foodS,foodStock;
var database;
var feed,addFood;
var fedTime,lastFed;
var foodObj;
var changestate,readState;
var bedroom,garden,washroom;
var gameState;
var currentTime;


function preload()
{
  //load images here
sadDog = loadImage("Dog.png")
happyDog = loadImage("dogImg1.png");
// bedroom = loadImage("Bed Room.png");
// garden = loadImage("Garden.png");
// washroom = loadImage("Wash Room.png");

}

function setup() 
{
  database = firebase.database();
  createCanvas(800,800);

  foodObj = new Food();

  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  
  //read gamestate from database
  // readState = database.ref('gameState');
  // readState.on("value",function(data){
  //   gameState = data.val();
  // });

  dog = createSprite(400,400,50,50);
  dog.addImage(sadDog);
  dog.scale = 0.3;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  }


  function draw() 
  {

    background("orange");

    foodObj.display();

    // currentTime = hour();
    // if(currentTime === (lastFed + 1))
    // {
    //   update("playing");
    //   foodObj.garden();
    // }
    // else if(currentTime === (lastFed + 2)){
    //     update("sleeping");
    //     foodObj.bedroom();
    // }
    // else if(currentTime === (lastFed + 2) && currentTime <=(lastFed + 4))
    // {
    //   update("bathing");
    //   foodObj.washroom();
    // }
    // else{
    //   update("hungry");
    //  
      
    // }

  //   if(gameState !== "hungry")
  // {
  //   feed.hide();
  //   addFood.hide();
  //   dog.remove();
  // }else{
  //   feed.show();
  //   addFood.show();
    // dog.addImage(sadDog);

  //}

  textSize(20);
  stroke("green");
  fill("yellow");
  text("foodStock "+foodS,670,50);

  fedTime = database.ref('Feed Time');
  fedTime.on("value",function(data){
    LastFed = data.val();
  });


  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12)
  {
    text("Last Fed : "+lastFed%12 + "PM", 350,30);
  }
  else if(lastFed === 0){

    text("lastFed : 12 AM",350,30);
  }
  else{
    text("Last Feed : " + lastFed + "AM",350,30);
  }

  drawSprites();

}


  function readStock(data)
  {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
  }

  function feedDog()
  {
    dog.addImage(happyDog);
    foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
    database.ref('/').update({
      Food : foodObj.getFoodStock(),
      FeedTime : hour(),
      gameState : "hungry"
    })
  }

  function addFoods()
  {
    foodS++;
    database.ref('/').update({
      Food :foodS
    })
  }

  // function update(state)
  // {
  //    database.ref('/').update({
  //     gameState : state
  //   });
  // }
 
   // if(keyWentDown(UP_ARROW))
    // {
    //   writeStock(foodS);
    //   dog.addImage(happyDog);
    // }
  // text("note : press up arrow key to feed drago milk", 20,50);


  function writeStock()
  {
    foodS++
  database.ref('/').update({
  food:foodS
  })
  }


 



  


