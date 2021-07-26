const bellAlert = document.getElementById("bellAlert");
const bellMessage = document.getElementById("bellMessage");
const dotMessage = document.getElementById("notifications-alert");
const alertBanner = document.getElementById("alert");
const trafficCanvas = document.getElementById("traffic-chart");
const dailyCanvas = document.getElementById("daily-chart");
const mobileCanvas = document.getElementById("usersMobile-chart");
const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");

// Notification bell / Alert banner

bellAlert.addEventListener('click', e => {
  if(e.target === bellMessage || e.target === dotMessage){
    window.alert('Welcome to WebApp');
    window.alert('Thanks for using this service');
    window.alert('no more notifications!')
    dotMessage.style.display = 'none';
  } 
});

// Alert Banner: Create the html for the banner
alertBanner.innerHTML = 
`
<div class="alert-banner">
  <p><strong>Alert:</strong> You have unread messages</p>
  <p class="alert-banner-close">x</p>
</div>
`

alertBanner.addEventListener('click', e => {
  const element = e.target;
  if (element.classList.contains("alert-banner-close")) {
    alertBanner.style.display = "none";
  }
});

//Traffic chart

let pageStartData = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  datasets: [{
      data: [187, 475, 250, 500, 375, 450, 312, 470, 566, 375, 625, 200],
      backgroundColor: "rgba(116, 119, 191,.3)",
      borderColor: "#7477BF",
      fill: true,
      borderWidth: 1,
  }]
};

let hourData = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  datasets: [{
      data: [187, 475, 250, 500, 375, 450, 312, 470, 566, 375, 625, 200],
      backgroundColor: "rgba(116, 119, 191,.3)",
      borderColor: "#7477BF",
      fill: true,
      borderWidth: 1,
  }]
};

let dayData = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [{
      data: [625, 500, 1000, 678, 1250, 750, 1600],
      backgroundColor: "rgba(116, 119, 191,.3)",
      borderColor: "#7477BF",
      fill: true,
      borderWidth: 1,
  }]
};

let weekData = {
  labels: ["1-7", "8-14", "15-21", "22-28", "29-35", "36-42", "42-48", "49-52"],
  datasets: [{
      data: [750, 1250, 1000, 2000, 1500, 1750, 2250, 3200],
      backgroundColor: "rgba(116, 119, 191,.3)",
      borderColor: "#7477BF",
      fill: true,
      borderWidth: 1,
  }]
};

let monthData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [{
      data: [2700, 3450, 4000, 2000, 1500, 1750, 5000, 1850, 2250, 1500, 2500, 4120],
      backgroundColor: "rgba(116, 119, 191,.3)",
      borderColor: "#7477BF",
      fill: true,
      borderWidth: 1,
  }]
};

let trafficOptions = {
  responsive: true,
  aspectRatio: 2.5,
  tension: .3,
  animation: {
      duration: 1000
  },
  scales: {
      y: {
        beginAtZero: true
      }
  },
  plugins: {
      legend: {
      display: false
    }
  }
};

let trafficChart = new Chart(trafficCanvas, {
  type: 'line',
  data: pageStartData,
  options: trafficOptions
});

const updateChart = (chart, newData) => {
  chart.data.labels = newData.labels;
  chart.data.datasets[0].data = newData.datasets[0].data;
  chart.update({
    duration: 800,
    easing: 'linear',
  });
};

let trafficNavBtn = document.getElementsByClassName("traffic-nav")[0];
trafficNavBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("traffic-nav-link")) {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    let selection = e.target.textContent;
    console.log(selection);
    if ( selection === "Hourly") {
      updateChart(trafficChart, hourData);
    } else if (selection === "Daily") {
      updateChart(trafficChart, dayData);
    } else if (selection === "Weekly") {
      updateChart(trafficChart, weekData);
    } else if (selection === "Monthly") {
      updateChart(trafficChart, monthData);
    }
  };
});


// Daily bar graph 

const barData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [{
    label: '# of Hits',
    data: [75, 115, 175, 125, 225, 200, 100],
    backgroundColor: '#7477BF',
    borderWidth: 1
  }]
};

const dailyOptions = {
  responsive: true,
  aspectRatio: 1.5,
  scales: {
    y: {
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
};

let dailyChart = new Chart(dailyCanvas, {
  type: 'bar',
  data: barData,
  options: dailyOptions
});


// Doughnut 

const mobileData = {
  labels: ["Desktop", "Tablet", "Phones"],
  datasets: [{
    label: '# of Users',
    data: [2000, 550, 500],
    borderWidth: 0,
    backgroundColor: [
      '#7477BF', // Desktop
      '#F4BB44', // Tablet
      '#51B6C8' // Phones
    ]
  }]
};

const mobileOptions = {
  responsive: true,
  aspectRatio: 1.5,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 20,
        fontStyle: 'bold'
      }
    }
  }
};

let mobileChart = new Chart(mobileCanvas, {
  type: 'doughnut',
  data: mobileData,
  options: mobileOptions
});


// User messages

send.addEventListener('click', () => {
  if (user.value === "" && message.value === "") {
    alert("Please fill out user and message fields before sending");
  } else if (user.value === "") {
    alert("Please fill out user field before sending");
  } else if (message.value === "") {
    alert("Please fill out message field before sending");
  } else {
    alert(`Message successfully sent to: ${user.value}`);
    document.getElementById("submissionRld").reset();
  }
});


// Users search box

const memberData = ["Victoria Chambers", "Dale Byrd", "Dawn Wood", "Dan Oliver"];

function autocomplete(inp, arr) {
  let currentFocus;
  /* execute a function when user writes in the text field */
  inp.addEventListener("input", function (e) {
    let a,
      b,
      i,
      val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /* create a DIV element that will contain the items (values) */
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /* append the DIV element as a child of the autocomplete container */
    this.parentNode.appendChild(a);
    /* for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /* check if the item starts with the same letters as the text field value */
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /* create a DIV element for each matching element */
        b = document.createElement("DIV");
        /* make the matching letters bold */
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /* insert a input field that will hold the current array item's value */
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /* execute a function when someone clicks on the item value (DIV element) */
        b.addEventListener("click", function (e) {
          /* insert the value for the autocomplete text field */
          inp.value = this.getElementsByTagName("input")[0].value;
          /* close the list of autocompleted values */
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  // Keyboard functions

  inp.addEventListener("keydown", function (e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /* If the arrow DOWN key is pressed,
        increase the currentFocus variable */
      currentFocus++;
      /* and make the current item more visible */
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /* If the arrow UP key is pressed,
        decrease the currentFocus variable */
      currentFocus--;
      /* and make the current item more visible */
      addActive(x);
    } else if (e.keyCode == 13) {
      /* If the ENTER key is pressed prevent the submission of the form */
      e.preventDefault();
      if (currentFocus > -1) {
        /* and simulate a click on the "active" item */
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /* a function to classify an item as "active" */
    if (!x) return false;
    /* start by removing the "active" class on all items */
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /* add class "autocomplete-active" */
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /* function to remove the "active" class from all autocomplete items */
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /* close all autocomplete lists in the document,
    except the one passed as an argument */
    const x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /* execute a function when someone clicks in the document */
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

autocomplete(document.getElementById("userField"), memberData);


// Settings - Timezone - Local storage 

const emailSet = document.getElementById('email-checkbox');
const profileSet = document.getElementById('public-checkbox');
const timezoneSet = document.getElementById('timezone');
const saveButton = document.getElementById('save');
const cancelButton = document.getElementById('cancel');

saveButton.addEventListener('click', e => {
  const emailOnOff = emailSet.checked;
  const profileOnOff = profileSet.checked;
  const timezoneSel = timezoneSet.selectedIndex;

  localStorage.setItem('a', JSON.stringify(emailOnOff));
  localStorage.setItem('b', JSON.stringify(profileOnOff));
  localStorage.setItem('c', JSON.stringify(timezoneSel));
});

function settingsStored () {
  emailSet.checked = JSON.parse(localStorage.getItem('a'));
  profileSet.checked = JSON.parse(localStorage.getItem('b'));
  timezoneSet.selectedIndex = localStorage.getItem('c');
}
window.onload = settingsStored ();

cancelButton.addEventListener('click', e => {
  localStorage.removeItem('a');
  localStorage.removeItem('b');
  localStorage.removeItem('c');
  location.reload();
});