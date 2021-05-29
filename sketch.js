var climber_image, door_image, ghost_jumping_image , ghost_standing_image , tower_image
var tower , climber , ghost , door , invisibleBlock , doorG , climberG, invisibleBlockG
var gameState = "play"
var score = 0 

function preload(){

climber_image = loadImage("climber.png")
ghost_jumping_image = loadImage("ghost-jumping.png")
ghost_standing_image = loadImage("ghost-standing.png")
door_image = loadImage("door.png")
climber_image = loadImage("climber.png")
tower_image = loadImage("tower.png")

}



function setup() {
  createCanvas(600, 600);

  tower = createSprite(300,300)
  tower.addImage(tower_image)
  tower.velocityY = 5

ghost = createSprite(300,300,40,40)
ghost.addImage(ghost_standing_image)
ghost.scale = 0.5

  


doorG= createGroup();
climberG= createGroup();
invisibleBlockG= createGroup();
}



function draw() {
  background(0);

 if (gameState==="play"){
  score = score+Math.round(random(getFrameRate()/60))
  if(tower.y>600){
    tower.y = 400
 }

 if (keyDown("space")){
   ghost.velocityY = -5

 }

 if (keyDown("right_arrow")){
  ghost.x += 5
}

if (keyDown("left_arrow")){
  ghost.x -= 5
}

ghost.velocityY+=0.8
spawnDoors();

if (climberG.isTouching(ghost)){
ghost.velocityY = 0
}

if (invisibleBlockG.isTouching(ghost)|| ghost.y>600){
  gameState = "end"
}
 




 
 
 
 
 
  
  drawSprites();
  fill("white")
  text("Score:"+score,10,50)
}
if (gameState==="end"){                         
  ghost.destroy();
  textSize(60)
  fill("Pink")
  text("GAME OVER",100,300)
  
}
}

function spawnDoors(){

if (frameCount % 180 === 0 ){

door = createSprite(200,-50)
door.velocityY = 3
door.addImage(door_image)
door.x =Math.round(random(100,500))
doorG.add(door)
ghost.depth+=1
ghost.depth = door.depth
door.lifetime = 500

climber = createSprite(200,10)
climber.velocityY=3
climber.addImage(climber_image)
climber.x = door.x
climberG.add(climber)
climber.lifetime=500

invisibleBlock= createSprite(200,15)
invisibleBlock.width = climber.width
invisibleBlock.height = 3
invisibleBlock.velocityY = 3
invisibleBlock.x = door.x 
invisibleBlock.lifetime = 500
invisibleBlock.visible = false
invisibleBlockG.add(invisibleBlock)
invisibleBlock.debug = true

}


}