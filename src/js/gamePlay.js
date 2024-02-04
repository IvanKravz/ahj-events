export class GamePlay {
    constructor(element) {
        if(typeof element === 'string') {
            element = document.querySelector(element);
        }
        this.holes = 16;
        this.point = 0;
        this.advent = 0;
        this.clicking = 0;
        this.counterLost = 0;
        this._element = element;

        this.activeHole = 1;

        this.clickHole = this.clickHole.bind(this);

        this._element.addEventListener('click', this.clickHole);   
    }
        
    startGame() {
        const playing = true;
        const stop = () => playing = true,
            getHole = index => document.getElementById(`hole${index}`),
            deactivateHole = index =>
            getHole( index ).className = 'hole',
            activateHole = index =>
            getHole( index ).className = 'hole hole_has-mole',
            next = () => setTimeout(() => {
            if ( !playing ) {
                return;
            }
            deactivateHole( this.activeHole );
            this.activeHole = Math.floor( 1 + Math.random() * this.holes );
            activateHole( this.activeHole );
            
            this.advent += 1;
            if (this.clicking > 0 && this.advent > 4) {
                this.clicking = 0;
                this.advent = 0
            }

            if (this.advent === 5 && this.clicking === 0) {
                this.lossGame()
            }
            next();
            }, 1000 );
        next();
    }    
    
    clickHole(e) {
        this.clicking += 1;
        const target = e.target
        if (target.classList.contains('hole_has-mole')) {
            target.classList.add("cursor_hammer");
            this.point += 1;
            target.classList.remove("hole_has-mole");
            this.startGame
        } else {
            this.counterLost += 1;
        }
        if (this.counterLost === 5) {
            this.lossGame()
            }
    }

    lossGame() {
            alert("Игра окончена! Количество ваших попаданий: " + this.point);  
            location.reload()      
        }
    }


  