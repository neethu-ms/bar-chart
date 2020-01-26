# bar-chart
A bar chart library to draw single valued and multi valued bar chart

# Prerequisites
1. jQuery library is required

# Function parameters for Single Valued Bar Chart

1. data - An array of objects
   a. label(x axis) and value(y axis) are the object attributes
   b. label should be a string and value should be numerical
      eg. let data = [{label:"1990",value:300},{label:"2000", value:200}];
  
2. options 
   a. width should be provided in pixel ( width of the bar chart container)
   b. height should be provided in pixel ( height of the bar chart container)
   c. multiValue - Needs to give boolean value. For single valued bar chart it should be false 
   d. width and height should be provided as numeric 
   d. valuePosition - position of the value inside bar
   e. barColor, labelColor, titleColor - color of bar, label and title respectively
   f. titleFontSize - font size of title 
   g. barTitle, xAxis,yAxis - title of bar diagaram, x axis and y axis respectively
   h. tickValues - values that should show tick 
   i. barSpacing - space between the bars. Should be numeric.
      eg. let  let options = {
        width: 700,
        height: 500,
        multiValue: false,
        valuePosition: "top",
        barColor: "brown",
        labelColor: "blue",
        barSpacing: 50,
        tickValues: [0, 2, 4],
        barTitle: "Seat Distribution",
        titleFontSize: 100,
        titleColor: "red",
        xAxis: "Seat Name",
        yAxis: "Seat Count"
      };

3. element 
   Bar chart will be added inside the element at the end 
   

