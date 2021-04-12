var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood, feedTheDog;
var foodObj;
var feed;
var padZero = function(num) {
  var numDigits = 2;
  var n = abs(num);
  var zeros = max(0, numDigits - floor(n).toString().length );
  var zeroString = pow(10, zeros).toString().substr(1);
  return zeroString + n;
};
var h;

//create feed and lastFed variable here
var lastFed, feed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  lastFed=database.ref('feedTime');
  lastFed.on("value",readTime);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedTheDog=createButton("feed");
  feedTheDog.position(800,100);
  feedTheDog.mousePressed(feedDog);
  
  addFood=createButton("Add Food");
  addFood.position(600,100);
  addFood.mousePressed(addFoods);

}



function draw() {
  background(46,139,87);
  foodObj.display();

  h=hour();

  //write code to read fedtime value from the database 
  feed=database.ref('feedTime');
  feed.on("value",readTime);
 
  //write code to display text lastFed time here
  

  if(feed>=12){
    fill(255,0,0);  
    textSize(20);
    text("last fed: "+(feed-12)+" PM",475,70);
  }
  else if(feed===0){
    fill(255,0,0);
    textSize(20);
    text("last fed: 12 AM",4750,70);
  }
  else if(feed<12){
    fill(255,0,0);
    textSize(20);
    text("last fed: "+feed+" AM",475,70);
  }
  
  console.log(h);
  

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function readTime(data){
  feed=data.val();
}

function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodS--;
  feed=h;
  database.ref('/').update({
    Food:foodS
  })
  database.ref('/').update({
    feedTime:feed
  })  



}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
