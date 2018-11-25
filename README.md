# JuegoEnRed
## Título
Cursed Stars
## Plataforma 
PC
## Versión
2.0
## Sinopsis, jugabilidad y contenido
    Descripcion
Se trata de un juego en 2D ambientado en el espacio en el que cada jugador maneja una nave en un entorno limitado.

    Categoria
Todos contra todos. MMO Battle Royale.

    Objetivo
El objetivo del juego es sobrevivir a las naves enemigas (los otros jugadores), y ganará el último jugador que quede con vida.

    Entorno
Las naves batallan en un amplio mapa rectangular que estará lleno de polvo estelar, el material necesario para recargar la salud de la nave. 

De vez en cuando aparecerán naves aliadas de botín que resaltarán su posición en el mapa y que soltarán carga de ultimate o habilidades especiales (power-ups) al jugador que la destruya, siendo un factor para juntar a jugadores y que peleen por el botín. La nave del botín tiene 1000 puntos de vida y se mueve de forma errática por el mapa. El jugador que le de el golpe de gracia es el que se llevará el botín. Es inmune a los agujeros negros, explicados a continuación.

Una serie de agujeros negros comenzarán a aparecer aleatoriamente cuando el número de jugadores en la partida vaya disminuyendo. El tamaño de cada uno será diferente y todos restarán salud al jugador si pasa por ellos (cuanto más cerca se pase de su centro más daño causarán). El motivo de esto es hacer la zona jugable más pequeña sin tener que reescalar el mapa, obligando a los jugadores restantes a desplazarse en una zona común libre de agujeros y evitar que no se encuentren entre ellos, pues se alargaría demasiado la partida.

El jugador cuenta con un minimapa en su pantalla de juego, que le muestra su posición con respecto al mapa total, la posición de la nave loot en el caso de haber una, y la posición y el tamaño de los agujeros negros que vayan apareciendo.

El jugador tambien cuenta con un 'feed' en su pantalla de juego, que le notifica los nombres de los jugadores que se van eliminando junto con el nombre de quien los eliminó.

    Personajes
Las nave es la representación del jugador en el campo de batalla. Hay 3 clases diferentes de naves disponibles para jugar. Lo único que comparten estas 3 clases es la salud base (200 puntos de vida, ampliables con objetos y mejoras). Por otra parte, todas cuentan un diseño diferente, y unas ataque básico y características distintas, por lo que la estrategia y la forma de jugar de cada clase es diferente. 

Además del ataque básico, cada nave cuenta con un ataque especial (o ultimate) que se irá cargando progresivamente y que cuenta con mayor potencia que el ataque básico.

Clases: Disrupter, Assault, Strategist
- **Disrupter**:

![]( https://github.com/Naxinix/JuegoEnRed/blob/master/Arte%20final/Disrupter.png)

  La principal ventaja de la disrupter es su velocidad de movimiento, superior a la de las otras clases. Esto le permite entrar y salir de la batalla con mucha facilidad, asi como ser un objetivo dificil de acertar.

  Otra de sus características es la dispersión de balas. Al contar con una dispersión elevada, se debe jugar a corto alcance del enemigo para lograr hacer algo de daño, pues a más distancia más difícil será acertar al enemigo.

  **Ultimate** : Al activarse, la nave duplica su vida máxima (obteniendo el HP que había perdido, en caso de no tener la barra llena) y su velocidad aumenta, moviéndose de forma aún más impredecible.

- **Assault**:

![]( https://github.com/Naxinix/JuegoEnRed/blob/master/Arte%20final/Assault.png)

  La nave assault se caraceriza por su precisión en el disparo (las balas salen siguiendo una línea recta, no hay dispersión) y por su daño por segundo, superior a las de las otras clases.
  
  Ya que su supervivencia reside en gran parte en su daño, necesita puntería para hacerse notar y tener un impacto en la partida, pues de lo contrario puede ser machacado fácilmente.

  **Ultimate**: La nave empieza a rotar sobre sí misma, soltando una gran cantidad de balas al mismo tiempo. Estas balas son más fuertes que las normales y dañan a cualquier nave enemiga que se acerque a cierta distancia.
- **Strategist**:

![]( https://github.com/Naxinix/JuegoEnRed/blob/master/Arte%20final/Strategist.png)

  La principal característica de la nave strategist es su capacidad para colocar trampas.

  La trampa básica se coloca en un punto del mapa que decida el jugador, y engancha al enemigo que pase por el radio de actuación de la tramp. Mientras el enemigo esté en la trampa, este permanecerá inmóvil, siendo totalmente expuesto al ataque enemigo.

  Esta habilidad puede ser reposicionada en cualquier momento, pero solo se puede tener una activa a la vez. Una vez un enemigo la activa, la trampa desaparece.

  **Ultimate**: La nave suelta bombas en un radio próximo que explotarán al contacto enemigo. Estas bombas tienen una vida de 100 HP y pueden ser destruidas simplemente disparando. Las bombas durarán hasta que la destruyan o hasta que pase un tiempo determinado.



      Power-ups
Los power-ups serán habilidades de un solo uso que se nos proporcionará aleatoriamente al romper una nave loot. Un jugador puede tener hasta 4 power ups a la vez. De tener cuatro y romper una nave loot, el contenido no se nos otorgará.

- **Cohete**: Se le concede un proyectil al jugador que al liberarlo se mueve a muy rápida velocidad y que eliminará al enemigo en el caso de impactar.
- **Armadura**: Se le concede una armadura al jugador, rellenándole la vida y aumentando esta 200 puntos más.
- **Carga**: Se le concede la carga restante a la ultimate que le quede al jugador.
- **Speed Boost**: La nave se mueve al doble de velocidad durante 15 segundos.
- **Reflejar**: A la nave lo envuelve una burbuja que dura tres segundos y refleja en la dirección contraria todo proyectil que impacte sobre ella.


## Arte 
    Diseño
El diseño de las naves es único en cada clase y va acorde con su rol (diseños en papel). Un dato a destacar es que hay cada nave hay unas zonas de color especiales, que adoptarán un color aleatorio dentro del rango RGB para cada jugador al comenzar la partida. Esto está planteado para que el jugador se identifique con la unicidad de su nave y para que no haya dos naves iguales en la partida, pues si se encontraran dos de la misma clase y el mismo rol podría llevar a confusión.	

![](https://github.com/Naxinix/JuegoEnRed/blob/master/Naves.JPG)
  
    Música y efectos de sonido
La música estará presente en todas las pantallas menos en la de juego, pues el sonido es un factor importante a la hora de jugar y podría verse opacado por música. El tema de la música de las demas pantallas será de estilo futurista y con temática espacial. 

Habrá efectos de sonido al pulsar botones de las pantallas previas. En la sala de juego, habrá efectos de sonido para:
	- Disparos
	- Movimiento de las naves
	- Habilidades especiales
	- Power-ups
	- Muerte (propia y de otro jugador)
	- Victoria
	- Aparición de nave loot
	- Aparición de agujeros negros
	
## Mecánicas
    Cámara
 Se sitúa ofreciendo una perspectiva cenital sobre la nave del jugador, manteniendo siempre al jugador en el centro de la pantalla y siguiendo a este en su movimiento por el mapa.
 
    Controles
El movimiento de la nave se controla con las teclas W, A, S y D. La nave apuntará a la posición del ratón en todo momento. La nave dispara haciendo click con el botón izquierdo del ratón, y la dirección de disparo por defecto (sin power-ups) será en la que se esté apuntando. El ataque especial se libera pulsando Q cuando esté cargado. Los power ups se van stackeando en las teclas de los números 1, 2, 3, 4 y 5 conforme los vayamos consiguiendo, y para usarlos debemos puslar el número que se le haya asignado a cada uno.
  
    Puntuación 
 No existe una puntuación como tal, pues el ganador no es el que más puntuación tenga, sino el último que quede con vida. Así, pueden ser ambos ganadores tanto el que ha conseguido muchas bajas enemigas como el que ha ido conservador escondiéndose.
  
    Guardar/Cargar
 No existe una opción de cargar ni guardar, ya que cada partida es única, empiezan todos los jugadores desde cero y no tiene en cuenta cualquier partida anterior.
 
    Chat
 Existe un chat disponible para todos los jugadores que se encuentren en la sala de espera. Los mensajes cuentan con el nombre de usuario seguido del contenido de este. El chat se desactiva durante la partida pues tiene poca practicidad en un todos contra todos en tiempo real.
 
    MatchMaking
El juego se ha planteado de tal forma que pueda haber un máximo de 20 y un mínimo de 5 jugadores en una partida.

Cuando entremos en la sala de espera se nos meterá en una cola. Ya que se necesitan al menos 5 jugadores para comenzar, hasta que no se reúna esta cifra en la cola el aviso de la sala de espera mostrará 'BUSCANDO JUGADORES...'

Cuando se conecten 5, aparecerá el nuevo mensaje de aviso 'LA PARTIDA COMENZARÁ EN...' y un temporizador de 2 minutos comenzará a descender en la pantalla:

- Si se alcanzan los 20 jugadores antes de que acabe el temporizador, la partida comenzará. 

- Si el temporizador llega a 0 y hay igual o más de 5 jugadores se comienza la partida con los que estén.

- Si un jugador se desconecta durante el tiempo del temporizador, volverá a aparecer el mensaje de buscando jugadores.

## Estados del Juego e Interfaz.

![]( https://github.com/Naxinix/JuegoEnRed/blob/master/Diagrama.png)

       

  El juego tendrá 7 pantallas:

- La **pantalla de carga**, que permanece activa mientras se cargan los assets, de tal modo que el jugador sepa lo que esta pasando.

![](https://github.com/Naxinix/JuegoEnRed/blob/master/repository/Escenas/loading.png)

- La **pantalla de menú**, con el título del juego. En esta pantalla hay dos botones, uno que nos lleva a la pantalla de cómo jugar y otro a la de selección de nave.

![](https://github.com/Naxinix/JuegoEnRed/blob/master/repository/Escenas/menu.jpg)

- La **pantalla de cómo jugar**, que nos explica los controles y el objetivo del juego, así como elementos del mapa que pueden resultar confusos.

![](https://github.com/Naxinix/JuegoEnRed/blob/master/repository/Escenas/Finales/ComoJugar.JPG)

- La **pantalla de selección de nave**, en la que tendremos las clases y un botón de información al lado de cada una que nos explicará sus características. De nuevo hay un botón de jugar que se desbloqueará una vez seleccionemos una haciendo click.

![](https://github.com/Naxinix/JuegoEnRed/blob/master/repository/Escenas/Finales/SeleccionClase.JPG)

- La **sala de espera**, donde se espera que el matchmaking nos una a una partida. En ella, hay un chat en la esquina derecha para hablar con los jugadores que también se encuentren en la sala y amenizar la espera. También hay un botón se salir en la parte unferior de la pantalla, que nos llevará a la pantalla inicial en el caso de pulsarlo. En grande y en el centro de la pantalla hay un espacio reservado para un aviso que puede mostrarnos dos mensajes, tanto 'BUSCANDO JUGADORES', como 'LA PARTIDA COMENZARÁ EN X TIEMPO', siendo X el temporizador descendente.

![](https://github.com/Naxinix/JuegoEnRed/blob/master/repository/Escenas/matching.jpg)

- La **pantalla de juego**, propiamente dicha, en la que tendremos que controlar a nuestra nave. La interfaz de esta pantalla cuenta con:
  - Barra de salud de nuestra nave. En la esquina inferior izquierda de la pantalla.
  - Minimapa. En la esquina superior derecha de la pantalla.
  - Bajas cometidas y número se jugadores restantes en la partida. En la esquina superior derecha de la pantalla, debajo del minimapa.
  - Carga de ataque especial. En el centro inferior de la pantalla.
  - Power ups disponibles. En la esquina inferior izquierda de la pantalla.
  - Feed. En el centro izquierda de la pantalla.
  
 ![](https://github.com/Naxinix/JuegoEnRed/blob/master/repository/Escenas/Finales/PantallaDeJuego.JPG)
  
- La **pantalla de victoria** o de **game over**, dependiendo de nuestro resultado, y en ambas dos botones, uno de 'reintentar' que nos lleva a la pantalla de selección de nave y otro de 'salir' que nos lleva a la pantalla de menú.

![](https://github.com/Naxinix/JuegoEnRed/blob/master/repository/Escenas/Finales/Ending.JPG)

Diagrama de clases:

![](https://github.com/Naxinix/JuegoEnRed/blob/master/DiagramaClases.PNG)

## Instrucciones de uso.
1- Descargar la carpeta llamada "CursedStarsBueno"
2- Abrir el proyecto con sts
3- Abrir communication.js -> Ctrl+F y buscar localhost para hacer un replace All con tu ip (disponible ejecutando cmd y escribiendo ipconfig: La IP que buscamos es Ipv4)
4- Abrir App.java y darle a Run as -> Java Application
5- Una vez hecho esto en el navegador escribir "http://localhost:8080" o "http://ip:8080", donde ip será la IP del propietario
6- Para que un segundo jugador se una a la partida deberá conectarse en una red LAN con el propietario del proyecto y escribir "http://ip:8080" (no se puede con localhost, pues es necesario acceder al PC del propietario del proyecto)

## Posibles ampliaciones y visión de futuro.
En una primera instancia, la versión de salida de nuestro juego tendrá todo lo mencionado con anterioridad. En el caso, los elementos a desarrollar y epxlotar serían nuevas clases de naves con nuevas mecánicas y habilidades, así como nuevos power-ups que cambien el curso de la partida. Asimismo, si vieramos cierta necesidad y feedback del público se podrían meter nuevas características como jugar en escuadrón con amigos, ampliar el número de jugadores por partida, así como la posibilidad de hostear varias partidas al mismo tiempo.

## Enfoque del juego. Público.
Nuestro juego tiene un característico enfoque a corto plazo. Son partidas breves e intensas en las que las que el resultado puede cambiar en cuestión de segundos, por lo que en la que el jugador debe prestar atención al entorno en todo momento para no morir. 
Las clases están planteadas para evitar la linealidad de las partidas si todas las naves tuvieran las mismas características. 
La posibilidad de elegir clase le plantea al jugador pensar la forma de jugar más óptima para ganar la partida.

## Tecnología
El juego estará implementado en Java con SpringBoot en el lado del servidor y en JavaScript con el framework Phaser en lado del cliente.	

## Estudio/Diseñadores
b00m Productions

* Fernando Barroso Címbora. (f.barroso.2016@alumnos.urjc.es) github: @Naxinix
* Diego Sagredo de Miguel.  (d.sagredo.2016@alumnos.urjc.es) github: @DiegoKiller98

## **IMPORTANTE:** Notas de los desarrolladores sobre la entrega de la FASE 2

- Debido a la imposibilidad de manejar a dos personajes a la vez para emular un jugador enemigo on-line de las futuras fases (ya que la camara debe seguir a uno, el otro jugador no se veria a si mismo), se ha incorporado una Nave Dummy enemiga que simularía un jugador enemigo. La Nave Dummy es estática, y dispara siempre en la posición de nuestra nave controlable. Se puede matar a la nave Dummy y ella nos puede matar a nosotros.
- En cuanto a la **clase Strategist**, hay un par de apuntes:
	- Ante la falta de enemigos, hemos implementado que la trampa y la ultimate de esta clase hagan daño a la nave que las lanza 		 **para mostrar su funcionalidad** pero esto no sería así en la versión final del juego, afectando solo a naves enemigas.
	- Para poder mostrar la funcionalidad de la trampa por la nave que la coloca, hemos implentado que aparezca en una posicion fija  	    del mapa cuando el jugador la lanza, para poder acercarse a ella y que le haga efecto. Si la colocara en su posición, nada mas 	     ponerla se activaría. En la versión final del juego esta se coloca en la posicion de la nave controlable por el jugador y sólo           afectara a naves enemigas.
- En esta fase no esta disponible la pantalla de esperando jugadores debido a la característica local del juego.
- En esta fase, no está disponible el chat, el feed ni las bajas cometidas, debido a la ausencia de jugadores enemigos.
- En esta fase, sólo están disponibles los power-ups 'Speed Boost' y 'Carga'.
- En esta fase no está disponible cualquier sonido, tanto música ambiental como efectos de sonido.


## **IMPORTANTE:** Notas de los desarrolladores sobre la entrega de la FASE 3

- En esta fase se ha implementado API Rest solo para dos jugadores, dado que nos es imposible probarlo con más personas.
- En esta fase, no está disponible el chat, el feed ni las bajas cometidas.
- En esta fase, sólo están disponibles los power-ups 'Speed Boost' y 'Carga'.
- En esta fase el sonido es solamente local, no se escuchan las ultis o disparos de los enemigos.
- De momento tan solo es posible el juego en LAN. Esto cambiará para las siguientes entregas.

