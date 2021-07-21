
const alertBanner =  document.getElementById('alert');


// create the html for the banner
alertBanner.innerHTML = 
`
<div class="alert-banner">
    <p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks to complete</p>
    <p class="alert-banner-close">x</p>
</div>
`

alertBanner.addEventListener ('click', e => {
    const element = e.target;
    if (element.classList.contains("alert-banner-close")) {
        alertBanner.style.display = "none"
    }
});

// Taffic Chart 

const trafficCanvas = document.getElementById('traffic-chart');
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

// Bar Graph

const dailyCanvas = document.getElementById('daily-chart');

    let dailyData = {
        labels: ["S", "M", "T", "W", "T", "F", "S"],
        datasets: [{
            Label: '# of Hits',
            data: [75, 115, 175, 125, 225, 200, 100],
            backgroundColor: '#7477BF',
            borderWidth: 1,
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
    data: dailyData,
    options: dailyOptions

});

// Mobile Doughnut

const mobileCanvas = document.getElementById('mobile-chart');

const mobileData = {
    labels: ["Phones", "Tablets", "Desktop"],
    datasets: [{
        label: '# of Users',
        data: [500, 550, 2000],
        borderWidth: 0,
        backgroundColor: [
            '#FFBB44', // orange
            '#51B6C8', // blue
            '#7477BF' // purple
        ]
    }]
};

const mobileOptions = {
    plugins: {
        legend: {
            position: 'right',
            labels: {
                boxWidth: 20,
                fontStyle: 'bold',
            }
        }
    }
};

// Creating the actual chart

let mobileChart = new Chart(mobileCanvas, {
    type: 'doughnut',
    data: mobileData,
    options: mobileOptions
}); 


// Variables for the Message Section

const user = document.getElementById('userField');
const message = document.getElementById('messageField');
const send = document.getElementById('send');

// Event Listener on send

send.addEventListener ('click', () => {
    if (user.value === "" && message.value === "") {
        alert("Please fill out user and message fields before sending");
    } else if (user.value === "") {
        alert("Please fill out user field before sending");
    } else if (message.value === "") {
        alert("Please fill out message field before sending");
    } else {
        alert(`Message successfully sent to: ${user.value}`);
    }
});