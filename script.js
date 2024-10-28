//---------------------------------- Start/global variables --------------------------------

//-----------Start/inputs--------------
let inputLoginUsername = document.querySelector('.login__input--user');
let inputLoginPin = document.querySelector('.login__input--pin');
//-----------End/inputs--------------

//-----------Start/lables--------------
let lblWelcome = document.querySelector('.welcome');
let lblDate = document.querySelector('.date');
let lblLogoutTimer = document.querySelector('.timer');
let lblBalance = document.querySelector('.balance__value');
let lblMovementValue = document.querySelector('.movements__value');
let lblMovementDate = document.querySelector('.movements__date');
//-----------End/lables--------------

//-----------Start/buttons--------------
let btnLogin = document.querySelector('.login__btn');
//-----------End/buttons--------------

//-----------Start/containers--------------
let containerApp = document.querySelector('.app');
let containerMovements = document.querySelector('.movements');
//-----------End/containers--------------

//---------------------------------- End/global variables --------------------------------

//---------------------------------- Start/accounts --------------------------------
let account1 = {
    owner: 'Mahsa Piran',
    pin: 1111,
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.5,
};

let account2 = {
    owner: 'Jessica Davis',
    pin: 2222,
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.2,
};

let account3 = {
    owner: 'Steven Thomas Williams',
    pin: 3333,
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
};

let account4 = {
    owner: 'Sarah Smith',
    pin: 4444,
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
};

let accounts = [account1, account2, account3, account4];
//---------------------------------- End/accounts --------------------------------

//---------------------------------- Start/functions --------------------------------
//login------------------------------------
let login = function (loginUsername = '', loginPin = '') {
    let username = '';
    let flag = true;
    //console.log(accounts);
    for (let account of accounts) {
        let nameList = account.owner.split(' ');
        for (let nl of nameList) {
            username += nl[0];
        }
        if (
            loginUsername.toLowerCase == username.toLowerCase &&
            loginPin == account.pin
        ) {
            console.log('hey', account.owner);
            flag = false;
            updateUI(account);
            break;
        } else username = '';
    }
    if (flag == true) window.alert('user not found');
};
//-----------------------------------------------

//update ui---------------------------------
const updateUI = function (user) {
    containerApp.style.opacity = '100';
    inputLoginPin = '';
    inputLoginUsername = '';

    lblWelcome.textContent = `Good Day ${user.owner.substring(
        0,
        user.owner.indexOf(' ') + 1
    )}!`;

    //show date and time
    showDate();

    //logout timer
    logoutTimer();

    //set balance
    balanceCalculator(user);

    //show movements
    showMovements(user);
};
//----------------------------------------

//calculate date and show ----------------
const showDate = function () {
    options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };

    let date = new Intl.DateTimeFormat(navigator.language, options);
    lblDate.textContent = date.format(new Date());

    setInterval(() => {
        lblDate.textContent = date.format(new Date());
    }, 60000);
};
//-------------------------------------

//log out timer function------------
const logoutTimer = function () {
    lblLogoutTimer.textContent = '15:00';
    let min = 1;
    let sec = 60;
    let timer = setInterval(() => {
        sec--;
        lblLogoutTimer.textContent = `${min < 10 ? `0${min}` : min}:${
            sec < 10 ? `0${sec}` : sec
        }`;
        if (min == 0 && sec == 0) {
            clearInterval(timer);
            containerApp.style.opacity = 0;
        }
        if (sec == 0) {
            min--;
            sec = 60;
        }
    }, 1000);
};
//------------------------------------

//calculate balance------------------
let balanceCalculator = function (user) {
    let balance = 0;
    balance = user.movements.reduce((acc, movement) => acc + movement);
    lblBalance.textContent = `${balance}€`;
};
//-------------------------------------

let showMovements = function (user) {
    let html = '';

    for ([i, movement] of user.movements.entries()) {
        console.log(i, movement);
        html = `<div class="movements__row">
                    <div class="movements__type movements__type--${
                        movement > 0 ? 'deposit' : 'withdrawal'
                    }">
                        ${++i} deposit
                    </div>
                    <div class="movements__date"></div>
                    <div class="movements__value">${movement}€</div>
                </div>`;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    }
};

//---------------------------------- End/functions --------------------------------

btnLogin.addEventListener('click', function (e) {
    login(inputLoginUsername.value, inputLoginPin.value);
});
