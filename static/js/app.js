// getting data from the json file
d3.json("Resources/samples.json").then((data)=> {
    console.log(data);
}

// create data variable
var data = [trace];
  
// create layout variable to set plots layout
var layout = {
    title: ""

};

// create the bar plot
Plotly.newPlot("type", data, layout);