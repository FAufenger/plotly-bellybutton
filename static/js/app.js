// Creating function for Data plotting (Bar, gauge, bubble)
//function getPlot(id) {
id = "940"
// getting data from the json file
d3.json("./Resources/samples.json").then((data) => {
    console.log(data);


    ///////////////// bar ////////////////
    // Find and filter sample secctio of sample data by id- will use with drop dowm menu
    // to string??
    var selectedSample = data.samples.filter(item => item.id === id)[0];
    console.log(`Id Selected: ${id}`);
    console.log(selectedSample);

    // get only top 10 sample values to plot and reverse for the plotly
    var sampleValues = selectedSample.sample_values.slice(0, 10).reverse();
    console.log(`Selected sample: ${sampleValues}`);

    //otu_ids
    var otuIds = selectedSample.otu_ids.slice(0, 10).reverse();
    console.log(` OTU Id: ${otuIds}`);
    // Add OTU to value for chart visualiation 
    otuIdWord = otuIds.map(x => "OTU " + x);

    // otu_labels
    var otuLabels = selectedSample.otu_labels.slice(0, 10).reverse();
    console.log(`OTU Labels: ${otuLabels}`);

    // trace
    var trace1 = {
        type: "bar",
        x: sampleValues,
        y: otuIdWord,
        text: otuLabels,
        orientation: "h"
    };


    // create data variable
    var data1 = [trace1];

    // create layout variable to set plots layout
    var layout1 = {
        title: "Top 10 OTU IDs",
        yaxis: {},
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };

    // create the bar plot
    Plotly.newPlot("bar", data1, layout1);

    /////////// bubble ////////////
    // Bubble chart for selected Id with all values included    
    // From above Id choice
    var sampleValuesAll = selectedSample.sample_values;
    var otuIdsAll = selectedSample.otu_ids;
    var otuLabelsAll = selectedSample.otu_labels;

    // trace
    var trace2 = {
        x: otuIdsAll,
        y: sampleValuesAll,
        mode: "markers",
        marker: {
            size: sampleValuesAll,
            color: otuIdsAll
        },
        text: otuLabelsAll
    };


    // create data variable
    var data2 = [trace2];

    // create layout variable to set plots layout
    var layout2 = {
        xaxis: {title: "OTU ID" },
        yaxis: {title: "Frequency"},
        height: 500,
        width: 1000
    };

    // create the bar plot
    Plotly.newPlot("bubble", data2, layout2);


    ////////// gague //////////////

    // // create the bar plot
    // Plotly.newPlot("gauge", data3, layout3);

});
//}


// Demographic data
d3.json("./Resources/samples.json").then((data) => {
    // Filter on selected id
    var selectedSample2 = data.metadata.filter(item => item.id.toString() === id)[0];
    console.log(selectedSample2);
    // Set drop down menu to selected data
    var demoGraphic = d3.select("#sample-metadata");
    // Empty the demographic info panel each time before getting new id info
    demoGraphic.html("");
    // Demographic data for the id and append the info to the panel
    Object.entries(selectedSample2).forEach((key) => {   
            demoGraphic.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
    });

});

// Event change function


// init Function

// function init() {

//     getPlot(id);
// }
// init();

//getPlot(id);