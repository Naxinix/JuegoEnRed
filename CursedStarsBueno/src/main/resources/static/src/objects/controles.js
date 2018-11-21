function controles() {
    //Abajo
    if (game.input.keyboard.isDown(Phaser.Keyboard.S))
    {
        spaceshipParent[0].body.acceleration.y = clase.maxSpeed;
    }
    //Arriba
    if (game.input.keyboard.isDown(Phaser.Keyboard.W))
    {
        spaceshipParent[0].body.acceleration.y = -clase.maxSpeed;
    }
    //Izquiera
    if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
        spaceshipParent[0].body.acceleration.x = -clase.maxSpeed;
    }
    //Derecha
    if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
        spaceshipParent[0].body.acceleration.x = clase.maxSpeed;
    }
    //Activar ultimate (si está cargada)
    if (game.input.keyboard.isDown(Phaser.Keyboard.Q))
    {
        if(ultCharged){
            ultCharged = 0;
            counter = 0;
            ultiTime = 0;
            ultused = true;
            clase.Ultimate();
        }
    }
        
    //Disparo básico
    if (clase.fireButton.isDown)
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
    //Activa power-up guardado en el slot 1 
    if (game.input.keyboard.isDown(Phaser.Keyboard.ONE))
    {
        chargePU();
    }
    //Activa power-up guardado en el slot 2
    if (game.input.keyboard.isDown(Phaser.Keyboard.TWO))
    {
        speedBoostPU();
    }
    //Te permite desplegar una trampa con la flecha derecha, si eres de la //clase strategist
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && classSelected == 3)
    {
        if(gravActive==false)
            setGrav();
    }
    //Te permite destruir una trampa con la tecla G, si eres de la clase strategist y hay un graviton activo
    if (game.input.keyboard.isDown(Phaser.Keyboard.G) && classSelected == 3)
    {
        if(gravActive=true)
        killGrav();
    }
}