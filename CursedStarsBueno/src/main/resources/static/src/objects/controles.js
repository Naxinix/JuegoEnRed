function controles() {
    //Abajo
    if (game.input.keyboard.isDown(Phaser.Keyboard.S))
    {
        spaceshipParent[0].body.acceleration.y = clase.maxSpeed;
        if(!donee){

            if(classSelected==1){
            spaceship[0].loadTexture('disrupter');

             }else if(classSelected==2){
            spaceship[0].loadTexture('assault');

            
             }else if(classSelected==3){
            spaceship[0].loadTexture('strategist');
             }

            donee=true;
            }
        spaceship[0].animations.play('idle', 6, false);
      
       
       if(!fuel.isPlaying){
            fuel.play();
        }
    }
    //Arriba
    if (game.input.keyboard.isDown(Phaser.Keyboard.W))
    {
        spaceshipParent[0].body.acceleration.y = -clase.maxSpeed;
        if(!donee){

            if(classSelected==1){
            	spaceship[0].loadTexture('disrupter');

             }else if(classSelected==2){
            	 spaceship[0].loadTexture('assault');

            
             }else if(classSelected==3){
            	 spaceship[0].loadTexture('strategist');
             }

            donee=true;
            }
        spaceship[0].animations.play('idle', 6, false);
      
       
       if(!fuel.isPlaying){
            fuel.play();
        }
    }
    //Izquiera
    if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
        spaceshipParent[0].body.acceleration.x = -clase.maxSpeed;
        if(!donee){

            if(classSelected==1){
            	spaceship[0].loadTexture('disrupter');

             }else if(classSelected==2){
            	 spaceship[0].loadTexture('assault');

            
             }else if(classSelected==3){
            	 spaceship[0].loadTexture('strategist');
             }

            donee=true;
            }
        spaceship[0].animations.play('idle', 6, false);
      
       
       if(!fuel.isPlaying){
            fuel.play();
        }
    }
    //Derecha
    if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
        spaceshipParent[0].body.acceleration.x = clase.maxSpeed;
        if(!donee){

            if(classSelected==1){
            	spaceship[0].loadTexture('disrupter');

             }else if(classSelected==2){
            	 spaceship[0].loadTexture('assault');

            
             }else if(classSelected==3){
            	 spaceship[0].loadTexture('strategist');
             }

            donee=true;
            }
        spaceship[0].animations.play('idle', 6, false);
      
       
       if(!fuel.isPlaying){
            fuel.play();
        }
    }
    
    if(!game.input.keyboard.isDown(Phaser.Keyboard.S) && !game.input.keyboard.isDown(Phaser.Keyboard.W)
            && !game.input.keyboard.isDown(Phaser.Keyboard.A) && !game.input.keyboard.isDown(Phaser.Keyboard.D)){
                fuel.stop();
              
                //clase.sprite='assault_static';
                if(classSelected==1){
                spaceship[0].loadTexture('disrupter_static',0);
                }
                 if(classSelected==2){
                spaceship[0].loadTexture('assault_static',0);
                 }
                if (classSelected==3){
                spaceship[0].loadTexture('strategist_static',0);
                }
                donee=false;
               //animationreference.isPlaying=false;
            }
    //Activar ultimate (si está cargada)
    if (game.input.keyboard.isDown(Phaser.Keyboard.Q))
    {
        if(ultCharged){
        	  if(classSelected==1){
                  lucio.visible=false;
              }
              else if(classSelected==2){
                  reaper.visible=false;
              }else if(classSelected==3){
            	  hammond.visible=false;
              }
            ultCharged = 0;
            counter = 0;
            ultiTime = 0;
            ultused = true;
            clase.usingUlt=true;
            clase.Ultimate();
            doneee=false;
        }
    }
        
    //Disparo básico
    if (clase.fireButton.isDown)
    {
        clase.weapon.fireAtPointer();
        if(!beamm.isPlaying)
            beamm.play();
        

        //Disparo de escopeta para strategist
        if(classSelected == 3)
        {
            for(var i = 0; i < 9; i++)
            {
                clase.weapon.fireAtPointer();
            }
        }
    }else{
        beamm.pause();
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
        	 //gravActive = true;
            setGrav();
    }
    //Te permite destruir una trampa con la tecla G, si eres de la clase strategist y hay un graviton activo
    if (game.input.keyboard.isDown(Phaser.Keyboard.G) && classSelected == 3)
    {
        if(gravActive=true)
        killGrav();
    }
}
