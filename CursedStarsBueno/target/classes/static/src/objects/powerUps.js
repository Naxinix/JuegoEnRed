function initPowerUps(){
    //variables de gestion del power-up de speedBoost
    speedBoostOn = false;
    speedCD = 0;
}

//Este powerUp hace que la carga de ultimate sea = 100
function chargePU(){
    if(!ultused && clase.powerUp[0]===true){
        counter = 100;
        clase.powerUp[0] = false;

        chargePUsprite.loadTexture('chargePU', 0);
    }
}   

//este powerUp hace que la velocidad máxima aumente a 600
function speedBoostPU(){
    if(clase.powerUp[1]===true){
        clase.maxSpeed = 600;
        speedBoostOn = true;
        clase.powerUp[1] = false;

        speedBoostPUsprite.loadTexture('speedBoostPU', 0);
    }
}

//cuando pasan 3 segundos con el powerUp activo la velocidad vuelve a la normalidad
function speedBoostTime(){
    if(speedBoostOn) if(speedCD < 3){
        speedCD++;
    }else{
        clase.maxSpeed = clase.resetSpeed;
        speedCD = 0;
    }
}