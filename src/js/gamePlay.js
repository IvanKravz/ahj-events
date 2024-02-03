export class GamePlay {
    constructor(element) {
        if(typeof element === 'string') {
            element = document.querySelector(element);
        }

        this._element = element

        this.activeHole = 1;

        this.getHole = this.getHole.bind(this);
        // this.clickHole = this.clickHole.bind(this);
        // this.getHole = this.getHole.bind(this);
        // this.submot = this.submot.bind(this);
        
        this._element.addEventListener('click', this.getHole);
        
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
            this.activeHole = Math.floor( 1 + Math.random() * 16 );
            activateHole( this.activeHole );
            next();
            }, 1000 );
        
        next();
    }    
    
    getHole(index) {
        return document.getElementById(`hole${index}`);
    } 

    submot(hole) {
        
        let counterDead = 0;
        let counterLost = 0;
        // console.log(hole)
        if (hole.classList.contains('hole_has-mole')) {
            counterDead++;
            // deadMole.textContent = counterDead;
            
            } else {
            counterLost++;
            // lostMole.textContent = counterLost;
            }
        
        // console.log(counterLost)   
        if (counterDead === 10) {
        alert("Вы победили");
        location.reload()
        }
        if (counterLost === 5) {
        alert("Вы проиграли");
        location.reload()
        }
        // console.log(counterDead)
    }

    getHole(e) {
        
        const target = e.target
        target.classList.add('cursor_hammer')
        if (target.classList.contains('hole_has-mole')) {
            target.classList.add('cursor_hammer')
        }
    }


    clickHole() {

        for (let index = 1; index <= 16; index++) {
            
            let hole = this.getHole(index);
            hole.addEventListener('click', this.submot(hole))
            }
        }
}

  