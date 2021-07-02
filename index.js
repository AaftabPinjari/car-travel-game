const root = document.querySelector('.root'),
    btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    root.innerHTML = '';
    Game();
});

function Game() {
    //constants
    const startPetrol = 50;
    const startPoint = 0;
    const endPoint = 100;
    const literPerKilometer = 2;
    const refill = 30;
    const stepRange = 6;



    function getRandomInt(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    var i = 0;
    var pumpLocations = []
    while (i < 6) {
        var j = getRandomInt(0, 100)
        pumpLocations.push(j)
        i++;
    }

    const uniquePumpLocations = [...new Set(pumpLocations)]
    uniquePumpLocations.sort(function (a, b) { return a - b })
    console.log(uniquePumpLocations)

    let pos = startPoint;
    let petrol = startPetrol;

    //func to display on document window
    const displayStr = (str) => {
        root.innerHTML += '\n' + str
    }
    const displayCarPos = (idx) => {
        let str = `Move ${idx}   -   Car at ${pos}km \t Petrol Remaining : ${petrol}L `;
        displayStr(str);
    }
    displayStr(`Game Started \nPetrol Pumps Generated at ${uniquePumpLocations} \n`)
    var idx = 1;
    while (pos < endPoint && petrol > 0) {
        const running = petrol / literPerKilometer;
        const disRemained = endPoint - pos;
        const maxDis = Math.min(disRemained, running, stepRange);
        const stepDis = getRandomInt(0, maxDis);
        const stepPetrol = stepDis * literPerKilometer;

        pos = pos + stepDis;
        petrol = petrol - stepPetrol;
        if (uniquePumpLocations.includes(pos)) {
            petrol += refill;
        }

        displayCarPos(idx);
        idx++;
    }

    if (pos === endPoint) {
        displayStr("You Won ");
    } else {
        displayStr("Game Over");
    }








}


