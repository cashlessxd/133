let balance = 10;
let spins = 0;

const items = [
    "img/slot1.png",
    "img/slot2.png",
    "img/slot3.png",
    "img/slot4.png",
    "img/slot5.png",
    "img/slot6.png"
];

function spin() {
    spins += 1;

    const number1 = generateRandomNumber();
    const number2 = generateRandomNumber();
    const number3 = generateRandomNumber();

    document.getElementById("slot1").setAttribute("src", items[number1]);
    document.getElementById("slot2").setAttribute("src", items[number2]);
    document.getElementById("slot3").setAttribute("src", items[number3]);

    if (number1 == number2 && number1 == number3) {
        let win = 1
        switch (number1) {
            case 4: //Poolball
                win = 100;
                break;
            case 0: //Coin
                win = 50;
                break;
            case 3: //Flower
                win = 25;
                break;
        }
        balance += win;
        document.getElementById("text").innerHTML = "Sie haben gewonnen! +" + win.toFixed(2) + " CHF";
    } else {
        balance -= 0.2;
        document.getElementById("text").innerHTML = "Sie haben verloren. -0.20 CHF";
    }

    document.getElementById("balance").innerHTML = balance.toFixed(2) + " CHF";
    document.getElementById("spins").innerHTML = "Spins: " + spins;
}

function generateRandomNumber() {
    return Math.floor(Math.random() * (items.length - 1));
}

document.getElementById('spin').addEventListener('click', function(){
    if (balance > 0) {
        spin();
    }
}, false);

document.getElementById('spin').addEventListener('contextmenu', function(e){
    e.preventDefault();
    console.log('rechte Maustaste wurde gedrückt');
}, false);