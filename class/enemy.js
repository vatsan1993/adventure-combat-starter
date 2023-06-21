const { Character } = require('./character');

class Enemy extends Character {
  constructor(name, description, currentRoom) {
    // Fill this in
    super(name, description, currentRoom);
    this.cooldown = 3000;
    this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log('You cannot move in that direction');
    }
  }
  randomMove() {
    // Fill this in
    let exits = this.currentRoom.getExits();

    const randomDirection = exits[Math.floor(Math.random() * exits.length)];
    this.move(randomDirection);
    this.cooldown = 3000;
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function () {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  setAttackTarget() {
    this.attackTarget = this.player;
  }

  attack() {
    // Fill this in

    this.attackTarget.applyDamage(this.strength);
    this.cooldown = 3000;
  }

  applyDamage(amount) {
    // Fill this in
    super.applyDamage(amount);
    if (this.health > 0) this.attack();
    // else this.die();
  }

  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

    // Fill this in
  }

  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);
  }
  printRoom() {
    console.clear();
    console.log('');
    console.log(this.name);
    console.log('');
    console.log(this.description);
    console.log('');
    if (this.getEnemies().length > 0) {
      console.log(
        `Enemies: ${this.getEnemies()
          .map((enemy) => enemy.name)
          .join(', ')}`
      );
    }
    if (this.items.length > 0) {
      console.log(`Items: ${this.items.map((item) => item.name).join(', ')}`);
    }
    console.log(this.getExitsString());
    console.log('');
  }
}

module.exports = {
  Enemy,
};
