class Horse {
    constructor(name, breed) {
        this.name = name;
        this.breed = breed;
    }
}

class Racer extends Horse {
    constructor(name, breed) {
        super(name, breed);
        this.distance = 0;
        this.speed = 0;
    }

    setSpeed() {
        this.speed = Math.floor(Math.random() * 5) + 10;
    }

    run() {
        this.timer = setInterval(() => {
            this.distance += this.speed;
            this.setSpeed();
        }, 1000);
    }

    stop() {
        if (this.timer) clearInterval(this.timer);
    }
}

class Race {
    constructor() {
        this.horses = [];
    }

    createRace(horses) {
        horses.forEach((horse) => {
            this.horses.push(new Racer(horse.name, horse.breed));
        });
    }

    startRace() {
        if (this.horses.length) {
            this.horses.forEach(horse => horse.run());
            this.racerState();
            setTimeout(this.stopRace.bind(this), 10000);
        }
    }

    racerState() {
        this.timer = setInterval(() => {
            this.horses.forEach((horse) => {
                console.log(`${horse.breed} ${horse.name} : ${horse.distance}`);
            });
        }, 2000);
    }

    stopRace() {
        if (this.timer) clearInterval(this.timer);
        this.horses.forEach(horse => horse.stop());
        this.findWinner();
    }

    findWinner() {
        this.horses.sort((i1, i2) => i1.distance - i2.distance);
        console.log(`=== ${this.horses[0].breed} ${this.horses[0].name} win! ===`);
    }
}

const HORSES = [
    new Horse('Roach', 'Geralt\'s Horse'),
    new Horse('Pegasus', 'Dandelion\'s white gelding'),
    new Horse('Aard', 'Windhorse'),
    new Horse('Ignis', 'Firehorse'),
    new Horse('Quen', 'Battlehorse'),
    new Horse('Axii', 'Calmhorse'),
    new Horse('Yrden', 'Magichorse'),
    new Horse('Kelpie', 'Ciri\'s Horse'),
    new Horse('Scorpion', 'Eskel\'s horse'),
    new Horse('Lexa', 'Student'),
];

const race = new Race();
race.createRace(HORSES);
race.startRace();
