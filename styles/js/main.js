/*==== # Toggle Button Function ====*/
function toggleBtn(element, className) {
  element.classList.toggle(className);
}

/*==== # Data Funds Object ====*/
const dataFunds = {
  collectedBacked: 89914,
  totalBackers: 5007
};

/*==== # Minimum Pledge Array ====*/
const minPledge = [25, 75, 200];

/*==== # Navbar Button Section ====*/
let navMobileBox = document.querySelector('.nav-mobile-box');
let showNav = document.querySelector('.toggle');

showNav.onclick = () => {
    // console.log("navbar button clicked");
    toggleBtn(navMobileBox, 'open');
    toggleBtn(showNav, 'closeIcon');
};

/*==== # Bookmark Button Section ====*/
let bookmarkBtn = document.getElementById('bookmark');

bookmarkBtn.onclick = () => {
  // console.log("bookmark button clicked");
  toggleBtn(bookmarkBtn, 'marked');
};

/*==== # Radio Button Section ====*/
let radioBtn = document.querySelectorAll('.radio-btn');
let confirmBox = document.querySelectorAll('.confirm-box');
let pledgeCard = document.querySelectorAll('.pledge-card');
let modalPledge = document.getElementById('modal-pledge');
let totalBackers = document.getElementById('total-backers');
let inputPledge = document.querySelectorAll('.input-number');
let submit = document.querySelectorAll('.submit');
let successModal = document.getElementById('success-modal');
let gotIt = document.getElementById('got-it-btn');
let boxInput = document.querySelectorAll('.input-box');
let warningTxt = document.querySelectorAll('.warning-text');

const contentChecked = [];

function radioButton(index) {
  for (let y = 0; y < pledgeCard.length; y++) {
    (y === index) ? pledgeCard[y].style.border = '2px solid hsl(176, 50%, 47%)' : pledgeCard[y].style.border = '2px solid rgba(189, 189, 189, 0.473)';
  }

  if (index >= 1) {
    contentChecked.push(index -1);

    if (contentChecked.length > 1) {
      confirmBox[contentChecked[0]].style.display = 'none';
      contentChecked.splice(0, 1);
    }

    confirmBox[index -1].style.display = 'block';

    submit[index -1].onclick = () => {
      if (inputPledge[index -1].value < minPledge[index -1]) {
        boxInput[index -1].style.borderColor = 'red';
        warningTxt[index -1].innerHTML = 'Minimum pledge is $' + minPledge[index -1];
      } else if (inputPledge[index -1].value >= minPledge[index -1]) {
        confirmPledge(index -1, inputPledge);
        inputPledge[index -1].value = minPledge[index -1]; //Reset input pledge value

        for (let i = 0; i < boxInput.length; i++) {
          boxInput[i].style.borderColor = 'hsl(0, 0%, 48%)';
          warningTxt[i].innerHTML = '';
        }

        successModal.style.display = 'grid';
        modalPledge.style.display = 'none';
      }
    };
  } else if (index < 1) {
    for (let i = 0; i < confirmBox.length; i++) {
      confirmBox[i].style.display = 'none';
    }
  }
}

for (let i = 0; i < radioBtn.length; i++) {
  radioBtn[i].onchange = () => {
    radioButton(i);
  };
}

/*==== # Modal Button Section ====*/
let rewardBtn = document.querySelectorAll('.reward');
let modalBtn = document.querySelectorAll('.modal-btn');
let modalBox = document.querySelector('.modal-container');
let bodyContainer = document.getElementById('body-container');

for (let i = 0; i < modalBtn.length; i++) {
  modalBtn[i].onclick = () => {
    toggleBtn(modalBox, 'open');
    toggleBtn(bodyContainer, 'noScrolls');
  };
}

for (let i = 0; i < rewardBtn.length; i++) {
  rewardBtn[i].onclick = () => {
    toggleBtn(modalBox, 'open');
    toggleBtn(bodyContainer, 'noScrolls');
    radioBtn[i+1].checked = true;
    radioButton(i+1);
  };
}

gotIt.onclick = () => {
  toggleBtn(modalBox, 'open');
  toggleBtn(bodyContainer, 'noScrolls');
  successModal.style.display = 'none';
  modalPledge.style.display = 'grid';
}

/*==== # Status Card Section ====*/
let collectedFunds = document.getElementById('collected-funds');
let targetFunds = document.getElementById('target-funds');
let ttlBackers = document.getElementById('total-backers');
let barFunds = document.querySelector('.bar-inner');

// Update data pledge card
function confirmPledge(index, value) {
  collectedFunds.innerHTML = addComa(dataFunds.collectedBacked += parseInt(value[index].value));
  ttlBackers.innerHTML = addComa(dataFunds.totalBackers += 1);
  updateBarFunds(barFunds, parseInt(collectedFunds.innerHTML), parseInt(targetFunds.innerHTML));
}

// Add the comma (,) from data funds object
function addComa(value) {
  const newVal = [];
  const strVal = value.toString().split('').reverse();

  for (let i = 0; i <= strVal.length; i++) {
    newVal.unshift(strVal.splice(0, 3).reverse().join(''));
  }

  return newVal;
}

// Convert data numbers to a percentage (%)
function convertToPercent(recentVal, maxVal) {
  recentVal /= maxVal;
  return recentVal *= 100;
}

// Update bar meter
function updateBarFunds(barMeter, collectedF, targetF) {
  let cF = convertToPercent(collectedF, targetF);
  let tF = convertToPercent(targetF, targetF);

  return cF > tF ? barMeter.style.width = 100 + "%" : barMeter.style.width = cF + "%";
}

updateBarFunds(barFunds, parseInt(collectedFunds.innerHTML), parseInt(targetFunds.innerHTML));
