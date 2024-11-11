//---------------------------------- Start/global variables --------------------------------

//-----------GLOBAL VARIABLES------------
let user;
let globalTimer;
let timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
};
//-------------------------------------------------
//-----------Start/inputs--------------
let inputLoginUsername = document.querySelector('.login__input--user');
let inputLoginPin = document.querySelector('.login__input--pin');
let inputTransferTo = document.querySelector('.form__input--to');
let inputTransferAmount = document.querySelector('.form__input--amount');
let inputLoanAmount = document.querySelector('.form__input--loan-amount');
let inputCloseRequestUser = document.querySelector('.form__input--user');
let inputCloseRequestPin = document.querySelector('.form__input--pin');
//-----------End/inputs--------------

//-----------Start/lables--------------
let lblWelcome = document.querySelector('.welcome');
let lblDate = document.querySelector('.date');
let lblLogoutTimer = document.querySelector('.timer');
let lblBalance = document.querySelector('.balance__value');
let lblDepositValue = document.querySelector('.summary__value--in');
let lblWithdrawalValue = document.querySelector('.summary__value--out');
let lblInterestValue = document.querySelector('.summary__value--interest');
//-----------End/lables--------------

//-----------Start/buttons--------------
let btnLogin = document.querySelector('.login__btn');
let btnTransfer = document.querySelector('.form__btn--transfer');
let btnRequestLoan = document.querySelector('.form__btn--loan');
let btnCloseAccount = document.querySelector('.form__btn--close');
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
    movements: [
        [200, new Date()],
        [450, new Date()],
        [-400, new Date()],
        [3000, new Date()],
        [-650, new Date()],
        [-130, new Date()],
        [70, new Date()],
        [1300, new Date()],
    ],
    interestRate: 0.5,
    interestAmount: 100,
    interest: 0,
};

let account2 = {
    owner: 'Jessica Davis',
    pin: 2222,
    movements: [
        [5000, new Date()],
        [3400, new Date()],
        [-150, new Date()],
        [-790, new Date()],
        [-3210, new Date()],
        [-1000, new Date()],
        [8500, new Date()],
        [-30, new Date()],
    ],
    interestRate: 0.2,
    interestAmount: 0,
    interest: 0,
};

let account3 = {
    owner: 'Steven Thomas Williams',
    pin: 3333,
    movements: [
        [200, new Date()],
        [-200, new Date()],
        [340, new Date()],
        [-300, new Date()],
        [-20, new Date()],
        [50, new Date()],
        [400, new Date()],
        [-460, new Date()],
    ],
    interestRate: 0.3,
    interestAmount: 0,
    interest: 0,
};

let account4 = {
    owner: 'Sarah Smith',
    pin: 4444,
    movements: [
        [430, new Date()],
        [1000, new Date()],
        [700, new Date()],
        [50, new Date()],
        [90, new Date()],
    ],
    interestRate: 0.5,
    interestAmount: 0,
    interest: 0,
};

let accounts = [account1, account2, account3, account4];
//---------------------------------- End/accounts --------------------------------

//---------------------------------- Start/functions --------------------------------
let starter = function () {
    interestCalculator();
};

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
            // console.log('hey', account.owner);
            flag = false;
            user = account;
            updateUI();
            break;
        } else username = '';
    }
    if (flag == true) window.alert('user not found');
};
//-----------------------------------------------

//update ui---------------------------------
const updateUI = function () {
    containerApp.style.opacity = '100';
    inputLoginPin.value = '';
    inputLoginUsername.value = '';

    lblWelcome.textContent = `Good Day ${user.owner.substring(
        0,
        user.owner.indexOf(' ') + 1
    )}!`;

    //show date and time
    showDate();

    //logout timer
    logoutTimer();

    //set balance
    balanceCalculator();

    //show movements
    showMovements();

    //show summary
    depositCalculator();
    withdrawalCalculator();

    //set interest value
    lblInterestValue.textContent = `${user.interest.toFixed(2)}€`;
};
//----------------------------------------

//calculate date and show ----------------
const showDate = function () {
    let date = new Intl.DateTimeFormat(navigator.language, timeOptions);
    lblDate.textContent = date.format(new Date());

    setInterval(() => {
        lblDate.textContent = date.format(new Date());
    }, 60000);
};
//-------------------------------------

//log out timer function------------
const logoutTimer = function () {
    lblLogoutTimer.textContent = '15:00';
    let min = 14;
    let sec = 60;
    let timer = setInterval(() => {
        sec--;
        lblLogoutTimer.textContent = `${min < 10 ? `0${min}` : min}:${
            sec < 10 ? `0${sec}` : sec
        }`;
        if (min == 0 && sec == 0) {
            globalTimer = timer;
            logout();
        }
        if (sec == 0) {
            min--;
            sec = 60;
        }
    }, 1000);
    return timer;
};
//------------------------------------

//calculate balance------------------
let balanceCalculator = function (currentUser = user) {
    let balance = 0;
    //console.log(currentUser);
    balance = currentUser.movements.reduce(function (acc, movement) {
        acc + movement[0];
        return acc + movement[0];
    }, 0);
    lblBalance.textContent = `${balance.toFixed(2)}€`;
    // setInterestAmount(currentUser,balance);
    return balance;
};
//-------------------------------------

let showMovements = function () {
    //containerMovements.remove();
    containerMovements.replaceChildren();
    let html = '';

    for ([i, movement] of user.movements.entries()) {
        html = `<div class="movements__row">
                    <div class="movements__type movements__type--${
                        movement[0] > 0 ? 'deposit' : 'withdrawal'
                    }">
                        ${++i} deposit
                    </div>
                    <div class="movements__date">${new Intl.DateTimeFormat(
                        navigator.language,
                        timeOptions
                    ).format(movement[1])}</div>
                    <div class="movements__value">${movement[0].toFixed(
                        2
                    )}€</div>
                </div>`;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    }

    depositCalculator();
    withdrawalCalculator();
};

let showLastMovement = function (movements) {
    let html = '';
    let currentMovement = movements[movements.length - 1];
    console.log(currentMovement);
    html = `<div class="movements__row">
                    <div class="movements__type movements__type--${
                        currentMovement[0] > 0 ? 'deposit' : 'withdrawal'
                    }">
                        ${movements.length} deposit
                    </div>
                    <div class="movements__date">${new Intl.DateTimeFormat(
                        navigator.language,
                        timeOptions
                    ).format(currentMovement[1])}</div>
                    <div class="movements__value">${currentMovement[0].toFixed(
                        2
                    )}€</div>
                </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
};

let transferMoney = function (amount, transferTo) {
    amount = Number(amount);
    let flag = true;
    for (let account of accounts) {
        if (
            account.owner.toLowerCase() === transferTo.toLowerCase() &&
            amount <= balanceCalculator()
        ) {
            setInterestAmount(
                user,
                [-amount, new Date()],
                balanceCalculator(user)
            );
            user.movements.push([-amount, new Date()]);
            withdrawalCalculator();

            showLastMovement(user.movements);

            setInterestAmount(
                account,
                [-amount, new Date()],
                balanceCalculator(account)
            );
            account.movements.push([amount, new Date()]);

            inputTransferTo.value = '';
            inputTransferAmount.value = '';
            balanceCalculator();
            flag = false;
            break;
        }
    }
    if (flag) {
        window.alert('Transfer is impossible!');
    }
};

let requestLoan = function (amount) {
    amount = Number(amount);
    if (0.5 * amount < balanceCalculator()) {
        user.movements.push([amount, new Date()]);
        inputLoanAmount.value = '';
        setInterestAmount(user, [amount, new Date()], balanceCalculator(user));
        showLastMovement(user.movements);
        balanceCalculator();
    } else window.alert('Your account has no enough credit!');
};

let closeAccount = function (name, pin) {
    let index = -1;
    if (user.owner.toLowerCase == name.toLowerCase && user.pin == pin) {
        for ([i, val] of accounts.entries()) {
            if (val.owner.toLowerCase == name.toLowerCase) {
                index = i;
                break;
            }
        }
    }
    if (index > -1) {
        accounts.splice(index, 1);
        inputCloseRequestUser = '';
        inputCloseRequestPin = '';
        logout();
    } else {
        window.alert('User not found!');
    }
};

let logout = function () {
    containerApp.style.opacity = 0;
    clearInterval(globalTimer);
};

let depositCalculator = function () {
    let deposit = user.movements.reduce(function (acc, movement) {
        let num = movement[0] > 0 ? movement[0] : 0;
        return acc + num;
    }, 0);
    lblDepositValue.textContent = deposit + '€';
    return deposit;
};

let withdrawalCalculator = function () {
    let withdrawal = user.movements.reduce(function (acc, movement) {
        let num = movement[0] < 0 ? movement[0] : 0;
        return acc + num;
    }, 0);

    lblWithdrawalValue.textContent = Math.abs(withdrawal).toFixed(2) + '€';
    return Math.abs(withdrawal);
};

//the interest is calculated every minute
let setInterestAmount = function (currentUser, movement, totalBalance) {
    let currentBalance = balanceCalculator(currentUser);
    if (currentBalance >= totalBalance + movement[0]) {
        currentUser.interestAmount = totalBalance + movement[0];
    } else {
        currentUser.interestAmount = currentBalance;
    }
};

let interestCalculator = function () {
    let counter = 0;
    let flag = false;
    let interestTimer = setInterval(() => {
        for (let account of accounts) {
            if (account.interestAmount * account.interestRate > 0) {
                account.interest +=
                    account.interestAmount * account.interestRate;
                account.movements.push([
                    account.interestAmount * account.interestRate,
                    new Date(),
                ]);
            }
            setInterestAmount(
                account,
                account.interestAmount * account.interestRate
            );
            balanceCalculator();
        }
        if (user.interest > 0) {
            lblInterestValue.textContent = `${user.interest.toFixed(2)}€`;
            showLastMovement(user.movements);
        }
    }, 10000);
};

//---------------------------------- End/functions --------------------------------

btnLogin.addEventListener('click', function (e) {
    e.preventDefault();
    login(inputLoginUsername.value, inputLoginPin.value);
});

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    transferMoney(inputTransferAmount.value, inputTransferTo.value);
});

btnRequestLoan.addEventListener('click', function (e) {
    e.preventDefault();
    requestLoan(inputLoanAmount.value);
});

btnCloseAccount.addEventListener('click', function (e) {
    e.preventDefault();
    closeAccount(inputCloseRequestUser.value, inputCloseRequestPin.value);
});
