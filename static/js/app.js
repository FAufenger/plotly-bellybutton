// Creating function for Data plotting (Bar, bubble and gauge)
function getPlots(id) {

    // getting data from the json file
    d3.json("./Resources/samples.json").then((data) => {
        //console.log(data);


        // Find and filter sample secctio of sample data by id- will use with drop dowm menu
        // to string??
        var selectedSample = data.samples.filter(item => item.id === id)[0];
        //console.log(`Id Selected: ${id}`);
        //console.log(selectedSample);

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
        //console.log(`OTU Labels: ${otuLabels}`);

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
                r: 75,
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
                colorscale: [[0, '#f9c802'], [0.33, '#03ac13'], [0.67, '#016064'], [1, '#300038']],
                symbol: "circle",
                opacity: 0.65
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
            showlegend: false
        };

        // create the bar plot
        Plotly.newPlot("bubble", data2, layout2);
    });
}

function getDemoGraphic(id) {
    // Demographic data and Gauge plot
    d3.json("./Resources/samples.json").then((data) => {
        // Filter on selected id
        var selectedSample2 = data.metadata.filter(item => item.id.toString() === id)[0];
        // // Check
        //console.log(`Demographic Info:`)
        //console.log(selectedSample2);
        // Set drop down menu to selected data
        var demoGraphic = d3.select("#sample-metadata");
        // Empty the demographic info panel each time before getting new id info
        demoGraphic.html("");
        // Demographic data for the id and append the info to the panel
        Object.entries(selectedSample2).forEach((idInfo) => {
            demoGraphic.append("p")
                .text(`${idInfo[0].toUpperCase()} : ${idInfo[1]} \n`);
        });

        ////////// pie with needle //////////////
        var washFrequency = selectedSample2.wfreq;
        //console.log(`Wash Frequency: ${washFrequency}`);

        switch (washFrequency) {
            case 0:
                var xOne= 0.28;
                var yOne= 0.34;
                break;
            case 1:
                var xOne= 0.20;
                var yOne= 0.46;
                break;
            case 2:  
                var xOne= 0.22;
                var yOne= 0.59;
                break;
            case 3:
                var xOne= 0.34;
                var yOne= 0.70;
                break; 
            case 4:
                var xOne= 0.50;
                var yOne= 0.74;
                break;
            case 5:
                var xOne= 0.66;
                var yOne= 0.70;
                break; 
            case 6:
                var xOne= 0.79;
                var yOne =0.59;
                break; 
            case 7:
                var xOne= 0.80;
                var yOne= 0.46;
                break; 
            case 8:
                var xOne= 0.73;
                var yOne= 0.34;
                break; 
            case 9:
                var xOne= 0.59;
                var yOne= 0.27;
                break;
            default: 
                var xOne = 0.41;
                var yOne= 0.27;
                break;
        };

        var data3 = [{
            type: "pie",
            showlegend: false,
            hole: 0.6,
            rotation: 180,
            direction: "clockwise",
            textinfo: "text",
            textposition: "inside",
            values: [360/11,360/11,360/11,360/11,360/11,360/11,360/11,360/11,360/11,360/11,360/11],
            text: ["NA","0","1","2","3","4","5","6","7","8","9"],
            hoverinfo: "skip",
            marker: { 
                colors: ["#ffd300", "#d21404", "#a0d080", "#90c070", "#80b060", "#70a050", "#609040", "#508030", "#407030", "#306010", "#203000"],
                labels: ["NA","0", "1", "2", "3","4","5","6","7","8","9"],
                hoverinfo: "skip"
            },
            title: {text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
                    font: { size: 18} },
            
        }];
              
        // // Tied to have a center dot to make pointer look nicer
        // var center = {
        //     type: "scatter", 
        //     x: [0],
        //     y: [0],
        //     marker :{
        //         size: 20,
        //         color: "black"
        //     },
        //     showlegdend: false,
        //     hoverinfo: "skip"
        // };

        var layout3 = {
            width: 400,
            height: 500,
            margin: {
                t: 0,
                r: 0,
                l: 5,
                b: 0
            },
            shapes:[{
                type: 'line',
                //path: path,
                x0: 0.5,
                y0: 0.5,
                x1: xOne,
                y1: yOne,
                line: {
                    color: 'black',
                    width: 8
                }
            }],
            xaxis: {
                zeroline:false, 
                showticklabels:false,
                showgrid: false, 
                range: [-1, 1],
                fixedrange: true
              },
            yaxis: {
                zeroline:false, 
                showticklabels:false,
                showgrid: false, 
                range: [-1, 1],
                fixedrange: true
            },
            font: {
                color: "#203000",
                family: "Arial",
                size: 20
            }
        };

        // create the indicator plot
        Plotly.newPlot("gauge", data3, layout3); 
    });

         /* ////////// gague //////////////
        var washFrequency = selectedSample2.wfreq;
        console.log(`Wash Frequency: ${washFrequency}`);

        var data3 = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: washFrequency,
            title: {text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
                    font: { size: 18} },
            type: "indicator",
            mode: "gauge+number",
            delta: {},
            gauge: {
                axis: { range: [0, 9], tickwidth: 1, tickcolor: "#fafafa" },
                bar: {color: '65fe08'},
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
                color: "#203000",
                family: "Arial"
            }
        };

        // create the bar plot
        Plotly.newPlot("gauge", data3, layout3);
    }); */    
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