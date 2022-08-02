// UCD Module 12 Challenge
// https://courses.bootcampspot.com/courses/1225/assignments/24805?module_item_id=499045
//
// (Deliverable 1 instructions to download BellyButton_bar_char_starter_code.js, 
// then rename the file as chart.js [this file].)
//
// Overall, the code in this chart.js file is broken down into 3 parts:
//    (A) Dynamically Generate Dropdown Menu Items
//    (B) Display the argument taken when a user selects a dropdown menu item onto the browser's console
//    (C) Print/display information to the web page's Demographic Info panel
//          (1) Demographics Panel
//          (2) Deliverable 1 Bar Chart
//          (3) Deliverable 2 Bubble Chart
//          (4) Deliverable 3 Gauge
//
// This file (chart.js) works in conjunction with the index.html (which is that GitHub Pages displays onto the web browser.)
// https://michaelfoz.github.io/Belly-Button-Biodiversity-Dashboard/
//
// ___________________________________________________________________________________________________________

// (A) Dynamically Generate Dropdown Menu Items

// (All the code to Dynamically Generate Dropdown Menu Items is inside of the init() function.)

function init() {
  // (Grab a reference to the dropdown select element.)
  //    d3.select() method is used to select the dropdown menu from the index.html file
  //    (which has an id of #selDataset).
  //    The dropdown menu is assigned to the variable [selector].
  var selector = d3.select("#selDataset");

  // (Use the list of sample names to populate the select options.)
  //    d3.json() method is used to read the data from samples.json.
  //    (Data from the entire JSON file is assigned the (arbitrary) argument name [data].)
  d3.json("static/js/samples.json").then((data) => {
    console.log(data);

    // Inside the data object, the names array--as seen from console.log(data)--contains the ID numbers of all the study participants. 
    // (The variable sampleNames is assigned to this array.)

    var sampleNames = data.names;

    // forEach() method is called on the sampleNames array.
    // (For each element in the array, a dropdown menu option is appended.)
    //  
    //    The text of each dropdown menu option is the ID. 
    //    Its value property is also assigned the ID.
    //
    //        Example: ID "940" is the first element of the sampleNames array.
    //                 As the forEach() method iterates over the first element of the array,
    //                 a menu option is appended to the dropdown menu;
    //                    the menu option is given the text that's seen in the dropdown menu ("940").
    //
    //        (The forEach() method will perform the same tasks for the continuing array elements ("941" and so on..).
    //
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}


init(); // Calls the init() function defined above/this initializes the dashboard.

    // Self-notes:
    //
    //
    // In Module 12:.4.2: Create a Dynamic Plotly Chart,
    // the dropdown menu examples we have seen had hard-coded menu options.
    // https://courses.bootcampspot.com/courses/1225/pages/12-dot-4-2-create-a-dynamic-plotly-chart?module_item_id=499019
    //
    //  index.html code:
    //        <select id="dropdownMenu">
    //          <option value="dataset1">DataSet1</option>
    //          <option value="dataset2">DataSet2</option>
    //        </select>
    //
    // 
    // Now, with the belly button data, the dropdown menu options are generated dynamically.
    //
    //  index.html code:
    //        <select id="selDataset" onchange="optionChanged(this.value)"></select>
    //
    //  (1) The <select> tag indicates a dropdown menu. Its id is selDataset.
    //  (2) The <select> tag now has an additional attribute, called onchange, 
    //      which is associated with the optionChanged()function.
    //  (3) When a change takes place in the dropdown menu, the optionChanged() function is called.
    //  (4) The argument for the optionChanged() function is this.value.
    //  (5) Here, [this] refers to the dropdown menu. 
    //      this.value therefore returns to the value attribute of the current dropdown menu selection.
    //
    //         (The JavaScript keyword this is used to access the object in question. 
    //          In the context of an event, it refers to the HTML element that received the event. 
    //          In this case, this refers to the dropdown menu.)

// ___________________________________________________________________________________________________________

// (B) Display the argument taken when a user selects a dropdown menu item onto the browser's console

// optionChanged() function takes in an argument, named newSample, and logs it to the browser console.
//
//    (This function is declared in this file [chart.js], but it is never called in this file [chart.js].)
//     Unlike the init() function (which is both declared and called in chart.js.), 
//     optionChanged() is instead called by the onchange attribute of the dropdown menu in index.html.
//
// (Fetch new data each time a new sample is selected.)
//    The argument name newSample refers to the value of the selected menu option.
function optionChanged(newSample) {

        // |---in index.htmnl:-----------------------------------------------------------|
        // |                                                                             |
        // | onchange=optionChanged(this.value) passes the selected menu option's value  |
        // | to the optionChanged() function in this file (chart.js)                     |
        // |                                                                             |
        // | (i.e., this.value in index.html and newSample are equivalent.)              |
        // |                                                                             |
        // |-----------------------------------------------------------------------------|

  // When an option is selected, its value is printed to the browser console.
  console.log(newSample); 

  // (This function inserted for part C: Print information to the web page's Demographic Info panel.)
  buildMetadata(newSample);

  // (This function inserted for part C: Print information to the web page's Demographic Info panel.)
  buildCharts(newSample);

}

// ___________________________________________________________________________________________________________

// (C) Print information to the web page's Demographic Info panel

// The next task is to print information to the Demographic Infopanel: 
// once a user selects an ID number, the associated volunteer's demographic information 
// needs to be filtered from samples.json and placed in the panel.
//
//    When a change takes place to the dropdown menu, 
//    two things will need to occur:
//
//      (1) The demographic information panel is populated 
//          with a specific volunteer's information.
//      (2) The volunteer's data is visualized in a separate div.
//      (These 2 tasks should be modularized i.e.,the code statements required to perform each task should be packaged as a separate function.)
//
//            These 2 functions are now placed inside the optionChanged() function.
//              (1) buildMetadata(newSample);
//              (2) buildCharts(newSample);
//
//            (Now, the optionChanged() function is called from index.html and, in turn, calls
//              buildMetadata() and buildCharts().)
//            (These two functions will use the ID number to create that specific 
//              individual's information panel and charts, respectively.)
//
//
// Demographics Panel:
//
// function buildMetadata takes in [sample (aka an ID number)] as its argument
// (When a dropdown menu option is selected, the ID number is passed as [sample].)
function buildMetadata(sample) {
  // d3.json pulls entire dataset contained in samples.json; once dataset is read in, it is referred to as [data].
  d3.json("static/js/samples.json").then((data) => { 

    // variable [metadata] = the metadata array in the dataset (aka [data.metadata])
    var metadata = data.metadata;

    // (Filter the data for the object with the desired sample number.)
    //    the filter() method is called on the metadata array to filter for an object in the array; an array is returned after calling this method.
    //    (The id property of the object in the array should match the ID number passed into buildMetadata() as [sample].)
    //    (*Each object in the metadata array contains information about 1 person.*)
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);

    // Because the results of the filter() method are returned as an array, the first item in the array (resultArray) is selected and assigned to the variable result.
    // (First item = index 0.)
    var result = resultArray[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    //    Because the id of the Demographhic Info panel is sample-metadata, 
    //    the d3.select() method is used to select this <div> and the variable [PANEL] is assigned to it.

        // |---in index.htmnl:-----------------------------------------------------------|
        // |                                                                             |
        // | <div id="sample-metadata" class="panel-body"></div>                         |
        // |                                                                             |
        // |-----------------------------------------------------------------------------|
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    //    PANEL.html("") ensures that the contents of the panel are cleared when 
    //    another ID number is chosen from the dropdown menu.
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    //    Display the result (i.e., information found that matches the first item--index 0--in the array returned).
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

//              [Start of Deliverable 1]

// [Deliverable 1 Step 1] Create the buildCharts function (bar chart):
// (This function works similarly to the one buildMetadata() above.)
function buildCharts(sample) {

  // [Deliverable 1 step 2] Use d3.json to load and retrieve the samples.json file.
  //    d3.json pulls entire dataset contained in samples.json; once dataset is read in, it is referred to as [data].
  d3.json("static/js/samples.json").then((data) => {

    // [Deliverable 1 step 3] Create a variable that holds the samples array. 
    //    variable [samples] = the samples array in the dataset (aka [data.samples])
    var samples = data.samples;

    // [Deliverable 1 step 4] Create a variable that filters the samples for the object with the desired sample number.
    // (Filter the data for the object with the desired sample number.)
    //    the filter() method is called on the metadata array to filter for an object in the array; an array is returned after calling this method.
    //    (The id property of the object in the array should match the ID number passed into buildMetadata() as [sample].)
    //    (*Each object in the metadata array contains information about 1 person.*)
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);

    // [Deliverable 1 step 5] Create a variable that holds the first sample in the array.
    //    Because the results of the filter() method are returned as an array, the first item in the array (resultArray) is selected and assigned to the variable result.
    //    (First item = index 0.)
    var result = resultArray[0];

    // [Deliverable 3 step 1] Create a variable that filters the metadata array for an object in the array whose id property matches the ID number passed into buildCharts() function as the argument.
    var metadataArray = data.metadata.filter(sampleObj => sampleObj.id == sample);

    // [Deliverable 3 step 2] Create a variable that holds the first sample in the metadata array.
    var metadata = metadataArray[0];

    // [Deliverable 3 step 3] Create a variable that converts the washing frequency to a floating point number.
    var washFrequency = parseFloat(metadata.wfreq);
    
    // [Deliverable 1 step 6] Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    // [Deliverable 1 step 7] Create the yticks for the bar chart.
    //    Hint: Get the the top 10 otu_ids and map them in descending order 
    //          so the otu_ids with the most bacteria are last. 
    //          *Chain the slice() method with the map() and reverse() functions to retrieve the top 10 otu_ids sorted in descending order.*
    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // [Deliverable 1 step 8] Create the trace for the bar chart. 
    var barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];
    // [Deliverable 1 step 9] Create the layout for the bar chart. 
    var barLayout = {
      title: "<b>Top 10 Bacteria Cultures Found</b>",
      font: {color: "black", family: "helvetica"}
    };
    
    // [Deliverable 1 step 10] Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

//              [End of Deliverable 1]



    //              [Start of Deliverable 2]

    // [Deliverable 2] Create Bubble Chart within the buildCharts() function:

    // [Deliverable 2 step 1] create the trace object for the bubble chart.
    //    (a) Assign the otu_ids, sample_values, and otu_labels to the x, y, and text properties, respectively.
    //    (b) For the mode and marker properties, the mode is "markers" and the marker property is a dictionary that defines the size, color, and colorscale of the markers.
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          // Color scale from: https://plotly.com/javascript/colorscales/#picnic-colorscale
          colorscale: "Custom Contour Plot Colorscale"
        }
      }
    ];

    // [Deliverable 2 step 2] Create a layout for bubble chart.
    var bubbleLayout = {
      title: "<b>Bacteria Cultures Per Sample</b>",
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      font: {color: "black", family: "helvetica"}
    };

    // [Deliverable 2 step 3] Lastly, use the given Plotly.newPlot() function to plot the trace object and layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    //              [End of Deliverable 2]



    //              [Start of Deliverable 3]

    // [Deliverable 3] Create a Gauge within the buildCharts() function:

    //      (Deliverable 3 steps 1-3 inside Deliverable 1)

    // [Deliverable 3 step 4] Create the trace object for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        // Assign the variable created in Step 3 to the value property.
        value: washFrequency,
        //  For the title object, assign the title as a string using HTML syntax to the text property.
        title: { text: "<b>Belly Button Washing Frequency</b> <br> <b>(Scrubs per Week)</b>"},
        // The type property should be "indicator".
        type: "indicator",
        // The mode property should be "gauge+number".
        mode: "gauge+number",
        gauge: {
          // For maximum range for the gauge should be 10.
          axis: { range: [null, 10] },
          //  Set the bar color of the gauge to black or a dark color to contrast against the range colors.
          bar: { color: "grey" },
          // Assign different colors as string values in increments of 2 for the steps object. 
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "lightcoral" },
            { range: [4, 6], color: "khaki" },
            { range: [6, 8], color: "lightgreen" },
            { range: [8, 10], color: "chartreuse" }
          ],
        }
      }
    ];
    
    // [Deliverable 3 step 5] create the layout for the gauge chart making sure that it fits in the <div></div> tag for the gauge id.
    var gaugeLayout = { 
      width: 490, 
      height: 400, 
      margin: { t: 0, b: 0 },
      font: {color: "black", family: "helvetica"}
    };

    // [Deliverable 3 step 6] use the Plotly.newPlot() function to plot the trace object and the layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);

    //              [End of Deliverable 3]

  });
}

// ___________________________________________________________________________________________________________



// Deliverable 1: Create a Horizontal Bar Chart (35 points)
// Using your knowledge of JavaScript, Plotly, and D3.js, create a horizontal bar chart to display the top 10 bacterial species (OTUs) when an individual’s ID is selected from the dropdown menu on the webpage. The horizontal bar chart will display the sample_values as the values, the otu_ids as the labels, and the otu_labels as the hover text for the bars on the chart.
//
// Your bar chart should look like the image.
//
// [x] Download the BellyButton_bar_chart_starter_code.js, add it to the js folder of your GitHub pages (GitHub.io) folder, and rename the file charts.js. Use the instructions below to add code where indicated by the numbered-step comments in the starter code file.
//
//
//
// In Steps 3-6, you’ll initialize variables that hold arrays for the sample that is selected from the dropdown menu on the webpage.
//
//  IMPORTANT
//  Make sure that you use console.log() to help debug any issues.
//
// [x] 1. In Step 1, we’ve provided the code for the buildCharts(); function that contains the argument sample, which is the sample that is selected from the dropdown menu.
// [x] 2. In Step 2, we’ve provided the code to retrieve the samples.json file using the d3.json().then() method.
// [x] 3. In Step 3, create a variable that has the array for all the samples.
// [x] 4. In Step 4, create a variable that will hold an array that contains all the data from the new sample that is chosen from the dropdown menu. To retrieve the data from the new sample, filter the variable created in Step 3 for the sample id that matches the new sample id chosen from the dropdown menu and passed into the buildCharts() function as the argument.
// [x] 5. In Step 5, create a variable that holds the first sample in the array.
//        NOTE 
//        You can combine Steps 4 and 5 as one line of code, but make sure you use the correct variable name for Step 6 when retrieving the array data.
// [x] 6. In Step 6, create variables that have arrays for otu_ids, otu_labels, and sample_values.
// [x] 7. In Step 7, create the yticks for the bar chart.
//        HINT
//        Chain the slice() method with the map() and reverse() functions to retrieve the top 10 otu_ids sorted in descending order.
//
// In Steps 8-10, create the trace object, the layout, and Plotly.newPlot() function for the horizontal bar chart.
//
// [X] 8. In Step 8, create the trace object for the bar chart, where the x values are the sample_values and the hover text for the bars are the otu_labels in descending order.
// [X] 9. In Step 9, create the layout for the bar chart that includes a title.
// [X] 10. In Step 10, use the Plotly.newPlot() function to plot the trace object with the layout.
//
// ___________________________________________________________________________________________________________
//
// Deliverable 2: Create a Bubble Chart (30 points)
// Using your knowledge of JavaScript, Plotly, and D3.js, create a bubble chart that will display the following when an individual’s ID is selected from the dropdown menu webpage:
// (1) The otu_ids as the x-axis values.
// (2) The sample_values as the y-axis values.
// (3) The sample_values as the marker size.
// (4) The otu_ids as the marker colors.
// (5) The otu_labels as the hover-text values.
//
// Your bubble chart should look like the image.
//
// [x] Download the BellyButton_bubble_chart_starter_code.js file, copy the starter code from Steps 1-3, 
//     and add it to your charts.js file after Step 10 for Deliverable 1.
//
// Use the variables that were created in Deliverable 1 to populate the bubble chart. Then, use the instructions below to write the code for the trace object, the layout, and Plotly.newPlot() function to create the bubble chart.
//
// [x] 1. To create the trace object for the bubble chart do the following:
//       [x] (a) Assign the otu_ids, sample_values, and otu_labels to the x, y, and text properties, respectively.
//       [x] (b) For the mode and marker properties, the mode is "markers" and the marker property is a dictionary that defines the size, color, and colorscale of the markers.
//        HINT
//        Using d3.select(), you can select the element that has changed and retrieve the property and HTML id that have changed.
//        https://plotly.com/javascript/bubble-charts/#hover-text-on-bubble-charts
//
// [x] 2. To create the layout for the bubble chart, add a title, a label for the x-axis, margins, and the hovermode property. The hovermode should show the text of the bubble on the chart when you hover near that bubble.
//        HINT
//        Using d3.select(), you can select the element that has changed and retrieve the property and HTML id that have changed.
//        https://plotly.com/python-api-reference/generated/plotly.graph_objects.Layout.html
//
// [x] 3. Lastly, use the given Plotly.newPlot() function to plot the trace object and layout.
//
// (After you have completed the coding requirements, your dashboard will look like the image when it loads for the first time, with the bar chart you created in Deliverable 1 and the bubble chart.)
//
// ___________________________________________________________________________________________________________
//
// Deliverable 3: Create a Gauge Chart (20 points)
// Using your knowledge of JavaScript, Plotly, and D3.js, create a gauge chart that displays the weekly washing frequency's value, and display the value as a measure from 0-10 on the progress bar in the gauge chart when an individual ID is selected from the dropdown menu.
//
// Your gauge chart should look similar to the image.
//
// [x] Download the BellyButton_gauge_starter_code.js, using Steps 1-3 in the buildCharts() function initialize variables that hold arrays for the sample that is selected from the dropdown menu on the webpage.
// 
// [x] 1. In Step 1, create a variable that filters the metadata array for an object in the array whose id property matches the ID number passed into buildCharts() function as the argument.
// [x] 2. In Step 2, create a variable that holds the first sample in the array created in Step 2.
//        NOTE
//        You can combine Steps 1 and 2 as one line of code, but make sure you use the correct variable name for Step 3 when retrieving the washing frequency value.
// [x] 3. In Step 3, create a variable that converts the washing frequency to a floating point number.
//        (washFrequency)
// [x] 4. In Step 4, create the trace object for the gauge chart.
//        HINT
//        Using d3.select(), you can select the element that has changed and retrieve the property and HTML id that has changed.
//        Check out the Plotly gauge charts in JavaScript (https://plotly.com/javascript/gauge-charts/) documentation and use these hints.
//            [x] Assign the variable created in Step 3 to the value property.
//            [x] The type property should be "indicator".
//            [x] The mode property should be "gauge+number".
//            [x] For the title object, assign the title as a string using HTML syntax to the text property.
//            [x] For maximum range for the gauge should be 10.
//            [x] Set the bar color of the gauge to black or a dark color to contrast against the range colors.
//            [x] Assign different colors as string values in increments of 2 for the steps object. 
//               The colors can be named colors as in the Matplotlib colors (https://matplotlib.org/3.1.0/gallery/color/named_colors.html) or rgba values.
// [x] 5. In Step 5, create the layout for the gauge chart making sure that it fits in the <div></div> tag for the gauge id.
// [x] 6. In Step 6, use the Plotly.newPlot() function to plot the trace object and the layout.
//
// After you have completed the coding requirements, your dashboard will look like the image when it loads for the first time, with the bar chart you created in Deliverable 1, the bubble chart created in Deliverable 2, and the gauge chart.
//
// ___________________________________________________________________________________________________________
//
// Deliverable 4: Customize the Dashboard (20 points)
// Use your knowledge of HTML and Bootstrap to customize the webpage for your dashboard.

// [x] 1. Customize your dashboard with three of the following:
//          [x] Add an image to the jumbotron.
//          [x] Add background color or a variety of compatible colors to the webpage.
//          [x] Use a custom font with contrast for the colors.
//          [x] Add more information about the project as a paragraph on the page.
//          [x] Add information about what each graph visualizes, either under or next to each graph.
//          [] Make the webpage mobile-responsive.
//          [x] Change the layout of the page.
//          [] Add a navigation bar that allows you to select the bar or bubble chart on the page.
//
// [x] 2. When the dashboard is first opened in a browser, ID 940’s data should be displayed in the dashboard, and the three charts should be working according to their requirements.
//          in index.html: placeholder="940"
//
// [x] 3. When a sample is selected, the dashboard should display the data in the panel and all three charts according to their requirements.
