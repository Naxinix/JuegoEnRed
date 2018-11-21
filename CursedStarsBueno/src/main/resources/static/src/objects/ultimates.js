function initUltimates(){
    //variables relativas a las ultis
    counter = 0; //contador de carga de ultimate. 0-100
    ultCharged = false;
    ultiTime = 0; //tiempo de duracion de la ulti
    ultused = false; //true si la ultimate ha sido usada. Se pone a false cuando ultTime llega a su máximo valor
    bomb = new Array(10); //array de sprites
}

//FUNCION DE GESTION DE ULTIMATES
//El loop llama a esta función cada segundo y va incrementando el contador de ulti. Cuando llega a 100, para de contar y pone la variable de ultimate cargada a verdadero.
function updateUltimate(){
    if(counter<99){
        counter++;
        ulti1.height = counter;
        text.setText(counter+'%');
    }
    else{
        ulti1.height=100;
        text.setText('Q');
        game.world.bringToTop(text);
        ultCharged = true;
    }
}

//Ultimate de disrupter
function disrupterUltimate(){
    this.maxHealth = 400;
    this.health = 400;
    //text2.setText('Health:'+this.health+'/'+this.maxHealth);
    this.maxSpeed = 600;
    //text3.setText('Speed:'+this.maxSpeed);
}

//Funcion que controla el tiempo que dura activa la ultimate de disrupter
function disrupterTime(){
    //Bloque if-else para que no se solapen el power-up de velocidad y la ultimate
    if(speedBoostOn){ 
        auxSpeedBoost = 3-speedCD;
    }else{
        auxSpeedBoost = 0;
    }
    //Cuando pasan 5 segundos le reestablece la velocidad normal y pone las variables de ultimate cargada y usada a falso
    if(ultused){
        if(ultiTime<5+auxSpeedBoost){
            ultiTime++;
            text.setText(ultiTime);
            counter = 0;
        } else{
            clase.maxSpeed = 300;
            //text3.setText('Speed:'+clase.maxSpeed);

            ultused=false;
            ultCharged = false;
        }
    }
}

//Ultimate de assault
function assaultUltimate(){
    game.add.tween(spaceship[0]).to( { angle: 1000 }, 3500, Phaser.Easing.Linear.None, true); //Rota el sprite
    clase.weapon.trackSprite(spaceship[0], 0, 0, true);
    clase.weapon.autofire = true; //dispara solo
    clase.weapon.bulletSpeed = 300;
    clase.weapon.fireRate = 1;
}
//Funcion que controla el tiempo que dura activa la ultimate de assault
function assaultTime(){
    //Cuando pasan 3 segundos reestablece los valores originales y deja de girar
    if(ultused){
        if(ultiTime<3){
            ultiTime++;
            text.setText(ultiTime);
            counter = 0;
        }else{
            clase.weapon.autofire = false;
            clase.weapon.bulletSpeed = 3000;
            clase.weapon.fireRate = 120;
            ultused= false;
            ultCharged = false;
        }
    }
}

//Ultimate de strategist
function strategistUltimate(){
    //Circulo interior y exterior. Las bombas se disponen formando dos circulos //concentricos.
    //circulo interior
    bomb[0] = game.add.sprite(spaceshipParent[0].x-spaceshipParent[0].offsetX+100,spaceshipParent[0].y-spaceshipParent[0].offsetY+75,'bomb');
    bomb[1] = game.add.sprite(spaceshipParent[0].x-spaceshipParent[0].offsetX-100,spaceshipParent[0].y-spaceshipParent[0].offsetY+75,'bomb');
    bomb[2] = game.add.sprite(spaceshipParent[0].x-spaceshipParent[0].offsetX,spaceshipParent[0].y-spaceshipParent[0].offsetY-100,'bomb');
    //circulo exterior
    bomb[3] = game.add.sprite(spaceshipParent[0].x-spaceshipParent[0].offsetX+200,spaceshipParent[0].y-spaceshipParent[0].offsetY-175,'bomb');
    bomb[4] = game.add.sprite(spaceshipParent[0].x-spaceshipParent[0].offsetX-200,spaceshipParent[0].y-spaceshipParent[0].offsetY-175,'bomb');
    bomb[5] = game.add.sprite(spaceshipParent[0].x-spaceshipParent[0].offsetX,spaceshipParent[0].y-spaceshipParent[0].offsetY+200,'bomb');
    bomb[6] = game.add.sprite(spaceshipParent[0].x-spaceshipParent[0].offsetX+200,spaceshipParent[0].y-spaceshipParent[0].offsetY+175,'bomb');
    bomb[7] = game.add.sprite(spaceshipParent[0].x-spaceshipParent[0].offsetX-200,spaceshipParent[0].y-spaceshipParent[0].offsetY+175,'bomb');
    bomb[8] = game.add.sprite(spaceshipParent[0].x-spaceshipParent[0].offsetX,spaceshipParent[0].y-spaceshipParent[0].offsetY-200,'bomb');
    bomb[9] = game.add.sprite(spaceshipParent[0].x-spaceshipParent[0].offsetX+200,spaceshipParent[0].y-spaceshipParent[0].offsetY,'bomb');
    bomb[10] = game.add.sprite(spaceshipParent[0].x-spaceshipParent[0].offsetX-200,spaceshipParent[0].y-spaceshipParent[0].offsetY,'bomb');

    for(n=0;n<10;n++){
        game.physics.enable(bomb[n], Phaser.Physics.ARCADE);
    }
    ultCharged = false;
}

//Añade delay para que no se solapen bombas al pulsar Q. 
function strategistTime(){
    if(ultused){
        if(ultiTime<2){
            ultiTime++;
            text.setText(ultiTime);
            counter = 0;
        }else{
            ultused = false;
            ultCharged = false;
        }
    }
}

function updateUltimates(playerClass,playerIndex){
    //Ulti de strategist -100 de vida al colisionar
    for(j=0; j<10; j++){
            
        game.physics.arcade.collide(spaceshipParent[playerIndex],bomb[j],function(){bomb[j].kill(); playerClass.DMG(100);});
    }
}