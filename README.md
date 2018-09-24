# JuegoEnRed
## Título
A Battle for the Stars
## Plataforma 
PC
## Versión
1.0
## Sinopsis, jugabilidad y contenido
    Descripcion
Se trata de un juego en 2D ambientado en el espacio en el que cada jugador maneja una nave en un entorno limitado.

    Categoria
Todos contra todos. MMO Battle Royale.

    Objetivo
El objetivo del juego es sobrevivir a las naves enemigas (los otros jugadores), y ganará el último jugador que quede con vida.

    Entorno
Las naves batallan en un amplio mapa rectangular que estará lleno de polvo estelar, el material necesario para recargar la salud de la nave. 

De vez en cuando aparecerán naves aliadas de botín que resaltarán su posición en el mapa y que soltarán carga de ultimate o habilidades especiales al jugador que la destruya, siendo un factor para juntar a jugadores y que peleen por el botín.

Una serie de agujeros negros comenzarán a aparecer y a tragarse a naves que circulen cerca cuando el número de jugadores en la partida vaya disminuyendo, obligando a los jugadores restantes a desplazarse en una zona común y evitar que no se encuentren entre ellos, pues se alargaría demasiado la partida.

    Personajes
Las nave es la representación del jugador en el campo de batalla. Hay 3 clases diferentes de naves disponibles para jugar. Lo único que comparten estas 3 clases es la salud base (200 puntos de vida, ampliables con objetos y mejoras). Por otra parte, todas cuentan un ataque básico y características distintas, por lo que la estrategia y la forma de jugar de cada clase es diferente.

Además del ataque básico, cada nave cuenta con un ataque especial (o ultimate) que se irá cargando progresivamente y que cuenta con mayor potencia que el ataque básico.

Clases: Disrupter, Assault, Strategist
- **Disrupter**:

  La principal ventaja de la disrupter es su velocidad de movimiento, superior a la de las otras clases. Esto le permite entrar y salir de la batalla con mucha facilidad, asi como ser un objetivo dificil de acertar.

  Otra de sus características es la dispersión de balas. Al contar con una dispersión elevada, se debe jugar a corto alcance del enemigo para lograr hacer algo de daño, pues a más distancia más difícil será acertar al enemigo.

  **Ultimate** : Al activarse, la nave duplica su vida máxima (obteniendo el HP que había perdido, en caso de no tener la barra llena) y su velocidad aumenta, moviéndose de forma aún más impredecible.

- **Assault**:

  La nave assault se caraceriza por su precisión en el disparo (las balas salen siguiendo una línea recta, no hay dispersión) y por su daño por segundo, superior a las de las otras clases.
  
  Ya que su supervivencia reside en gran parte en su daño, necesita puntería para hacerse notar y tener un impacto en la partida, pues de lo contrario puede ser machacado fácilmente.

  **Ultimate**: La nave empieza a rotar sobre sí misma, soltando una gran cantidad de balas al mismo tiempo. Estas balas son más fuertes que las normales y dañan a cualquier nave enemiga que se acerque a cierta distancia.
- **Strategist**:

  La principal característica de la nave strategist es su capacidad para colocar trampas.

  La trampa básica se coloca en un punto del mapa que decida el jugador, y engancha al enemigo que pase por el radio de actuación de la trampa (el gancho funciona como proyectil, se puede esquivar). Mientras el enemigo esté en la trampa, este permanecerá inmóvil, siendo totalmente expuesto al ataque enemigo.

  Esta habilidad puede ser reposicionada en cualquier momento, pero solo se puede tener una activa a la vez. Una vez un enemigo la activa, la trampa desaparece.

  **Ultimate**: Puede soltar tres balizas creando un área triangular, en el que cualquier nave enemiga que lo atraviese será dañada y ralentizada. Estas balizas tienen una vida de 100 HP y pueden ser destruidas simplemente disparando. La trampa durará hasta que la destruyan o hasta que pase un tiempo determinado.

   
## Mecánicas
    Cámara
 Se sitúa ofreciendo una perspectiva cenital sobre la nave del jugador, manteniendo siempre al jugador en el centro de la pantalla y siguiendo a este en su movimiento por el mapa.
 
    Controles
 La nave se controla moviendo el ratón por la pantalla. La nave se dirigirá a donde se esté apuntando en todo momento. La nave dispara haciendo click con el botón izquierdo del ratón, y la dirección de disparo por defecto (sin power-ups) será en la que se esté apuntando. El ataque especial se libera pulsando Q cuando esté cargado.
  
    Puntuación 
 No existe una puntuación como tal, pues el ganador no es el que más puntuación tenga, sino el último que quede con vida. Así, pueden ser ambos ganadores tanto el que ha conseguido muchas bajas enemigas como el que ha ido conservador escondiéndose.
  
    Guardar/Cargar
 No existe una opción de cargar ni guardar, ya que cada partida es única, empiezan todos los jugadores desde cero y no tiene en cuenta cualquier partida anterior.
	

## Estados del Juego e Interfaz.
  El juego tendrá 3 pantallas:

- La **pantalla inicial**, con el título del juego. En esta pantalla se elige el nombre de 	usuario, el tipo de nave con el que queremos luchar y el botón de comenzar partida.
- La **pantalla de juego**, propiamente dicha, en la que tendremos que controlar a nuestra nave. La interfaz de esta pantalla cuenta con:
  - Barra de salud de nuestra nave. En la esquina inferior izquierda de la pantalla.
  - Bajas cometidas. En la esquina superior derecha de la pantalla.
  - Carga de ataque especial. En el centro inferior de la pantalla.
- La **pantalla de victoria** o de **game over**, dependiendo de nuestro resultado, y en ambas un botón para jugar otra partida.

## Visión del juego. Público.
Nuestro juego tiene un característico enfoque a corto plazo. Son partidas breves e intensas en las que las que el resultado puede cambiar en cuestión de segundos, por lo que en la que el jugador debe prestar atención al entorno en todo momento para no morir. 
Las clases están planteadas para evitar la linealidad de las partidas si todas las naves tuvieran las mismas características. 
La posibilidad de elegir clase le plantea al jugador pensar la forma de jugar más óptima para ganar la partida.

## Tecnología
El juego estará implementado en Java con SpringBoot en el lado del servidor y en JavaScript con el framework Phaser en lado del cliente.	

## Estudio/Diseñadores
b00m Productions


* Fernando Barroso Címbora. (f.barroso.2016@alumnos.urjc.es)
* Diego Sagredo de Miguel.  (d.sagredo.2016@alumnos.urjc.es)


