let barCount = 0; //To keep track of the bar chart count

/*API for bar chart starts*/
function drawBarChart(data, options, element) {
  let prefix = "A" + barCount; // prefix is used to avoid overlapping of styles of bar charts when multiple bar charts are drawn in a single html page
  barCount++;
  $(element).append('<div class="' + prefix + 'barContainer"></div>'); //Added a div element for bar chart. All the components of bar chart are added to this
  addAndStyleBarChartTitle(prefix, options, "." + prefix + "barContainer"); //Add bar chart title and style it
  drawBarChartDiagram(prefix, options, data, "." + prefix + "barContainer"); //draw bar chart diagram


} //API for bar chart ends

/* Function for adding Bar Chart Title starts*/
function addAndStyleBarChartTitle(prefix, options, element) {
  $(element).append(
    '<h1 class="' + prefix + 'barTitle">' + options.barTitle + "</h1>"
  );
  styleBarChartTitle(options, "." + prefix + "barTitle"); //style bar chart title
} /* Function for adding Bar Chart Title ends*/

/* Function for styling Bar Chart Title starts*/
function styleBarChartTitle(options, element) {
  $(element).css({
    color: options.titleColor,
    "font-size": options.titleFontSize + "px"
  });
}
/* Function for styling Bar Chart Title ends*/

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

/* Function for drawing axes start*/
function drawBarChartDiagram(prefix, options, data, element) {
  let maxValue = getMaxValue(data, options); // Finding maximum value

  //the entire bar chart diagram is in a div
  $(element).append(
    '<div class="' + prefix + 'barChart"></div>'
  );
  $("." + prefix + "barChart").css({ "display": "inline-block" });  // To add absolute positions for child elements

  drawAxes(options, "." + prefix + "barChart"); //draw Bar chart axes
  addAndStyleAxisLabels(prefix, options, element, "." + prefix + "barChart", maxValue); //add axis labels
  addTickValues(prefix, options, "." + prefix + "barChart", maxValue); //adding tick values
  addAndStyleValueBox(prefix, data, options, "." + prefix + "barChart"); //creating box for identifying each bar
  drawAndStyleBar(prefix, data, options, "." + prefix + "barChart", maxValue); //draw bars

}

/* Function for drawing axes start */

function drawAxes(options, element) {
  let width = options.width;
  let height = options.height;
  $(element).css({
    width: width + "px",
    height: height + "px",
    "border-left": "2px solid black",
    "border-bottom": "2px solid black"

  });
}

/* Function for drawing axes end */

/* Function for adding labels for x axis and y axis starts */
function addAndStyleAxisLabels(prefix, options, element1, element2, maxValue) {
  $(element1).append(
    '<h2 class="' + prefix + "xaxis" + '">' + options.xAxis + "</h2>"
  );
  $(element2).append(
    '<h2 class="' + prefix + 'yaxis">' + options.yAxis + "</h2>"
  );

  styleAxesLabels(options, "." + prefix + "xaxis", "." + prefix + "yaxis", maxValue); //style and position axis labels

}
/* Function for adding labels for x axis and y axis ends */

/* Function to style axes labels start */
function styleAxesLabels(options, element1, element2, maxValue) {
  let height = options.height;
  let yaxisLabelLeftMargin = -90;
  //To adjust the position of y axis label based on the number of digits in maximum value
  if (maxValue >= 100 && maxValue < 1000) {
    yaxisLabelLeftMargin = -165;
  } else if (maxValue > 1000) {
    yaxisLabelLeftMargin = -185;
  }

  $(element1).css({
    align: "center",
    height: "200px",
    color: options.labelColor,
    "padding-top": "90px"
  });

  $(element2).css({
    position: "absolute",
    "margin-left": yaxisLabelLeftMargin + "px",
    height: "200px",
    transform: "rotate(-90deg)",
    "margin-top": height / 3 + "px",
    color: options.labelColor
  });


}
/* Function to style axes labels end */

/* Function to add tick values start */
function addTickValues(prefix, options, element, maxValue) {
  let tickCount = options.tickValues.length;
  let height = options.height;
  //Creating tick marks using horizontal line and also adding tick values
  for (let i = 0; i < tickCount; i++) {
    $(element).append('<h2 class="' + prefix + "tickValue" + i + '">' + options.tickValues[i] + '</h2>');
    $(element).append('<hr class="' + prefix + "hr" + i + '">');
  }
  for (let i = 0; i < tickCount; i++) {
    let tickDistance = (options.tickValues[i] / maxValue) * height;
    $("." + prefix + "hr" + i).css({
      position: "absolute",
      width: "40px",
      height: "2px",
      "margin-left": "-20px",
      "margin-top": height - tickDistance + "px",
      "margin-bottom": "0px"
    });
    $("." + prefix + "tickValue" + i).css({
      position: "absolute",
      "margin-left": "-65px",
      "margin-top": height - tickDistance - 10 + "px",
      "margin-bottom": "0px",
      width: "40px"
    });
  }
}
/* Function to add tick values end */

/* Function to draw box for identifying each bar start */
function addAndStyleValueBox(prefix, data, options, element) {
  let noOfBars = data[0].value.length;
  let width = options.width;
  if (data[0].value.length > 0) {
    $(element).append(
      '<div class="' + prefix + 'valueBox flexColumn"></div>'
    );
    for (let j = 0; j < noOfBars; j++) {
      $("." + prefix + "valueBox").append(
        '<div class="flexRow"><div class="' +
        prefix +
        "valueIcon" +
        j +
        '"' +
        '></div><p class="' +
        prefix +
        "barName" +
        j +
        '">' +
        options.barLabels[j] +
        "</p></div>"
      );
    }
  }

  $("." + prefix + "valueBox").css({
    position: "absolute",
    width: "250px",
    height: "200px",
    "margin-left": width + 50 + "px",
    "margin-top": "150px"
  });
  $(".flexRow").css({ display: "flex", "flex-direction": "row" });
  for (let j = 0; j < noOfBars; j++) {
    $("." + prefix + "valueIcon" + j).css({
      "background-color": options.barColor[j],
      width: "20px",
      height: "20px",
      margin: "20px"
    });
    $("." + prefix + "barName" + j).css({
      color: "black",
      margin: "20px",
      height: "20px"
    });
  }
}
/* Function to draw box for identifying each bar end */

/* function to draw individual bar start*/
function drawAndStyleBar(prefix, data, options, element, maxValue) {
  let noOfBars = data[0].value.length;
  // To align elements as a row using the class flexRow
  $(element).append('<div class="flexRow"></div>');

  for (let i = 0; i < data.length; i++) {
    //using flexColumn to arrange elements as a column
    $(element + " > .flexRow").append(
      '<div class="flexColumn"></div>'
    );

    $($(element + " > .flexRow  > .flexColumn")[i]).append(
      '<div class="flexRow"></div>'
    );
    for (let j = 0; j < noOfBars; j++) {
      $(
        $(element + " > .flexRow > .flexColumn > .flexRow")[i]
      ).append(
        '<div class="' +
        prefix +
        "bar" +
        " " +
        prefix +
        "bar" +
        i +
        "B" +
        j +
        '"><p class="valueStyle">' +
        data[i].value[j] +
        "</p></div>"
      );

      //style bar
      styleBar(prefix, options, data, maxValue, "." + prefix +
        "bar" +
        i +
        "B" +
        j, i, j);
      //position bar value
      positionValue(options, "." + prefix +
        "bar" +
        i +
        "B" +
        j, ".valueStyle");
    }

    $($(element + " > .flexRow  > .flexColumn")[i]).append(
      "<h2>" + data[i].label + "</h2>"
    );

    $(element + " > .flexRow").append(
      '<div class="' + prefix + 'space"></div>'
    );
  }
}

/* function to draw individual bar end*/

/* function to style bar starts*/
function styleBar(prefix, options, data, maxValue, element, i, j) {
  let noOfBars = data[0].value.length;
  let height = options.height;
  let width = options.width;
  let spaceWidth = options.barSpacing;
  let valueCount = data.length;

  //bar Width is computed based on the value count
  let barWidth = (width - spaceWidth * valueCount) / valueCount / noOfBars;


  $(".flexColumn").css({ display: "flex", "flex-direction": "column" });
  $(".flexRow").css({ display: "flex", "flex-direction": "row" });

  //computing bar height based on the maximum value
  let barHeight = (data[i].value[j] / maxValue) * height;

  $(element).css({
    height: barHeight + "px",
    "margin-top": height - barHeight + "px",
    "background-color": options.barColor[j]
  });

  $("." + prefix + "bar").css({
    width: barWidth + "px",
    border: "1px solid black"

  });
  $("." + prefix + "space").css("width", spaceWidth + "px");
}
/* function to style bar ends*/

/* Function for positioning bar values */
function positionValue(options, element1, element2) {

  // To position the value inside the bar.

  $(element1).css({ "display": "flex" });
  if (options.valuePosition === "top")
    $(element1).css({ "align-items": "flex-start" });
  else if (options.valuePosition === "center")
    $(element1).css({ "align-items": "center" });
  else
    $(element1).css({ "align-items": "flex-end" });

  $(element2).css({ "margin": "0 auto" });
}
