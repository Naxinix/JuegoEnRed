function initInterface(){
    //barra de vida
    lf2 = game.add.sprite(50,500,'lf2');
    lf1 = game.add.sprite(52.5,502.5,'lf1');
    lf2.fixedToCamera = true;
    lf1.fixedToCamera = true;
    //Como la barra es de 200 pixeles y tienen 200 de vida, el ancho de la barra es la vida que les queda
    lf1.width = clase.health;

    //porcentaje ulti
    text = game.add.text(360, 485,  '0%', { font: "24px Arial", fill: "#808080", align: "center" });
    text.fixedToCamera = true;
    game.world.bringToTop(text);

    //barra de ulti
    ulti1 = game.add.sprite(450,550,'ultimate');
    ulti1.height = 0;
    ulti1.anchor.setTo(1,1);
    ulti2 = game.add.sprite(300,450,'mark');
    ulti1.fixedToCamera = true;
    ulti2.fixedToCamera = true;
    
    //iconos de powerUps
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

    //MINIMAPA
    minimap = game.add.sprite(600,50,'minimap');
    minimap.fixedToCamera = true;
}

function updateInterface(){
    //organizacion de los sprites por capas
    game.world.bringToTop(ulti1);
    game.world.bringToTop(ulti2);
    game.world.bringToTop(text);
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
    position = game.add.sprite(600+((spaceship[0].body.position.x)/factorX),50+((spaceship[0].body.position.y)/factorY),'position');
    position.fixedToCamera = true;
    position.lifespan = 0.1;

    //representacion visual de la salud del jugador y gestion de la muerte del mismo (llama al listener, que hace que se pase al ending state)
    if(clase.health > 0)
    {
        lf2.width = clase.maxHealth;
        lf1.width = clase.health;
    } else
    {
        lf1.width = 0;
    }
}