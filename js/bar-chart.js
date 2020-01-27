
let barCount = 0;


function drawMultiValuedBarChart(data, options, element) {
  let spaceWidth = options.barSpacing;
  let valueCount = data.length;
  let width = options.width;
  let height = options.height;
  let tickLabelLeftMargin = -90;


  let prefix = "A" + barCount;

  barCount++;

  let newElement = "<div><h1 class=\"" + prefix + "barTitle\">" + options.barTitle + "</h1><div class=\"" + prefix + "barChart\">";
  newElement += "<h2 class=\"" + prefix + "yaxis\">" + options.yAxis + "</h2>";

  let tickCount = options.tickValues.length;
  let noOfBars = data[0].value.length;

  //Creating tick marks using horizontal line
  for (let i = 0; i < tickCount; i++) {
    newElement += "<h2 class=\"" + prefix + "tickValue" + i + "\">" + options.tickValues[i] + "</h2><hr class=\"" + prefix + "hr" + i + "\">";
  }

  if (data[0].value.length > 0) {
    newElement += "<div class=\"" + prefix + "valueBox flexColumn\">";
     for (let j = 0; j < noOfBars; j++) {
      newElement +="<div class=\"flexRow\"><div class=\"" + prefix + "valueIcon"+j+"\"" + "></div><p class=\""+prefix+"barName"+j+"\">"+options.barNames[j]+"</p></div>";
    }
    newElement += "</div>"
  }

  // To align elements as a row using the class flexRow
  newElement += "<div class=\"flexRow\">";

  //bar Width is computed based on the value count
  let barWidth = 0;


  barWidth = ((width - (spaceWidth * valueCount)) / valueCount) / noOfBars;


  // Finding maximum value so that bar height can be adjusted according to that value
  let maxValue = getMaxValue(data,options);
  if (maxValue >= 100 && maxValue < 1000) {
    tickLabelLeftMargin = -165;
  } else if (maxValue > 1000) {
    tickLabelLeftMargin = -185;
  }

  for (let i = 0; i < data.length; i++) {
    //using flexColumn to arrange elements as a column
    newElement += "<div class=\"flexColumn\"><div class=\"flexRow\">";
    for (let j = 0; j < noOfBars; j++) {
      newElement += "<div class=\"" + prefix + "bar" + " " + prefix + "bar" + i + "B" + j + "\"><p>" + data[i].value[j] + "</p></div>";
    }

    newElement += "</div><h2>" + data[i].label + "</h2></div>" +
      "<div class=\"" + prefix + "space\"></div>";
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

  $("."+prefix + "valueBox").css({"position":"absolute","width":"250px","height":"200px",
  "margin-left":width+50+"px","margin-top":"150px"});
   for (let j = 0; j < noOfBars; j++) {
    $("."+prefix+"valueIcon"+j).css({"background-color":options.barColor[j],"width":"20px","height":"20px","margin":"20px"});
    $("."+prefix+"barName"+j).css({"color":"black","margin":"20px","height":"20px"});
  }

  for (let i = 0; i < data.length; i++) {

    //computing bar height based on the maximum value
    for (let j = 0; j < noOfBars; j++) {
      let barHeight = (data[i].value[j] / maxValue) * height;

      $("." + prefix + "bar" + i + "B" + j).css({ "height": barHeight + "px", "margin-top": (height - barHeight) + "px", "background-color": options.barColor[j] });
    }
  }

  $("." + prefix + "bar").css({ "width": barWidth + "px", "border": "1px solid black" });
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

//API for bar chart starts
function drawBarChart(data, options, element) {

    drawMultiValuedBarChart(data, options, element);

}//API for bar chart ends



/* Function to find the maximum value of the data starts*/
function getMaxValue(data,options) {
  let maxValue;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].value.length; j++) {
      if (maxValue === undefined) {
        maxValue = data[i].value[j];
      } else if (data[i].value[j] > maxValue) {
        maxValue = data[i].value[j];
      }
    }
  }

  for(let j=0;j<options.tickValues.length;j++){
    if (maxValue === undefined) {
      maxValue = options.tickValues[j];
    } else if (options.tickValues[j] > maxValue) {
      maxValue = options.tickValues[j];
    }
  }
  return maxValue;
}
/* Function to find the maximum value of the data ends*/
