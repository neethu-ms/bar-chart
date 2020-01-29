
//To keep track of the bar chart count
let barCount = 0;


/*API for bar chart starts*/
function drawBarChart(data, options, element) {

  // prefix is used to avoid overlapping of styles of bar charts when multiple bar charts are drawn in a single html page
  let prefix = "A" + barCount;
  let width = options.width;
  let height = options.height;

  // Finding maximum value
  let maxValue = getMaxValue(data, options);

  let yaxisLabelLeftMargin = -90;
  let noOfBars = data[0].value.length;

  barCount++;

  //Added a div element for bar chart. All the components of bar chart are added to this
  $(element).append("<div class=\"" + prefix + "barContainer\"></div>");

  //adding common styles
  //addingCommonStyles();

  //Add bar chart title
  addBarChartTitle(prefix, options);

  //style bar chart title
  styleBarChartTitle(prefix, options);



  //draw axes
  drawAxes(prefix, width, height);

  //add axis labels
  addAxisLabels(prefix, options);

  //style and position axis labels




  //To adjust the position of y axis label based on the number of digits in maximum value
  if (maxValue >= 100 && maxValue < 1000) {
    yaxisLabelLeftMargin = -165;
  } else if (maxValue > 1000) {
    yaxisLabelLeftMargin = -185;
  }

  //style and position axis labels
  styleAxesLabels(prefix, options, height, yaxisLabelLeftMargin);

  //adding tick values
  addTickValues(prefix, options, maxValue, height);

  //creating box for identifying each bar
  addValueBox(prefix, data, options, noOfBars, width);

  //draw bars
  drawBar(prefix, noOfBars, data);

  //style bars
  styleBars(prefix, noOfBars, options, data, height, maxValue, width);

}
//API for bar chart ends

/* Function for adding Bar Chart Title starts*/
function addBarChartTitle(prefix, options) {
  $("." + prefix + "barContainer").append("<h1 class=\"" + prefix + "barTitle\">" + options.barTitle + "</h1>");
}
/* Function for adding Bar Chart Title ends*/

/* Function for styling Bar Chart Title starts*/
function styleBarChartTitle(prefix, options) {
  $("." + prefix + "barTitle").css({ "color": options.titleColor, "font-size": options.titleFontSize + "px" });
}
/* Function for styling Bar Chart Title ends*/



/* Function for drawing axes start*/
function drawAxes(prefix, width, height) {
  $("." + prefix + "barContainer").append("<div class=\"" + prefix + "barChart\"></div>");
  $("." + prefix + "barChart").css({
    "width": width + "px", "height": height + "px", "border-left": "2px solid black",
    "border-bottom": "2px solid black", "display": "inline-block"
  });
}
/* Function for drawing axes end */


/* Function for adding labels for x axis and y axis starts */
function addAxisLabels(prefix, options) {
  $("." + prefix + "barChart").append("<h2 class=\"" + prefix + "yaxis\">" + options.yAxis + "</h2>");
  $("." + prefix + "barContainer").append("<h2 class=\"" + prefix + "xaxis" + "\">" + options.xAxis + "</h2>");
}
/* Function for adding labels for x axis and y axis ends */


/* Function to style axes labels start */
function styleAxesLabels(prefix, options, height, yaxisLabelLeftMargin) {
  $("." + prefix + "yaxis").css({
    "position": "absolute", "margin-left": yaxisLabelLeftMargin + "px", "height": "200px", "transform": "rotate(-90deg)",
    "margin-top": height / 3 + "px", color: options.labelColor
  });

  $("." + prefix + "xaxis").css({ "align": "center", "height": "200px", color: options.labelColor, "padding-top": "90px" });
}
/* Function to style axes labels end */


/* Function to find the maximum value of the data starts*/
function getMaxValue(data, options) {
  let maxValue;
  //Maximum value is the maximum of data values and the tick values
  //finds the maximum of the data values
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].value.length; j++) {
      if (maxValue === undefined) {
        maxValue = data[i].value[j];
      } else if (data[i].value[j] > maxValue) {
        maxValue = data[i].value[j];
      }
    }
  }
  //compares with the tick values to get the maximum value
  for (let j = 0; j < options.tickValues.length; j++) {
    if (maxValue === undefined) {
      maxValue = options.tickValues[j];
    } else if (options.tickValues[j] > maxValue) {
      maxValue = options.tickValues[j];
    }

  }
  return maxValue;
}
/* Function to find the maximum value of the data ends*/

/* Function to add tick values start */
function addTickValues(prefix, options, maxValue, height) {
  let tickCount = options.tickValues.length;


  //Creating tick marks using horizontal line and also adding tick values
  for (let i = 0; i < tickCount; i++) {
    $("." + prefix + "barChart").append("<h2 class=\"" + prefix + "tickValue" + i + "\">" + options.tickValues[i] +
      "</h2><hr class=\"" + prefix + "hr" + i + "\">");
  }

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
/* Function to add tick values end */

/* Function to draw box for identifying each bar start */
function addValueBox(prefix, data, options, noOfBars, width) {

  if (data[0].value.length > 0) {
    $("." + prefix + "barChart").append("<div class=\"" + prefix + "valueBox flexColumn\"></div>");
    for (let j = 0; j < noOfBars; j++) {
      $("." + prefix + "valueBox").append("<div class=\"flexRow\"><div class=\"" + prefix + "valueIcon" + j + "\"" +
        "></div><p class=\"" + prefix + "barName" + j + "\">" + options.barLabels[j] + "</p></div>");
    }

  }

  $("." + prefix + "valueBox").css({
    "position": "absolute", "width": "250px", "height": "200px",
    "margin-left": width + 50 + "px", "margin-top": "150px"
  });
  $(".flexRow").css({ "display": "flex", "flex-direction": "row" });
  for (let j = 0; j < noOfBars; j++) {

    $("." + prefix + "valueIcon" + j).css({ "background-color": options.barColor[j], "width": "20px", "height": "20px", "margin": "20px" });
    $("." + prefix + "barName" + j).css({ "color": "black", "margin": "20px", "height": "20px" });
  }
}
/* Function to draw box for identifying each bar end */

/* function to draw individual bar start*/
function drawBar(prefix, noOfBars, data) {


  // To align elements as a row using the class flexRow
  $("." + prefix + "barChart").append("<div class=\"flexRow\"></div>");

  for (let i = 0; i < data.length; i++) {
    //using flexColumn to arrange elements as a column
    $("." + prefix + "barChart > .flexRow").append("<div class=\"flexColumn\"></div>");



    $($("." + prefix + "barChart > .flexRow  > .flexColumn")[i]).append("<div class=\"flexRow\"></div>");
    for (let j = 0; j < noOfBars; j++) {

      $($("." + prefix + "barChart > .flexRow > .flexColumn > .flexRow")[i]).append("<div class=\"" +
        prefix + "bar" + " " + prefix + "bar" + i + "B" + j + "\"><p>" + data[i].value[j] + "</p></div>");

    }


    $($("." + prefix + "barChart > .flexRow  > .flexColumn")[i]).append("<h2>" + data[i].label + "</h2>");



    $("." + prefix + "barChart > .flexRow").append("<div class=\"" + prefix + "space\"></div>");


  }


}

/* function to draw individual bar end*/

/* function to style bar starts*/
function styleBars(prefix, noOfBars, options, data, height, maxValue, width) {

  let spaceWidth = options.barSpacing;
  let valueCount = data.length;

  //bar Width is computed based on the value count
  let barWidth = ((width - (spaceWidth * valueCount)) / valueCount) / noOfBars;

  for (let i = 0; i < data.length; i++) {


    $(".flexColumn").css({ "display": "flex", "flex-direction": "column" });
    $(".flexRow").css({ "display": "flex", "flex-direction": "row" });

    //computing bar height based on the maximum value
    for (let j = 0; j < noOfBars; j++) {
      let barHeight = (data[i].value[j] / maxValue) * height;

      $("." + prefix + "bar" + i + "B" + j).css({
        "height": barHeight + "px", "margin-top": (height - barHeight) + "px",
        "background-color": options.barColor[j]
      });
    }
  }

  $("." + prefix + "bar").css({ "width": barWidth + "px", "border": "1px solid black" });
  $("." + prefix + "space").css("width", spaceWidth + "px");

  $("." + prefix + "barChart").css("position", "relative");
}
/* function to style bar ends*/

