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
        // reverse??
        var sampleValues = selectedSample.sample_values.slice(0, 10);
        console.log(`Selected sample: ${sampleValues}`)
        
        //otu_ids
        var otuIds = selectedSample.otu_ids.slice(0, 10);
        console.log(` OTU Id: ${otuIds}`)
        // Add OTU to value for chart visualiation 
    
        // otu_labels
        var otuLabels = selectedSample.otu_labels.slice(0, 10);
        console.log(`OTU Labels: ${otuLabels}`)

        // trace
        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: name,
            x: dates,
            y: closingPrices,
            line: {
              color: "#17BECF"
            }
          };
      

        // create data variable
        var data1 = [trace1];
        
        // // create layout variable to set plots layout
        // var layout = {
        //     title: ""

        // };

        // // create the bar plot
        // Plotly.newPlot("bar", data1, layout1);

        /////////// bubble ////////////

        /* Use otu_ids for the x values.
        Use sample_values for the y values.
        Use sample_values for the marker size.
        Use otu_ids for the marker colors.
        Use otu_labels for the text values. */

        // // create the bar plot
        //Plotly.newPlot("bubble", data2, layout2);


        ////////// gague //////////////

        // // create the bar plot
        // Plotly.newPlot("gauge", data3, layout3);
    
    });
//}

// function init() {
//     getPlot(id);
// }
// init();

//getPlot(id);