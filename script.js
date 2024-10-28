//---------------------------------- Start/global variables --------------------------------
//-----------Start/inputs--------------
let inputLoginUsername = document.querySelector('.login__input--user');
let inputLoginPin = document.querySelector('.login__input--pin');
//-----------End/inputs--------------
//-----------Start/buttons--------------
let btnLogin = document.querySelector('.login__btn');
//-----------End/buttons--------------
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
            break;
        } else username = '';
    }
    if (flag == true) window.alert('user not found');
};

//---------------------------------- End/functions --------------------------------

btnLogin.addEventListener('click', function (e) {
    login(inputLoginUsername.value, inputLoginPin.value);
});
