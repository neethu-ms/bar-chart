# bar-chart.js

A bar chart library to draw single valued and multi valued bar chart

## Prerequisites

1. jQuery library is required

## API function to be used

   drawBarChart(data, options, element);  
   This function will accept the data values of the graph. Based on the data values and options will draw the graph in the specified element.

## Function parameters for Bar Chart

1. data - An array of objects

   a. label(x axis) and value(y axis) are the object attributes
   b. label should be a string and value should be an array of numerical values

      eg.
            data = [{
                label: "2015",
                value: [50, 50, 100]
            }, {
                label: "2016",
                value: [100, 50, 100]
            }, {
                label: "2017",
                value: [100, 60, 130]
            }, {
                label: "2018",
                value: [110, 70, 140]
            }, {
                label: "2019",
                value: [110, 70, 195]
            }];

2. options

   a. width should be provided in pixel ( width of the bar chart container). It should be numeric.  
   b. height should be provided in pixel ( height of the bar chart container). It should be numeric.  
   c. valuePosition - position of the value inside bar. It should be string ( can be "top", "bottom" or "center")  
   d. barColor - colors of individual bars. It should be an array of strings  
   e. labelColor - color of  label(x and y). It should be string.  
   f. barSpacing - space between the bars in px. Should be numeric.  
   g. tickValues - values that should show tick. Should be an array of numbers.  
   f. titleFontSize - font size of title.  
   g. barTitle, xAxis, yAxis - title of bar diagaram, x axis and y axis respectively. All these should be string.  
   h. titleFontSize - font size of the title in px. Should be numeric.  
   i. titleColor - color of the bar title. It should be string.  
   h. barLabels- Names of individual bars. It should be an array of string  

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
        barLabels: ["children","elderly","others"]  
      };  

3. element

   Bar chart will be added inside the element at the end

4. All the arguments are mandatory.
5. Count of values for individual bar and the count of barcolor and barLabels should be same

     eg.
        value: [110, 70, 195]  
        barColor: ["yellow", "brown", "violet"]  
        barLabels:["children", "elderly", "others"]  

## Example Bar Charts

![barchart1](images/barchart1.png)  
![barchart2](images/barchart2.png)  

## GitHub page

   <https://neethu-ms.github.io/bar-chart/>  

## Known bugs/issues

1. It is mandatory to give all the values for the api function. Code will be further modified by making some arguments as optional.

## Future Enhancements

1. Accept table as data values.
2. Add more options like adding animation for bar chart.

## References

   1. <https://www.google.com/search?q=different+bar+charts+population+of+year+example&sxsrf=ACYBGNTmdW--9NRbJKd8G3zkwoxOcQKNLg:1579538290570&tbm=isch&source=iu&ictx=1&fir=UFoc6i9TuIvaaM%253A%252CHPz2_k8-Xif6GM%252C_&vet=1&usg=AI4_-kTmxYnf_7Q0JERGXanIyT8Yg0gjHg&sa=X&ved=2ahUKEwjew9_VzpLnAhVOLs0KHUlKBZQQ9QEwAHoECAoQBQ#imgrc=1FrTqxB95uvwZM>  

   2. <https://www.w3schools.com/html/html_tables.asp>  
   3. <https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1710000501>  
   4. <https://www.w3schools.com/html/html_css.asp>  
   5. <https://www.w3schools.com/jquery/jquery_css.asp>  
   6. <https://www.w3schools.com/jquery/html_append.asp>
   7. <https://www.htmlgoodies.com/beyond/css/css-ref/create-a-chart-plot-line-using-a-pure-html-and-css-solution.html>  
   8. <https://stackoverflow.com/questions/4264527/vertical-text-direction>  
   9. <https://www.freecodecamp.org/news/how-to-center-things-with-style-in-css-dc87b7542689/>  
   10. <https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#images>  
   11. <https://gist.github.com/shaunlebron/746476e6e7a4d698b373>  
   12. <https://code.visualstudio.com/docs/languages/markdown>  
