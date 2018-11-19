function createWorld(width,height,maxP) {
    //factores de conversion entre las coordenadas del mundo y las del minimapa
    factorX = width/128;
    factorY = height/128;

    //Array de jugadores conteniendo su indice y su clase
    players = new Array(maxP);
    isLobbyFull = false;
    
    //Arrays de objetos que aparecerán por el mapa
    polvo = new Array(50);
    bh = new Array(10);
    posbh = new Array(10);

    //variables auxiliares
    i = 0;
    auxPE = 0;
    auxBH = 0;
    auxLS = 0;

    game.add.tileSprite(0, 0, width, height, 'background');
    game.world.setBounds(0, 0, width, height);
}

//Objeto jugador para almacenar los integrantes de la partida
class Player{
    constructor(index,pClass){
        this.i = index;
        this.c = pClass;
    }
}

//creacion de todo el polvo estelar, pero invisible aun
function createPolvoEstelar(){
    polvoSprite = new Array(3);
    polvoSprite = ['polvoEstelarAzul','polvoEstelarVerde','polvoEstelarAmarillo'];

    for(o=0;o<50;o++){
        a3=Math.floor(Math.random()*(worldsize[0]-100));
        b3=Math.floor(Math.random()*(worldsize[1]-100));
        //se añade un sprite aleatorio entre los 3 disponibles
        polvo[o]=game.add.sprite(a3,b3,polvoSprite[game.rnd.between(0,2)]);
        game.world.sendToBack(polvo[o]);
        game.world.moveUp(polvo[o]);
        game.physics.enable(polvo[o], Phaser.Physics.ARCADE);
        //se inicializan todos invisibles y luego se hacen visibles con el loop.
        polvo[o].visible = false;
    }
}

function counterPE(){
    //bucle para hacer el polvo estelar visible en cada iteracion (cada 5 segundos)
    if(auxPE<5){
        auxPE++;
    }else{
        for(i1=0;i1<50;i1++){
            polvo[i1].visible = true;
        }
        auxPE = 0;
    }
}

function updatePolvoEstelar(playerClass, playerIndex){
    //Overlap y efecto con polvo estelar (aumento de 5 puntos de vida), con restricción para no poder coger mas si vas full de vida
    if(playerClass.health <= playerClass.maxHealth) for(j=0; j<50; j++){
        game.physics.arcade.overlap(spaceshipParent[playerIndex],polvo[j],function(){if(polvo[j].visible==true){polvo[j].visible = false; playerClass.DMG(-5);}});
    }
}
//creacion de los todos los agujeros negros, pero invisibles aun
function createBlackHole(){
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
    
        //se añade el sprite en la posicion del agujero negro dividida entre un factor para que entre en las coordenadas del minimapa. Luego se le suma 600 en X y 50 en Y para situarlo en la posicion del minimapa (esquina superior derecha de la pantalla de juego)
        posbh[m] = game.add.sprite(600+((bh[m].position.x-bh[m].offsetX)/factorX),50+((bh[m].position.y-bh[m].offsetY)/factorY),'blackhole2');
        posbh[m].fixedToCamera = true;
        posbh[m].visible = false;
    }
}

function counterBH(){
    //Bucle para hacer los agujeros negros visibles en cada iteracion (cada 10 segundos), asi como su posicion en el minimapa
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

function updateBlackholes(playerClass, playerIndex){
    //animacion blackholes
    for(m2=0;m2<10;m2++){
        bh[m2].rotation += 0.01;
    }

    //Overlap y efecto con agujeros negros (-1 punto de vida mientras estes encima de uno), con restricción para que no te hagan daño si no están visibles
    for(j=0; j<10; j++){
        game.physics.arcade.overlap(spaceshipParent[playerIndex],bh[j],function(){if(bh[j].visible==true)playerClass.DMG(1);});
    }
}

function updateWorld(playerClass, playerIndex){
    updateBlackholes(playerClass, playerIndex);
    updatePolvoEstelar(playerClass, playerIndex);
}

//no funcionan
function collisions(shotIndex, shooterIndex){
    shotSprite = spaceshipParent[shotIndex];
    shotClass = players[shotIndex].c;
    shooterClass = players[shooterIndex].c;

    game.physics.arcade.collide(shotSprite, shooterClass.weapon.bullets, function(enemy, bullet){ bullet.kill(); shotClass.DMG(shooterClass.damage);});
}