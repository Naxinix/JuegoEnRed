Project.levelState = function(game) {

}

//tamaño del mundo
var worldsize = [3000,3000];
//factores de conversion entre las coordenadas del mundo y las del minimapa
factorX = worldsize[0]/128;
factorY = worldsize[1]/128;

//variables relativas a las ultis
var counter = 0;
var text = 0;
var ultCharged = false;
var ultiTime = 0;
var ultused = false;

//variable que contendrá el tipo de clase seleccionada
var clase = 0;

//variables relativas a la habilidad graviton del Strategist
var grav;
var gravActive = false;
var isTrapped = false;
var trapTime = 0;

//Arrays de objetos que aparecerán por el mapa
var polvo = new Array(50);
var bh = new Array(10);
var posbh = new Array(10);
var bomb = new Array(10);

//variables auxiliares
var i = 0;
var auxPE = 0;
var auxBH = 0;
var auxLS = 0;

//variables de gestion del power-up de speedBoost
var speedBoostOn = false;
var speedCD = 0;

//variable para controlar el giro de la nave loot
var lootShipDir = 0;

///////////////////////////////////////TIPOS ORGANIZADOS EN CLASES//////////////////////////////////////////////
function Disrupter(){
   //propiedades
   this.maxSpeed = 300;
   this.drag = 300;//rozamiento
   this.maxHealth = 200;
   this.health = 200;
   this.sprite = 'disrupter';
   this.damage = 10; //daño que inflinge cada bala

   //bullets
   this.weapon = game.add.weapon(60, 'bullet');
   this.weapon.bulletSpeed = 1000;
   this.weapon.fireRate = 30;
   this.weapon.bulletAngleVariance = 10; //dispersion

   //METODOS
   this.Ultimate = disrupterUltimate;
   this.UltTime = disrupterTime; //tiempo de uso de la ulti
}

function Assault(){
   //propiedades
   this.maxSpeed = 200;
   this.drag = 100; 
   this.maxHealth = 200;
   this.health = 200;
   this.sprite = 'assault';
   this.damage = 10;

   //bullets
   this.weapon = game.add.weapon(300, 'bullet');
   this.weapon.bulletSpeed = 3000;
   this.weapon.fireRate = 200;
   this.weapon.bulletAngleVariance = 3; //dispersion

   //METODOS
   this.Ultimate = assaultUltimate;
   this.UltTime = assaultTime; //tiempo de uso de la ulti
}

function Strategist(){
   //propiedades
   this.maxSpeed = 200;
   this.drag = 100;
   this.maxHealth = 200;
   this.health = 200;
   this.sprite = 'strategist';
   this.damage = 20;

   //bullets
   this.weapon = game.add.weapon(5, 'bullet');
   this.weapon.bulletSpeed = 1000;
   this.weapon.fireRate = 0;
   this.weapon.bulletAngleVariance = 5; //dispersion

   //METODOS
   this.Ultimate = strategistUltimate;
   this.UltTime = strategistTime; //tiempo de uso de la ulti
}

function NaveLoot(){
   //propiedades
   this.maxSpeed = 100;
   this.drag = 100;
   this.maxHealth = 1000;
   this.health = 1000;
   this.sprite = 'lootShip';

   //METODOS
   this.DMG = recieveDMG;
}

//FUNCION DE GESTION DE DAÑO RECIBIDO
function recieveDMG(damageValue){
   this.health -= damageValue;
   if(this.maxHealth > 200 && this.sprite == 'disrupter') this.maxHealth = this.health; //tiene sentido comparar con el sprite, porque habrá un sprite distinto para cada nave
}

//Establece una trampa gravitón en el centro del mundo (STRATEGIST)
function setGrav(){
   if(next>game.time.now){return;}
   area2 = game.add.sprite(game.world.centerX-250,game.world.centerY-250,'area2'); //area2 es el rango de acción del graviton
   game.world.sendToBack(area2);
   game.physics.enable(area2, Phaser.Physics.ARCADE); 
   grav = game.add.sprite(game.world.centerX,game.world.centerY,'graviton'); //grav es el sprite del graviton

next = game.time.now+1000; ¨// delay de 1 segundo por cada graviton, evitando asi poner infinitos
   gravActive = true;
}

//Permite destruir la trampa establecida
function killGrav(){
   grav.destroy();
   area2.destroy();
   gravActive = false;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////ULTIS DE CADA CLASE//////////////////////////////////////////////////////////



//Ultimate de disrupter
function disrupterUltimate(){
   this.maxHealth = 400;
   this.health = 400;
   //text2.setText('Health:'+this.health+'/'+this.maxHealth);
   this.maxSpeed=600;
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
           counter=0;
       } else{
           clase.maxSpeed=300;
           //text3.setText('Speed:'+clase.maxSpeed);

           ultused=false;
           ultCharged = false;
       }
   }
}






//Ultimate de assault
function assaultUltimate(){
   game.add.tween(spaceship).to( { angle: 1000 }, 3500, Phaser.Easing.Linear.None, true); //Rota el sprite
   clase.weapon.trackSprite(spaceship, 0, 0, true);
   clase.weapon.autofire=true; //dispara solo
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
           counter=0;
       }else{
           clase.weapon.autofire=false;
           clase.weapon.bulletSpeed = 3000;
           clase.weapon.fireRate = 120;
           ultused=false;
           ultCharged = false;
       }
   }
}

//Ultimate de strategist
function strategistUltimate(){
//Circulo interior y exterior. Las bombas se disponen formando dos circunferencias.
   //circulo interior
   bomb[0] = game.add.sprite(spaceship.x-spaceship.offsetX+100,spaceship.y-spaceship.offsetY+75,'bomb');
   bomb[1] = game.add.sprite(spaceship.x-spaceship.offsetX-100,spaceship.y-spaceship.offsetY+75,'bomb');
   bomb[2] = game.add.sprite(spaceship.x-spaceship.offsetX,spaceship.y-spaceship.offsetY-100,'bomb');
   //circulo exterior
   bomb[3] = game.add.sprite(spaceship.x-spaceship.offsetX+200,spaceship.y-spaceship.offsetY-175,'bomb');
   bomb[4] = game.add.sprite(spaceship.x-spaceship.offsetX-200,spaceship.y-spaceship.offsetY-175,'bomb');
   bomb[5] = game.add.sprite(spaceship.x-spaceship.offsetX,spaceship.y-spaceship.offsetY+200,'bomb');
   bomb[6] = game.add.sprite(spaceship.x-spaceship.offsetX+200,spaceship.y-spaceship.offsetY+175,'bomb');
   bomb[7] = game.add.sprite(spaceship.x-spaceship.offsetX-200,spaceship.y-spaceship.offsetY+175,'bomb');
   bomb[8] = game.add.sprite(spaceship.x-spaceship.offsetX,spaceship.y-spaceship.offsetY-200,'bomb');
   bomb[9] = game.add.sprite(spaceship.x-spaceship.offsetX+200,spaceship.y-spaceship.offsetY,'bomb');
   bomb[10] = game.add.sprite(spaceship.x-spaceship.offsetX-200,spaceship.y-spaceship.offsetY,'bomb');

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

//Gestiona el efecto de una trampa deployeada y el tiempo que un jugador esta atrapado en ella
function trap(){
   if(isTrapped){
       if(trapTime<6){
           clase.maxSpeed = 0;
           trapTime++;
       }else{
           area2.destroy();
           grav.destroy();
           gravActive = false;
           isTrapped = false;
           trapTime = 0;
           clase.maxSpeed = clase.resetSpeed;
       }
   }
}


//FUNCION DE GESTION DE ULTIMATES
//El loop llama a esta función cada segundo y va incrementando el contador de ulti. Cuando llega a 100, para de contar y pone la variable de ultimate cargada a verdadero.
function updateUltimate(){
   if(counter<99){
       counter++;
       ulti1.height=counter;
       text.setText(counter+'%');
   }
   else{
       ulti1.height=100;
       text.setText('Q');
       game.world.bringToTop(text);
       ultCharged = true;
   }
}


function polvoEstelar(){
//bucle para hacer el polvo estelar visible
   if(auxPE<5){
       auxPE++;
   }else{
       for(i1=0;i1<50;i1++){
           polvo[i1].visible = true;
       }
       auxPE = 0;
   }
}

function counterBH(){
//bucle para hacer los agujeros negros visibles, asi como su posicion en el minimapa
   if(auxBH<10){
       auxBH++;
   }else{
       if (i<10){
           bh[i].visible = true;
           i++;
       }
       posbh[i-1].visible = true;
       game.world.bringToTop(posbh[i-1]);
  
       auxBH = 0;
   }
}

function createLootShip(){
//se modifica la direccion de la nave loot en un valor aleatorio entre -0.01 y 0.01
   lootShipDir = ((game.rnd.frac())*2 - 1)/100;
   if(claseLoot == null){
//bucle que espera 10 segundos y crea una nave Loot en una posicion random del mundo
       if(auxLS<10){
           auxLS++;
       }else{
           claseLoot = new NaveLoot();

           a2=Math.floor(Math.random()*(worldsize[0]-200));//margen de 200 pixeles para evitar que se generen en el borde del mundo
           b2=Math.floor(Math.random()*(worldsize[1]-200));
//sprite vacio para evitar que la barra de vida de la nave gire junto a la misma. lootShipParent contiene a lootShip(el sprite que se visualiza y gira) y la barra de vida.
           lootShipParent = game.add.sprite(a2, b2, null);
           lootShip = game.add.sprite(0, 0, claseLoot.sprite);

           idle3 = lootShip.animations.add('idle3');
           lootShip.animations.play('idle3', 10, true);

           lootShipParent.addChild(lootShip);

           //barra de vida lootShip TODO ESTO DEBERIA ESTAR EN UN CONSTRUCTOR DE NaveLoot
           lootlf2 = game.add.sprite(-100,-100,'lf2');
           lootlf1 = game.add.sprite(-100,-100,'lf1');
           lootlf1.width = claseLoot.health/5;
           lootlf2.scale.setTo(1,0.2);
           lootlf1.scale.setTo(1,0.2);

           lootShipParent.addChild(lootlf2);
           lootShipParent.addChild(lootlf1);
          
           game.physics.enable(lootShip, Phaser.Physics.ARCADE);
           game.physics.enable(lootShipParent, Phaser.Physics.ARCADE);

           lootShip.body.setSize(64,64, 64, 32);
           lootShip.anchor.setTo(0.5,0.5);
           lootShipParent.body.immovable = true;
           lootShip.body.immovable = true;
           lootShipParent.body.collideWorldBounds=true;

           auxLS=0;
       }
   }
}

function chargePU(){
   if(!ultused && clase.powerUp[0]===true){
       counter = 100;
       clase.powerUp[0] = false;

       chargePUsprite.loadTexture('chargePU', 0);
   }
}   

function speedBoostPU(){
   if(clase.powerUp[1]===true){
       clase.maxSpeed = 600;
       speedBoostOn = true;
       clase.powerUp[1] = false;

       speedBoostPUsprite.loadTexture('speedBoostPU', 0);
   }
}

function speedBoostTime(){
   if(speedBoostOn) if(speedCD < 3){
       speedCD++;
   }else{
       clase.maxSpeed = 300;
       speedCD = 0;
   }
}

Project.levelState.prototype = {

   preload: function() {
      
   },

   create: function() {

       game.add.tileSprite(0, 0, worldsize[0], worldsize[1], 'background');
       game.world.setBounds(0, 0, worldsize[0], worldsize[1]);

       //clase es el tipo de nave
       clase = null;
       switch(classSelected){
           case 1:
           clase = new Disrupter();
           break;
           case 2:
           clase = new Assault();
           break;
           case 3:
           clase = new Strategist();
           break;
       }


       //LOOPS
       //loop de aparicion de polvo estelar
       game.time.events.loop(Phaser.Timer.SECOND, polvoEstelar, this);
       //loop de aparicion de agujeros negros
       game.time.events.loop(Phaser.Timer.SECOND, counterBH, this);
       //loop de aparicion de naves loot
       game.time.events.loop(Phaser.Timer.SECOND, createLootShip, this);
       //loops de la gestion de ultimates
       game.time.events.loop(Phaser.Timer.SECOND, updateUltimate, this);
       game.time.events.loop(Phaser.Timer.SECOND, clase.UltTime, this);
       game.time.events.loop(Phaser.Timer.SECOND, speedBoostTime, this);
       //loop para gestion de trampa Strategist
       game.time.events.loop(Phaser.Timer.HALF, trap, this);

       counter = 0;
       //texto ultis
       text = game.add.text(360, 485,  '0%',
       { font: "24px Arial", fill: "#808080", align: "center" });
       text.fixedToCamera = true;
       game.world.bringToTop(text);

       polvoSprite = new Array(3);
       polvoSprite = ['polvoEstelarAzul','polvoEstelarVerde','polvoEstelarAmarillo'];

       for(o=0;o<50;o++){
           a3=Math.floor(Math.random()*(worldsize[0]-100));
           b3=Math.floor(Math.random()*(worldsize[1]-100));
           polvo[o]=game.add.sprite(a3,b3,polvoSprite[game.rnd.between(0,2)]);
           game.world.sendToBack(polvo[o]);
           game.world.moveUp(polvo[o]);
           game.physics.enable(polvo[o], Phaser.Physics.ARCADE);
           polvo[o].visible=false;
       }

       for(m=0;m<10;m++){
           a=Math.floor(Math.random()*(worldsize[0]-300));
           b=Math.floor(Math.random()*(worldsize[1]-300));
           bh[m] = game.add.sprite(a,b,'blackhole');
           game.world.sendToBack(bh[m]);
           game.world.moveUp(bh[m]);
           game.physics.enable(bh[m], Phaser.Physics.ARCADE);
           bh[m].visible=false;
           bh[m].anchor.setTo(0.5,0.5);
           bh[m].body.setCircle(120);//colision circular

           posbh[m] = game.add.sprite(600+((bh[m].position.x-bh[m].offsetX)/factorX),50+((bh[m].position.y-bh[m].offsetY)/factorY),'blackhole2');
           posbh[m].fixedToCamera = true;
           posbh[m].visible = false;
       }

       //añadimos la barra de vida
       lf2 = game.add.sprite(50,500,'lf2');
       lf1 = game.add.sprite(52.5,502.5,'lf1');
       lf2.fixedToCamera = true;
       lf1.fixedToCamera = true;
       //Como la barra es de 200 pixeles y tienen 200 de vida, el ancho de la barra es la vida que les queda
       lf1.width = clase.health;

       //añadimos la barra de ulti
       ulti1 = game.add.sprite(450,550,'ultimate');
       ulti1.height=0;
       ulti1.anchor.setTo(1,1);
       ulti2 = game.add.sprite(300,450,'mark');
       ulti1.fixedToCamera = true;
       ulti2.fixedToCamera = true;
      
       //añadimos los iconos de powerUps
       textPU1 = game.add.text(610, 475,'NUM1',
       { font: "15px Arial", fill: "#808080", align: "center" });
       chargePUsprite = game.add.sprite(600,500,'chargePU');
       textPU1.fixedToCamera = true;
       chargePUsprite.fixedToCamera = true;

       textPU2 = game.add.text(710, 475,'NUM2',
       { font: "15px Arial", fill: "#808080", align: "center" });
       speedBoostPUsprite = game.add.sprite(700,500,'speedBoostPU');
       textPU2.fixedToCamera = true;
       speedBoostPUsprite.fixedToCamera = true;

       //spaceship es el body, la nave generica
       spaceship = game.add.sprite(400, 300, clase.sprite);
       idle = spaceship.animations.add('idle');
       spaceship.animations.play('idle', 10, true);

       //propiedades comunes a las 3 naves
       clase.weapon.trackSprite(spaceship, 0, 0);
       clase.weapon.bulletAngleOffset = game.physics.arcade.angleToPointer(spaceship) + 90;
       clase.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
       clase.weapon.bulletLifespan = 900;
       clase.fireButton = game.input.activePointer.leftButton;

       clase.DMG = recieveDMG;
       clase.powerUp = new Array(5);
       clase.resetSpeed = 200;


       //DUMMY (SOLO USADO COMO BOT PARA PRUEBAS OFFLINE)
       claseDummy = new Assault();

       spaceship2Parent = game.add.sprite(800, 300, null);
       spaceship2 = game.add.sprite(0, 0, claseDummy.sprite);
       idle2 = spaceship2.animations.add('idle2');
       spaceship2.animations.play('idle2', 10, true);

       spaceship2Parent.addChild(spaceship2);

       claseDummy.weapon.trackSprite(spaceship2, 0, 0);
       claseDummy.weapon.bulletAngleOffset = game.physics.arcade.angleToPointer(spaceship2) + 90;
       claseDummy.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
       claseDummy.weapon.bulletLifespan = 200; //modificamos el bulletLifespan de las balas del dummy para que las pruebas sean menos molestas
       claseDummy.weapon.autofire = true;

       claseDummy.DMG = recieveDMG;
       claseDummy.damage = 2; //modificamos el daño del dummy para que las pruebas sean menos molestas

       //barra de vida enemigo TODO ESTO DEBERIA ESTAR EN UN CONSTRUCTOR DE Assault/Disrupter/Strategist
       enemylf2 = game.add.sprite(-100,-50,'lf2');
       enemylf1 = game.add.sprite(-100,-50,'lf1');
       enemylf1.width = claseDummy.health;
       enemylf2.scale.setTo(1,0.2);
       enemylf1.scale.setTo(1,0.2);

       spaceship2Parent.addChild(enemylf2);
       spaceship2Parent.addChild(enemylf1);

       //NAVE LOOT
       claseLoot = null;
       lootShipParent = game.add.sprite(0, 0, null);
       lootShip = game.add.sprite(0, 0, null);

       //grav
       area = game.add.sprite(0, 0, null);
       area2 = game.add.sprite(0, 0, null);

       //Fisicas
       game.physics.enable(spaceship, Phaser.Physics.ARCADE);
       game.physics.enable(spaceship2, Phaser.Physics.ARCADE);
      
       spaceship.body.setSize(80,44, 10, 10);
       spaceship2.body.setSize(80,44, 10, 10);

       spaceship.body.immovable = true;
       spaceship2.body.immovable = true;

       spaceship.anchor.setTo(0.5,0.5);
       spaceship2.anchor.setTo(0.5,0.5);

       game.camera.follow(spaceship);
       spaceship.body.collideWorldBounds=true;
       spaceship2.body.collideWorldBounds=true;

       //MINIMAPA
       minimap = game.add.sprite(600,50,'minimap');
       minimap.fixedToCamera = true;

       //Valores en pantalla (provisionales, para pruebas)
       //text2 = game.add.text(0, 0, 'Health:'+clase.health+'/'+clase.maxHealth,
       //{ font: "24px Arial", fill: "#ffffff", align: "center" });
       //text2.fixedToCamera = true;

       //text3 = game.add.text(0, 20, 'Speed:'+clase.maxSpeed,
       //{ font: "24px Arial", fill: "#ffffff", align: "center" });
       //text3.fixedToCamera = true;
   },

   update: function() {
       //organizacion por capas de los sprites para evitar que ciertos elementos de la interfaz se solapen
       game.world.bringToTop(ulti1);
       game.world.bringToTop(ulti2);
       game.world.bringToTop(text);
       //game.world.bringToTop(text2);
       //game.world.bringToTop(text3);
       game.world.bringToTop(lf2);
       game.world.bringToTop(lf1);
       game.world.bringToTop(speedBoostPUsprite);
       game.world.bringToTop(chargePUsprite);

       //actualizar posicion lootShip en minimapa
       if(claseLoot != null){
           posls = game.add.sprite(600+((lootShipParent.x-lootShip.offsetX)/factorX),50+((lootShipParent.y-lootShip.offsetY)/factorY),'lootShipIcon');
           posls.fixedToCamera = true;
           posls.lifespan = 0.1;
       }

       //actualizar posicion en minimapa
       position = game.add.sprite(600+((spaceship.body.position.x)/factorX),50+((spaceship.body.position.y)/factorY),'position');
       position.fixedToCamera = true;
       position.lifespan = 0.1;

       //Rotacion y aceleracion de la naves
       spaceship.rotation = game.physics.arcade.angleToPointer(spaceship);
       spaceship2.rotation = game.physics.arcade.angleBetween(spaceship2Parent, spaceship);
       lootShip.rotation += lootShipDir;
    
       spaceship.body.acceleration.x = 0;
       spaceship.body.acceleration.y = 0;
      
       spaceship.body.angularVelocity = 0;

       //pasamos los valores de la clase al body de la nave
       spaceship.body.maxVelocity.x = clase.maxSpeed;
       spaceship.body.maxVelocity.y = clase.maxSpeed;
       spaceship.body.drag.x = clase.drag;
       spaceship.body.drag.y = clase.drag;

       //movimiento nave loot
       if(claseLoot != null){
           lootShipParent.body.acceleration.x = claseLoot.maxSpeed*Math.cos(lootShip.rotation);
           lootShipParent.body.acceleration.y = claseLoot.maxSpeed*Math.sin(lootShip.rotation);
       }
      
       //representacion visual de la salud del jugador y gestion de la muerte del mismo
       if(clase.health > 0)
       {
           lf2.width = clase.maxHealth;
           lf1.width = clase.health;
       } else
       {
           lf1.width = 0;
           this.listener();
       }

       //representacion visual de la salud del dummy y gestion de la muerte del mismo
       if(claseDummy != null) if(claseDummy.health > 0)
       {
           enemylf2.width = claseDummy.maxHealth;
           enemylf1.width = claseDummy.health;
       } else
       {
           enemylf1.width = 0;
           spaceship2Parent.destroy();
           claseDummy.weapon.destroy();
           claseDummy = null;
       }

       //representacion visual de la salud de la nave loot y gestion de la muerte de la misma
       if(claseLoot != null) if(claseLoot.health > 0)
       {
           lootlf2.width = claseLoot.maxHealth/5;
           lootlf1.width = claseLoot.health/5;
       } else
       {
           lootlf1.width = 0;
           lootShipParent.kill();
           lootShip.kill();
           claseLoot = null;
           auxRnd = game.rnd.between(0,1);
           clase.powerUp[auxRnd] = true;
           if(auxRnd == 0){
               chargePUsprite.loadTexture('chargePUOn', 0);
           } else if(auxRnd == 1){
               speedBoostPUsprite.loadTexture('speedBoostPUOn', 0);
           }
       }

       //animacion blackholes
       for(m2=0;m2<10;m2++){
           bh[m2].rotation += 0.01;
       }

       //COLISIONES
       game.physics.arcade.collide(spaceship2, clase.weapon.bullets, function(enemy, bullet){ bullet.kill(); claseDummy.DMG(clase.damage);});
       if(claseDummy != null) game.physics.arcade.collide(spaceship, claseDummy.weapon.bullets, function(enemy, bullet){ bullet.kill(); clase.DMG(claseDummy.damage);});
       if(claseLoot != null) game.physics.arcade.collide(lootShip, clase.weapon.bullets, function(enemy, bullet){ bullet.kill(); claseLoot.DMG(clase.damage);});

       if(clase.health <= clase.maxHealth) for(j=0; j<50; j++){
           game.physics.arcade.overlap(spaceship,polvo[j],function(){if(polvo[j].visible==true){polvo[j].visible = false; clase.DMG(-5);}});
       }

       for(j=0; j<10; j++){
           game.physics.arcade.overlap(spaceship,bh[j],function(){if(bh[j].visible==true)clase.DMG(1);});
       }

       for(j=0; j<10; j++){
           bomba = bomb[j];
           game.physics.arcade.collide(spaceship,bomb[j],function(){bomb[j].kill(); clase.DMG(100);});
       }

       game.physics.arcade.overlap(spaceship,area2,function(){isTrapped=true; game.world.moveUp(area2);});

       //controles
       if (game.input.keyboard.isDown(Phaser.Keyboard.S))//movimiento
       {
           spaceship.body.acceleration.y=clase.maxSpeed;//
       }
       if (game.input.keyboard.isDown(Phaser.Keyboard.W))//
       {
           spaceship.body.acceleration.y=-clase.maxSpeed;//
       }
       if (game.input.keyboard.isDown(Phaser.Keyboard.A))//
       {
           spaceship.body.acceleration.x=-clase.maxSpeed;//
       }
       if (game.input.keyboard.isDown(Phaser.Keyboard.D))//
       {
           spaceship.body.acceleration.x=clase.maxSpeed;//
       }
       if (game.input.keyboard.isDown(Phaser.Keyboard.Q))//ulti
       {
           if(ultCharged){
               ultCharged = 0;
               counter = 0;
               ultiTime = 0;
               ultused = true;
               clase.Ultimate();
           }
       }
       if (clase.fireButton.isDown)//disparo
       {
           clase.weapon.fireAtPointer();

           //Disparo de escopeta para strategist
           if(classSelected == 3)
           {
               for(var i = 0; i < 9; i++)
               {
                   clase.weapon.fireAtPointer();
               }
           }
       }
       if (game.input.keyboard.isDown(Phaser.Keyboard.ONE))
       {
           chargePU();
       }
       if (game.input.keyboard.isDown(Phaser.Keyboard.TWO))
       {
           speedBoostPU();
       }
       if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && classSelected == 3)
       {
           if(gravActive==false)
               setGrav();
       }
       if (game.input.keyboard.isDown(Phaser.Keyboard.G) && classSelected == 3)
       {
           if(gravActive=true)
           killGrav();
       }

       //disparo automático del dummy (provisional)
       if(claseDummy != null) claseDummy.weapon.fireAtSprite(spaceship);
   },

   //debug de las balas para pruebas
   render: function(){
       /*clase.weapon.debug();

       game.debug.body(spaceship);
       game.debug.body(spaceship2);
       game.debug.body(lootShip);*/
   },

   listener: function(){
       this.state.start('endingState');
   }
}


