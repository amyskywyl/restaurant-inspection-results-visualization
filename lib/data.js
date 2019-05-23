function regroupViolation(data) {
  let totalDataPoints = [];

  let evidenceRodentsDataPoints = [];
  let evidenceInsectsDataPoints = [];
  let foodTempDataPoints = [];
  let hygieneDataPoints = [];
  let improperChemicalsDataPoints = [];
  let notFreshFoodDataPoints = [];
  let facilityProblemDataPoints = [];

  let excessiveDataPoints = [];
  let randIndex;

  data.forEach((item) => {
    let violationDataPoints;
    let coord = [item["lat"], item["long"], item["score"]];

    switch (item["violation_code"]) {
      case "04L":
      case "04K":
        evidenceRodentsDataPoints.push(coord);
        break;
      case "04M":
      case "04N":
        evidenceInsectsDataPoints.push(coord);
        break;
      case "02B":
      case "09B":
      case "02H":
      case "02G":
      case "02C":
      case "02F":
        foodTempDataPoints.push(coord);
        break;
      case "08C":
        improperChemicalsDataPoints.push(coord);
        break;
      case "04H":
        notFreshFoodDataPoints.push(coord);
        break;
      case "10A":
      case "10B":
      case "10D":
      case "10E":
      case "10F":
      case "10H":
        facilityProblemDataPoints.push(coord);
        break;
      default:
        hygieneDataPoints.push(coord);
    }
  });

  return {
    "Evidence of rodents": evidenceRodentsDataPoints,
    "Evidence of insects": evidenceInsectsDataPoints,
    "Food temperature": foodTempDataPoints,
    "Hygiene": hygieneDataPoints,
    "Improper chemicals": improperChemicalsDataPoints,
    "Not fresh food": notFreshFoodDataPoints,
    "Facility problems": facilityProblemDataPoints
  };
}

function gradeCount() {
  let aCount = 0;
  let bCount = 0;
  let cCount = 0;
  let other = [];
  mData.forEach(item => {
    switch (item["grade"]) {
      case "A":
        aCount ++;
        break;
      case "B":
        bCount ++;
        break;
      case "C":
        cCount ++;
        break;
    
      default:
        other.push(item["grade"]);
        break;
    }
  });
  return {
    "aCount": aCount, 
    "bCount": bCount, 
    "cCount": cCount, 
    "other" : other
  }
}

function getViolationData(filter) {
  //grab coordinates from json

  if (timeLapseRunning()) {
    return;
  }

  setDisplayValue(filter);
  let violationDataPoints = regroupViolation(mData);
  return violationDataPoints[filter];
}


function getCuisineData(filter) {
  //grab coordinates from json

  if (timeLapseRunning()) {
    return;
  }

  setDisplayValue(filter);

  let cuisineDataPoints = [];

  mData.forEach(item => {
    let itemCuisine = item["cuisine_description"];
    
    if (itemCuisine === filter) {
      let coord = [item["lat"], item["long"], item["score"]];
      cuisineDataPoints.push(coord);
    }
  });

  return cuisineDataPoints;
}

function getAnnualData() {

  if (timeLapseRunning()) {
    return;
  }

  changeTimeLapseRunStatus();


  const monthNames = [ "placeHolder",
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  let annualDataPoints = [];
  let heatmapData = [];
  let delay = 0;

  for (let month = 1; month <= 12; month++) {


    mData.forEach(item => {
      let itemMonth = item["grade_month"];
      let coord = [item["lat"], item["long"], item["score"]];

      if (itemMonth === month) {
        heatmapData.push(coord);
      }
    });

    let displayText = monthNames[month] + " " + "2018";
    if (heatmapData.length === 0) {
      displayText = "No data availble for" + " " + monthNames[month] + " " + 2018;
    }
    addNewHeatMap(heatmapData, displayText, delay, { "count": month, "maxCount": 11, "type": "timeLapse" });



    delay += 1000;
    heatmapData = [];
  }
}

function getViolationCuisineData(filter) {
  if (timeLapseRunning()) {
    return;
  }

  changeTimeLapseRunStatus();

  const violationNames = [
    "Evidence of rodents",
    "Evidence of insects",
    "Food temperature",
    "Hygiene",
    "Improper chemicals",
    "Not fresh food",
    "Facility problems"
  ];

  let cuisineDataPoints = [];
  let heatmapData = [];
  let delay = 0;

  mData.forEach((item) => {
    if (filter === item["cuisine_description"]) {
      cuisineDataPoints.push(item);
    }
  });


  let cuisineViolationDataPoints = regroupViolation(cuisineDataPoints)
  for (let violationIdx = 0; violationIdx < violationNames.length; violationIdx++) {
    
    heatmapData = cuisineViolationDataPoints[violationNames[violationIdx]];

    let displayText = violationNames[violationIdx] + " " + filter;
    if (heatmapData.length === 0) {
      displayText = "No data availble for" + " " + violationNames[violationIdx] + " " + filter;
    }
    addNewHeatMap(heatmapData, displayText, delay, { "count": violationIdx, "maxCount": 6, "type": "timeLapse" });



    delay += 1000;
    heatmapData = [];
  }
}




function changeTimeLapseRunStatus() {
  if (!timeLapseRunning()) {
    document.querySelectorAll('button').forEach(elem => {
      elem.disabled = true;
    });
  } else {
    document.querySelectorAll('button').forEach(elem => {
      elem.disabled = false;
    });
  }
}

function timeLapseRunning() {
  if (document.getElementById("display-year").disabled || document.getElementById("add-violation-filter").disabled) {
    return true;
  } else return false;
}

function noOp(data) {
  return data;
}


function addNewHeatMap(heatmapData, displayText, delay, options = {}) {
  setTimeout(() => {
    clearHeatmap();
    setDisplayValue(displayText);
    createHeatmap(noOp, heatmapData, options);

    if (options["type"] === "timeLapse") {
      window.progress = (options["count"] / options["maxCount"]) * 100
      let progressStatus = false
      if (options["count"] === options["maxCount"]) { progressStatus = true; }
      updateProgressBar(progressStatus);
    }

    if (options["count"] === options["maxCount"]) {
      changeTimeLapseRunStatus();
    }
  }, delay);
}

function setDisplayValue(displayText) {
  let displayTextDiv = document.getElementById("display-text");
  displayTextDiv.innerHTML = displayText;
}

//progress
function updateProgressBar(status = false) {
  progressBar = document.getElementById("progress-bar");
  progressBar.setAttribute("style", `width: ${window.progress}%; height:10px;`);
  if (status) {
    setTimeout(() => {
      progressBar.setAttribute("style", `height: 0px;`);
    }, 1000);
  }
}
//progress



