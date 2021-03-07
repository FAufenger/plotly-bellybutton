// Creating function for Data plotting (Bar, gauge, bubble)
//function getPlot(id) {
id = "940"
    // getting data from the json file
    d3.json("./Resources/samples.json").then((data)=> {
        console.log(data);
   
    
        ///////////////// bar ////////////////
        // Find and filter sample secctio of sample data by id- will use with drop dowm menu
        // to string??
        var selectedSample = data.samples.filter(item => item.id === id)[0];
        console.log(`Id Selected: ${id}`)
        console.log(selectedSample);
        
        // get only top 10 sample values to plot and reverse for the plotly
        var sampleValues = selectedSample.sample_values.slice(0, 10).reverse();
        console.log(`Selected sample: ${sampleValues}`)
        
        //otu_ids
        var otuIds = selectedSample.otu_ids.slice(0, 10).reverse();
        console.log(` OTU Id: ${otuIds}`)
        // Add OTU to value for chart visualiation 
        otuIdWord = otuIds.map(x => "OTU " + x)

        // otu_labels
        var otuLabels = selectedSample.otu_labels.slice(0, 10).reverse();
        console.log(`OTU Labels: ${otuLabels}`)

        // trace
        var trace1 = {
            type: "bar",
            x: sampleValues,
            y: otuIdWord,
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
                b:  100
            }
        };

        // create the bar plot
        Plotly.newPlot("bar", data1, layout1);

        /////////// bubble ////////////
        // For all data

        /* Use otu_ids for the x values.
        Use sample_values for the y values.
        Use sample_values for the marker size.
        Use otu_ids for the marker colors.
        Use otu_labels for the text values. */
                // trace
        var trace2 = {
            x: otuIds,
            y: sampleValues,
            mode: "markers",
            marker:{
                size: sampleValues,
                color: otuIds
            },
            text: otuLabels
        };
      

        // create data variable
        var data2 = [trace2];
        
        // create layout variable to set plots layout
        var layout2 = {
            xaxis:{title: "OTU ID"},
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



// function init() {
//     getPlot(id);
// }
// init();

//getPlot(id);