// Creating function for Data plotting (Bar, bubble and gauge)
function getPlots(id) {

    // getting data from the json file
    d3.json("./Resources/samples.json").then((data) => {
        console.log(data);


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

        ///////////////// bar ////////////////
        // Bar chart with only top ten OTU
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
            title: "Prominent Operational Taxonomic Units",
            yaxis: {},
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 25
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
                color: otuIdsAll, 
                symbol: "circle",
                opacity: 0.85
            },
            text: otuLabelsAll
        };


        // create data variable
        var data2 = [trace2];

        // create layout variable to set plots layout
        var layout2 = {
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Frequency" },
            height: 500,
            width: 1200,
            showlegend:false
        };

        // create the bar plot
        Plotly.newPlot("bubble", data2, layout2);
    });
}

function getDemoGraphic(id) {
    // Demographic data
    d3.json("./Resources/samples.json").then((data) => {
        // Filter on selected id
        var selectedSample2 = data.metadata.filter(item => item.id.toString() === id)[0];
        // Check
        console.log(`Demographic Info:`)
        console.log(selectedSample2);
        // Set drop down menu to selected data
        var demoGraphic = d3.select("#sample-metadata");
        // Empty the demographic info panel each time before getting new id info
        demoGraphic.html("");
        // Demographic data for the id and append the info to the panel
        Object.entries(selectedSample2).forEach((idInfo) => {
            demoGraphic.append("p")
                .text(`${idInfo[0].toUpperCase()} : ${idInfo[1]} \n`);
        });

        ////////// gague //////////////

        var washFrequency = selectedSample2.wfreq;
        console.log(`Wash Frequency: ${washFrequency}`);

        var data3 = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: washFrequency,
            title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
            type: "indicator",
            mode: "gauge+number",
            delta: {},
            gauge: {
                axis: { range: [0, 9], tickwidth: 1, tickcolor: "#fafafa" },
                bgcolor: "white",
                bordercolor: "transparent",
                steps: [
                    { range: [0, 1], color: "#a0d080" },
                    { range: [1, 2], color: "#90c070" },
                    { range: [2, 3], color: "#80b060" },
                    { range: [3, 4], color: "#70a050" },
                    { range: [4, 5], color: "#609040" },
                    { range: [5, 6], color: "#508030" },
                    { range: [6, 7], color: "#407030" },
                    { range: [7, 8], color: "#306010" },
                    { range: [8, 9], color: "#203000" }
                ]
            }
        }];
        var layout3 = {
            width: 400,
            height: 500,
            margin: {
                t: 0,
                r: 0,
                l: 0,
                b: 0
            },
            font: {
                color: "black",
                family: "Arial"
            }
        };

        // create the bar plot
        Plotly.newPlot("gauge", data3, layout3);
    });
}



// Event change function - connected to html onchange ability
function optionChanged(id) {
    getPlots(id);
    getDemoGraphic(id);
}

// Initialization - screen shows lowest id number w/o prompt
function init() {
    var dropdown = d3.select("#selDataset");
    // Read in data set 
    d3.json("./Resources/samples.json").then((data) => {
        // Add all names- ids to dropdown
        data.names.forEach(id => {
            dropdown.append("option").text(id).property("value")
        });
        // read lowest Id to page for initilization
        var lowestID = data.names[0];
        getPlots(lowestID);
        getDemoGraphic(lowestID);
    });
}

init();