
let barCount = 0;
// Function to draw single valued bar chart starts
function drawSingleValuedBarChart(data, options, element) {
  let spaceWidth = options.barSpacing;
  let valueCount = data.length;
  let width = options.width;
  let height = options.height;
  let tickLabelLeftMargin = -90;


  let prefix = "A" + barCount;
  console.log("Prefix=" + prefix);
  barCount++;

  let newElement = "<div><h1 class=\"" + prefix + "barTitle\">" + options.barTitle + "</h1><div class=\"" + prefix + "barChart\">";
  newElement += "<h2 class=\"" + prefix + "yaxis\">" + options.yAxis + "</h2>";

  let tickCount = options.tickValues.length;

  //Creating tick marks using horizontal line
  for (let i = 0; i < tickCount; i++) {
    newElement += "<h2 class=\"" + prefix + "tickValue" + i + "\">" + options.tickValues[i] + "</h2><hr class=\"" + prefix + "hr" + i + "\">";
  }

  // To align elements as a row using the class flexRow
  newElement += "<div class=\"flexRow\">";

  //bar Width is computed based on the value count
  let barWidth = (width - (spaceWidth * valueCount)) / valueCount;

  // Finding maximum value so that bar height can be adjusted according to that value
  let maxValue = getMaxValue(data);
  if (maxValue >= 100 && maxValue < 1000) {
    tickLabelLeftMargin = -165;
  } else if (maxValue > 1000) {
    tickLabelLeftMargin = -185;
  }

  for (let i = 0; i < data.length; i++) {
    //using flexColumn to arrange elements as a column
    newElement += "<div class=\"flexColumn\">";
    newElement += "<div class=\"" + prefix + "bar" + " " + prefix + "bar" + i + "\"><p>" + data[i].value + "</p></div><h2>" +
      data[i].label + "</h2></div>" + "<div class=\"" + prefix + "space\"></div>";
  }
  newElement += "</div>";
  newElement += "</div>";
  newElement += "<h2 class=\"" + prefix + "xaxis" + "\">" + options.xAxis + "</h2>";
  newElement += "</div>";


  //adding the bar chart to the specified element
  $(element).append(newElement);

  // drawing bar chart by setting css properties
  $("." + prefix + "barChart").css({
    "width": width + "px", "height": height + "px", "border-left": "2px solid black",
    "border-bottom": "2px solid black", "display": "inline-block"
  });
  $(".flexColumn").css({ "display": "flex", "flex-direction": "column" });
  $(".flexRow").css({ "display": "flex", "flex-direction": "row" });

  for (let i = 0; i < data.length; i++) {

    //computing bar height based on the maximum value
    let barHeight = (data[i].value / maxValue) * height;

    $("." + prefix + "bar" + i).css({ "height": barHeight + "px", "margin-top": (height - barHeight) + "px" });
  }

  $("." + prefix + "bar").css({ "width": barWidth + "px", "background-color": options.barColor, "border": "1px solid black" });
  $("." + prefix + "space").css("width", spaceWidth + "px");

  $("." + prefix + "barChart").css("position", "relative");
  $("." + prefix + "xaxis").css({ "align": "center", "height": "200px", color: options.labelColor, "padding-top": "90px" });
  $("." + prefix + "barTitle").css({ "color": options.titleColor, "font-size": options.titleFontSize + "px" });


  $("." + prefix + "yaxis").css({
    "position": "absolute", "margin-left": tickLabelLeftMargin + "px", "height": "200px", "transform": "rotate(-90deg)",
    "margin-top": height / 3 + "px", color: options.labelColor
  });


  for (let i = 0; i < tickCount; i++) {

    let tickDistance = (options.tickValues[i] / maxValue) * height;;
    $("." + prefix + "hr" + i).css({
      "position": "absolute", "width": "40px", "height": "2px", "margin-left": "-20px",
      "margin-top": height - tickDistance + "px", "margin-bottom": "0px"
    })
    $("." + prefix + "tickValue" + i).css({
      "position": "absolute", "margin-left": "-55px", "margin-top": height - tickDistance - 10 + "px",
      "margin-bottom": "0px", "width": "40px"
    });
  }

}
// Function to draw single valued bar chart ends

function drawMultiValuedBarChart(data, options, element) {
  return null;
}

//API for bar chart starts
function drawBarChart(data, options, element) {

  //Call appropriate function based on the type of bar chart
  if (options.multiValue === false) {
    drawSingleValuedBarChart(data, options, element);
  } else {
    drawMultiValuedBarChart(data, options, element);
  }

}//API for bar chart ends

/* Function to find the maximum value of the data starts*/
function getMaxValue(data) {
  let maxValue;
  for (let i = 0; i < data.length; i++) {
    if (maxValue === undefined) {
      maxValue = data[i].value;
    } else if (data[i].value > maxValue) {
      maxValue = data[i].value;
    }

  }

  return maxValue;
}
/* Function to find the maximum value of the data ends*/
