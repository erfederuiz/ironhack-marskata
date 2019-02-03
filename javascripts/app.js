// Rover Object Goes Here
// ======================
var roverSpecs = {
  direction : 'N',
  position : {
    posX : 0,
    posY : 0
  },
  travelLog : []
}

var modeDebug = true;

const changeDir = {
  N : {
    L : "E",
    R : "W"
  },
  S : {
    L : "W",
    R : "E"
  },
  E : {
    L : "S",
    R : "N"
  },
  W : {
    L : "N",
    R : "S"
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

function debugSw(){
  modeDebug = !modeDebug;
}

function turnLeft(rover){
  outputDebug("turnLeft was called!");
  outputDebug(rover);
  var actualDir = getRoverDir(rover);
  outputDebug('Actual dir : ' + actualDir);
  var newDir = returnNewDir(rover , 'l' )
  outputDebug('New dir : ' + newDir);
  updateDir(rover, newDir);
}

function turnRight(rover){
  outputDebug("turnRight was called!");
  outputDebug(rover);
  var actualDir = getRoverDir(rover);
  outputDebug('Actual dir : ' + actualDir);
  var newDir = returnNewDir(rover , 'r' )
  outputDebug('New dir : ' + newDir);
  updateDir(rover, newDir);
}

function updateDir(pRover, newDir){
  pRover.direction = newDir;
}

function moveForward(rover){
  outputDebug("moveForward was called");
  outputDebug(rover);
  if(checkLimits(rover , 'f') === true){
    outputDebug('Actualizo POS');
    updatePos(rover , 'f');
  }else{
    outputDebug('Check Falso');
  }
}

function moveBackward(rover){
  outputDebug("moveBackward was called");
  outputDebug(rover);
  if(checkLimits(rover , 'b') === true){
    outputDebug('Actualizo POS');
    updatePos(rover , 'b');
  }else{
    outputDebug('Check Falso');
  }
}

function getRoverDir(pRover){
  return pRover['direction'];
}

function getRoverPos(pRover){
  return pRover['position'];
}

function checkLimits(pRover, driveDirection){
  var checkResult = true;
  var actualDir = getRoverDir(pRover);
  var actualPos = getRoverPos(pRover);  
  var actualX = actualPos['posX'];
  var actualY = actualPos['posY'];
  var posibleY = 0;
  var posibleX = 0;
  if(actualDir === 'N' && driveDirection === 'f'){
    posibleY = actualY - 1;
  }
  if(actualDir === 'N' && driveDirection === 'b'){
    posibleY = actualY + 1;
  }
  if(actualDir === 'S' && driveDirection === 'f'){
    posibleY = actualY + 1;
  }
  if(actualDir === 'S' && driveDirection === 'b'){
    posibleY = actualY - 1;
  }
  if(actualDir === 'E' && driveDirection === 'f'){
    posibleX = actualX + 1;
  }
  if(actualDir === 'E' && driveDirection === 'b'){
    posibleX = actualX - 1;
  }  
  if(actualDir === 'W' && driveDirection === 'f'){
    posibleX = actualX - 1;
  }
  if(actualDir === 'W' && driveDirection === 'b'){
    posibleX = actualX + 1;
  }  
  outputDebug('CHECK POS');
  outputDebug('X:' + actualX);
  outputDebug('Y:' + actualY);
  outputDebug('Posible X:' + posibleX);
  outputDebug('Posible Y:' + posibleY);
  return ((posibleY <= maxY && posibleY >= 0) && (posibleX <= maxX && posibleX >= 0));
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
  pRover.travelLog.push([pRover.position.posX, pRover.position.posY]);
}

function returnNewDir(pRover , turnDir ){
  var actualDir = getRoverDir(pRover);
  var options = changeDir[actualDir];
  return options[turnDir.toUpperCase()];
}

function commandSequence(commandString){
  for (let index = 0; index < commandString.length; index++) {
    const element = commandString[index];
    outputDebug(element);
    if(element in availableCommands){
      window[availableCommands[element]](roverSpecs);
    } 
  }
  console.log(roverSpecs.travelLog);
}