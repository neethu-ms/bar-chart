# bar-chart
A bar chart library to draw single valued and multi valued bar chart

# Prerequisites
1. jQuery library is required

# Function parameters for Bar Chart

1. data - An array of objects
   a. label(x axis) and value(y axis) are the object attributes
   b. label should be a string and value should an array of numerical values
      eg. let data = [{label:"1990",value:300},{label:"2000", value:[200]}];
  
2. options 
   a. width should be provided in pixel ( width of the bar chart container)
   b. height should be provided in pixel ( height of the bar chart container)
   c. width and height should be provided as numeric 
   d. valuePosition - position of the value inside bar
   e. barColor, labelColor, titleColor - color of bar, label and title respectively
   f. titleFontSize - font size of title 
   g. barTitle, xAxis,yAxis - title of bar diagaram, x axis and y axis respectively
   h. tickValues - values that should show tick 
   i. barSpacing - space between the bars. Should be numeric.
   j. barColor - colors of individual bars 
   h. barNames - Names of individual bars 
      eg. options = {
        width: 700,
        height: 500,
        valuePosition: "top",
        barColor: ["yellow","brown","violet"],
        labelColor: "green",
        barSpacing: 50,
        tickValues: [0,50,100,150,200],
        barTitle: "Canada Population",
        titleFontSize: 50,
        titleColor: "red",
        xAxis: "Year",
        yAxis: "Population in Lakhs",
        barNames:["children","elderly","others"]
      };
3. element 
   Bar chart will be added inside the element at the end 
   

