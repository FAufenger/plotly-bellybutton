// Creating function for Data plotting (Bar, gauge, bubble)
//function getPlot(id) {

    // getting data from the json file
    d3.json("./Resources/samples.json").then((data)=> {
        console.log(data);
   
    
        ///////////////// bar ////////////////
        var sample = data.samples.filter(item => item.sample.toString() === id)[0];
        console.log(sample);
        //sample_values

        //otu_ids
        
        // otu_labels
        

        // // create data variable
        // var data1 = [trace];
        
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