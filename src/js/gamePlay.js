export default class GamePlay {
  constructor(element) {
    if (!(typeof element === 'string')) {
      throw new Error('element type no "string"');
    }
    this.element = document.querySelector(element);
    this.holes = 16;
    this.point = 0;
    this.advent = 0;
    this.clicking = 0;
    this.counterLost = 0;
    this.activeHole = 1;
    this.clickHole = this.clickHole.bind(this);
    this.element.addEventListener('click', this.clickHole);
  }

  getHole(index) {
    return document.getElementById(`hole${index}`);
  }

  deactivateHole(index) {
    this.getHole(index).className = 'hole';
  }

  activateHole(index) {
    this.getHole(index).className = 'hole hole_has-mole';
  }

  startGame() {
    const playing = true;
    const next = () => setTimeout(() => {
      if (!playing) {
        return;
      }
      this.deactivateHole(this.activeHole);
      this.activeHole = Math.floor(1 + Math.random() * this.holes);
      this.activateHole(this.activeHole);
      this.advent += 1;
      if (this.clicking > 0 && this.advent > 4) {
        this.clicking = 0;
        this.advent = 0;
      }

      if (this.advent === 5 && this.clicking === 0) {
        this.lossGame();
      }
      next();
    }, 1000);
    next();
  }

  clickHole(elem) {
    this.clicking += 1;
    const { target } = elem;
    if (target.classList.contains('hole_has-mole')) {
      this.point += 1;
      target.classList.add('cursor_hammer');
      target.classList.remove('hole_has-mole');
      this.startGame;
    } else {
      this.counterLost += 1;
    }
    if (this.counterLost === 5) {
      this.lossGame();
    }
  }

  lossGame() {
    alert(`Игра окончена! Количество ваших попаданий: ${this.point}`);
    window.location.reload();
  }
}
