// Rover Object Goes Here
// ======================
var roverA = {
  roverName : 'A',
  direction : 'N',
  position : {
    posX : 0,
    posY : 0
  },
  travelLog : []
}

var roverB = {
  roverName : 'B',
  direction : 'N',
  position : {
    posX : 0,
    posY : 0
  },
  travelLog : []
}

var activeRover = roverA;

var modeDebug = false;
var obstacles = [[0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0]];

const changeDir = {
  N : {
    L : "W",
    R : "E"
  },
  S : {
    L : "E",
    R : "W"
  },
  E : {
    L : "N",
    R : "S"
  },
  W : {
    L : "S",
    R : "N"
  }
}

const availableCommands = {
  l : 'turnLeft',
  r : 'turnRight',
  f : 'moveForward',
  b : 'moveBackward'
}
const maxX = 10;
const maxY = 10;

// ======================
function outputDebug(pMessage){
  if (modeDebug){
    console.log(pMessage);
  }
}

//Switch debug ON/OFF
function debugSw(){
  modeDebug = !modeDebug;
}

function roverSw(){
  switch(activeRover.roverName){
    case 'A':
      activeRover = roverB;
      break;
    case 'B':
      activeRover = roverA;
      break;
    default:
      activeRover = roverA;
      break;
  }
  console.log('Activated rover ' + activeRover.roverName);
}

//Turn to left
function turnLeft(rover){
  outputDebug("turnLeft was called!");
  outputDebug(rover);
  var actualDir = getRoverDir(rover);
  outputDebug('Actual dir : ' + actualDir);
  var newDir = returnNewDir(rover , 'l' )
  outputDebug('New dir : ' + newDir);
  updateDir(rover, newDir);
  rover.travelLog.push(['l',[rover.position.posX, rover.position.posY],rover.direction]);
  let movement = {allowed : true,
                  message : "" };
  return movement;  
}

//Turn to right
function turnRight(rover){
  outputDebug("turnRight was called!");
  outputDebug(rover);
  var actualDir = getRoverDir(rover);
  outputDebug('Actual dir : ' + actualDir);
  var newDir = returnNewDir(rover , 'r' )
  outputDebug('New dir : ' + newDir);
  updateDir(rover, newDir);
  rover.travelLog.push(['r',[rover.position.posX, rover.position.posY],rover.direction]);
  let movement = {allowed : true,
                  message : "" };
  return movement;
}

// Move forward
function moveForward(rover){
  outputDebug("moveForward was called");
  outputDebug(rover);
  var movement = checkLimits(rover , 'f');
  outputDebug("Retorno chequeo:" ,movement);
  if( movement.allowed){
    outputDebug('Actualizo POS');
    updatePos(rover , 'f');
    outputDebug('New X:' + rover.position.posX);
    outputDebug('New Y:' + rover.position.posY);
    rover.travelLog.push(['f',[rover.position.posX, rover.position.posY],rover.direction,movement.message]);
  }else{
    outputDebug('Check Falso');
  }
  return movement;
}

// Move Barckward
function moveBackward(rover){
  outputDebug("moveBackward was called");
  outputDebug(rover);
  var movement = checkLimits(rover , 'b');
  if( movement.allowed){
    outputDebug('Actualizo POS');
    updatePos(rover , 'b');
    outputDebug('New X:' + rover.position.posX);
    outputDebug('New Y:' + rover.position.posY);    
    rover.travelLog.push(['b',[rover.position.posX, rover.position.posY],rover.direction,movement.message]);
  }else{
    outputDebug('Check Falso');
  }
  return movement;
}

// Update Rover direction
function updateDir(pRover, newDir){
  pRover.direction = newDir;
}

//Get rover direction
function getRoverDir(pRover){
  return pRover['direction'];
}

//Get rover position
function getRoverPos(pRover){
  return pRover['position'];
}

//Check obstacle
function checkObstacleInPos(columna, fila){
  return obstacles[fila][columna] === 1 ? true : false ;
}

function checkRoverInPos(posibleX, posibleY){
  var returnCheck = false;
  switch(activeRover.roverName){
    case 'A':
      if (roverB.position.posX == posibleX && roverB.position.posY == posibleY){
        returnCheck = true
      }
      break;
    case 'B':
      if (roverA.position.posX == posibleX && roverA.position.posY == posibleY){
        returnCheck = true
      }
      break;
    default:
      break;
  }
  return returnCheck;
}

//Check if movement is allowed
function checkLimits(pRover, driveDirection){
  var checkResult = true;
  var actualDir = getRoverDir(pRover);
  var actualPos = getRoverPos(pRover);  
  var actualX = actualPos['posX'];
  var actualY = actualPos['posY'];
  var posibleY = 0;
  var posibleX = 0;
  let movement = {allowed : false,
                  message : "" };
  var checkLimits = false;
  var checkObstacle = false;
  var checkOtherRovers = false;
  if(actualDir === 'N' && driveDirection === 'f'){
    posibleX = actualX;
    posibleY = actualY - 1;
  }
  if(actualDir === 'N' && driveDirection === 'b'){
    posibleX = actualX;
    posibleY = actualY + 1;
  }
  if(actualDir === 'S' && driveDirection === 'f'){
    posibleX = actualX;
    posibleY = actualY + 1;
  }
  if(actualDir === 'S' && driveDirection === 'b'){
    posibleX = actualX;
    posibleY = actualY - 1;
  }
  if(actualDir === 'E' && driveDirection === 'f'){
    posibleY = actualY;
    posibleX = actualX + 1;
  }
  if(actualDir === 'E' && driveDirection === 'b'){
    posibleY = actualY;
    posibleX = actualX - 1;
  }  
  if(actualDir === 'W' && driveDirection === 'f'){
    posibleY = actualY;
    posibleX = actualX - 1;
  }
  if(actualDir === 'W' && driveDirection === 'b'){
    posibleY = actualY;
    posibleX = actualX + 1;
  }  
  outputDebug('CHECK POS');
  outputDebug('X:' + actualX);
  outputDebug('Y:' + actualY);
  outputDebug('Posible X:' + posibleX);
  outputDebug('Posible Y:' + posibleY);

  inLimits = (posibleY <= maxY && posibleY >= 0) && (posibleX <= maxX && posibleX >= 0);
  //If new position is out of limits obstacles are not checked
  checkObstacle = inLimits ? checkObstacleInPos(posibleX, posibleY) : false ;
  checkOtherRovers = inLimits ? checkRoverInPos(posibleX, posibleY) : false ;
  movement.allowed = (inLimits && !checkObstacle && !checkOtherRovers);

  if(!inLimits){
    movement.message = "Out of board!";
  }else if (checkObstacle) {
    movement.message = "Obstacle in the way!\nCoords:" + posibleX + ',' + posibleY;
  }else if(checkOtherRovers){
    movement.message = "Other rover in the way!\nCoords:" + posibleX + ',' + posibleY;
  }else{
    movement.message = "OK";
  }
  outputDebug('Chequeo movement');
  outputDebug(inLimits);
  outputDebug(checkObstacle);
  outputDebug(movement);
  return (movement);
}

function updatePos(pRover, driveDirection){
  var actualDir = getRoverDir(pRover);
  var actualPos = getRoverPos(pRover);  
  actualX = actualPos['posX'];
  actualY = actualPos['posY'];
  if(actualDir === 'N' && driveDirection === 'f'){
    actualY = actualY - 1;
  }
  if(actualDir === 'S' && driveDirection === 'f'){
    actualY = actualY + 1;
  }
  if(actualDir === 'E' && driveDirection === 'f'){
    actualX = actualX + 1;
  }
  if(actualDir === 'W' && driveDirection === 'f'){
    actualX = actualX - 1;
  }  

  if(actualDir === 'N' && driveDirection === 'b'){
    actualY = actualY + 1;
  }
  if(actualDir === 'S' && driveDirection === 'b'){
    actualY = actualY - 1;
  }
  if(actualDir === 'E' && driveDirection === 'b'){
    actualX = actualX - 1;
  }
  if(actualDir === 'W' && driveDirection === 'b'){
    actualX = actualX + 1;
  }  
  actualPos['posX'] = actualX;
  actualPos['posY'] = actualY;
  
}

//Get a new direction based on movement and actual direction
function returnNewDir(pRover , turnDir ){
  var actualDir = getRoverDir(pRover);
  var options = changeDir[actualDir];
  return options[turnDir.toUpperCase()];
}

//Process a sequence of commands 
function commandSequence(commandString){
  for (let index = 0; index < commandString.length; index++) {
    let element = commandString[index].toLowerCase();
    outputDebug(element);
    if(element in availableCommands){
      let movement = window[availableCommands[element]](activeRover);
      if(!movement.allowed){
        console.log(movement.message);
        break;
      }
      outputDebug('-------');
    } 
  }
  outputDebug(activeRover.travelLog);
  printPath(activeRover);
}

function printPath(rover){
  console.log('Rover ' + rover.roverName + ' looking to ' + rover.direction +'\nRover path.');
  var prevCoord = [-1,-1];
  for(let index = 0; index < rover.travelLog.length; index++){
    let newCoord = rover.travelLog[index][1];   
    if( prevCoord[0] != newCoord[0] || prevCoord[1] != newCoord[1]) {
      console.log(newCoord);
    }    
    prevCoord = newCoord;    
  }
}