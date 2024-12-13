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
let movementsIsSorted = false;
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
let btnSortMovements = document.querySelector('.btn--sort');
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

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});
