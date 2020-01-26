
// Function to draw single valued bar chart starts
function drawSingleValuedBarChart(data, options, element) {
  let spaceWidth = options.barSpacing;
  let valueCount = data.length;
  let width = options.width;
  let height = options.height;
  let newElement = "<div><h1 class=\"barTitle\">" + options.barTitle + "</h1><div class=\"barChart\">";
  newElement += "<h2 class=\"yaxis\">" + options.yAxis + "</h2>";

  let tickCount = options.tickValues.length;

  //Creating tick marks using horizontal line
  for (let i = 0; i < tickCount; i++) {
    newElement += "<h2 class=\"tickValue" + i + "\">" + options.tickValues[i] + "</h2><hr class=\"hr" + i + "\">";
  }

  // To align elements as a row using the class flexRow
  newElement += "<div class=\"flexRow\">";

  //bar Width is computed based on the value count
  let barWidth = (width - (spaceWidth * valueCount)) / valueCount;

  // Finding maximum value so that bar height can be adjusted according to that value
  let maxValue = getMaxValue(data);

  for (let i = 0; i < data.length; i++) {
    //using flexColumn to arrange elements as a column
    newElement += "<div class=\"flexColumn\">";
    newElement += "<div class=\"bar bar" + i + "\"><p>" + data[i].value + "</p></div><h2>" + data[i].label + "</h2></div>" + "<div class=\"space\"></div>";
  }
  newElement += "</div>";
  newElement += "</div>";
  newElement += "<br><br><br><h2 class=\"xaxis" + "\">" + options.xAxis + "</h2>";
  newElement += "</div>";


  //adding the bar chart to the specified element
  $(element).append(newElement);

  // drawing bar chart by setting css properties
  $(".barChart").css({
    "width": width + "px", "height": height + "px", "border-left": "2px solid black",
    "border-bottom": "2px solid black", "display": "inline-block"
  });
  $(".flexColumn").css({ "display": "flex", "flex-direction": "column" });
  $(".flexRow").css({ "display": "flex", "flex-direction": "row" });

  for (let i = 0; i < data.length; i++) {

    //computing bar height based on the maximum value
    let barHeight = (data[i].value / maxValue) * height;

    $(".bar" + i).css({ "height": barHeight + "px", "margin-top": (height - barHeight) + "px" });
  }

  $(".bar").css({ "width": barWidth + "px", "background-color": options.barColor, "border": "1px solid black;" });
  $(".space").css("width", spaceWidth + "px");

  $("barChart").css("position", "relative");
  $(".xaxis").css({ "align": "center", "height": "200px", color: options.labelColor });
  $(".barTitle").css({ "color": options.titleColor, "font-size": options.titleFontSize + "px" });


  $(".yaxis").css({
    "position": "absolute", "margin-left": "-100px", "height": "200px", "transform": "rotate(-90deg)",
    "margin-top": height / 3 + "px", color: options.labelColor
  });


  for (let i = 0; i < tickCount; i++) {

    let tickDistance = (options.tickValues[i] / maxValue) * height;;
    $(".hr" + i).css({
      "position": "absolute", "width": "40px", "height": "2px", "margin-left": "-20px",
      "margin-top": height - tickDistance + "px", "margin-bottom": "0px"
    })
    $(".tickValue" + i).css({
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
