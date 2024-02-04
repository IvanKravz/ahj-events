export default class GamePlay {
  constructor(element) {
    if (typeof element === "string") {
      element = document.querySelector(element);
    }
    this.holes = 16;
    this.point = 0;
    this.advent = 0;
    this.clicking = 0;
    this.counterLost = 0;
    this.element = element;

    this.activeHole = 1;

    this.clickHole = this.clickHole.bind(this);

    this.element.addEventListener("click", this.clickHole);
  }

  startGame() {
    const playing = true;
    const getHole = (index) => document.getElementById(`hole${index}`);
    const deactivateHole = (index) => (getHole(index).className = "hole");
    const activateHole = (index) =>
      (getHole(index).className = "hole hole_has-mole");
    const next = () =>
      setTimeout(() => {
        if (!playing) {
          return;
        }
        deactivateHole(this.activeHole);
        this.activeHole = Math.floor(1 + Math.random() * this.holes);
        activateHole(this.activeHole);

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

  clickHole(e) {
    this.clicking += 1;
    const { target } = e;
    if (target.classList.contains("hole_has-mole")) {
      target.classList.add("cursor_hammer");
      this.point += 1;
      target.classList.remove("hole_has-mole");
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
    location.reload();
  }
}
