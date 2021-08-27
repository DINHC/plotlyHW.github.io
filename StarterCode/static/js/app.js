function Charts(sample) {
      d3.json("samples.json").then((data) => {
      console.log(data.features);
      var samples = data.samples;
      var resultsarray= samples.filter(sampleobject => sampleobject.id == sample);
      var result = resultsarray[0]
      var ids = result.otu_ids;
      var labels = result.otu_labels;
      var values = result.sample_values;
      
      var bar =[
      {
      y: ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      x: values.slice(0,10).reverse(),
      text: labels.slice(0,10).reverse(),
      type: "bar",
      // orientation: "horizontal"
      orientation: 'h',
      marker: {
            color: 'rgb(158,202,225)',
            opacity: 1.5,
            line: {
              color: 'rgb(8,48,107)',
              width: 2
            },
      }}];
      // var bardata = [bar]
      var barshape = {
            title: "Top 10 Bacteria Found in Your Belly Button",
            margin: { top: 80, left: 200 },
            };
        
      Plotly.newPlot("bar", bar, barshape);


      var bubble = [
            {
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            colorscale: 'rainbow',
            opacity: 2,
            marker: {color: ids, size: values,}
            }];
      // var bubbledata = [bubble]
      var bubbleshape = {
            margin: {top:0},
            // padding: {auto},
            xaxis: { title: "OTU ID" },
            yaxis: {autorange: true},
            hovermode: "closest",     
      };
      Plotly.newPlot("bubble", bubble, bubbleshape);
});
}

function Metadata(sample) {
      d3.json("samples.json").then((data) => {
      console.log(data.features);
      var meta= data.metadata;

      var resultsarray= meta.filter(sampleobject => sampleobject.id == sample);
      
      var result= resultsarray[0]
      var metasample = d3.select("#sample-metadata"); 
      metasample.html("");
      Object.entries(result).forEach(([key, value]) => {
      metasample.append("div").style('word-wrap', 'break-word').text(`${key}: ${value}`);
      });
});
}

function init() {
      var selector = d3.select("#selDataset");
      d3.json("samples.json").then((data) => {
      console.log(data.features);      
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
          selector
            .append("option")
            .text(sample)
            .property("value", sample);
      });
      const firstSample = sampleNames[0];
      Charts(firstSample);
      Metadata(firstSample);});} 

function optionChanged(newSample){
Charts(newSample);
Metadata(newSample);}
init(); 