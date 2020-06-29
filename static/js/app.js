
function gettingPlots(id){


//  create json to read file

d3.json("../../samples.json").then ((data) =>
{    
     // console to check the data
     console.log(data)

// creating variable to read the ids of samples
     var ids = data.samples[0].otu_ids;
     console.log(ids)

// creating the variable to read sample values
     var sampleValues = data.samples[0].sample_values.slice(0, 10).reverse();
     console.log(sampleValues)

// creating variable to read labels
     var labels = data.samples[0].otu_ids.slice(0, 10);
     console.log(labels)


// get the top 10 id for plotting
     var OTU_top = (data.samples[0].otu_ids.slice(0, 10)).reverse();

     // creating the otu ids in desired form to plot
     var OTU_id = OTU_top.map(d => "OTU"  + d);
     console.log(`OTU IDS: ${OTU_id}`)

// get the top 10 labels to plot
     var labels =  data.samples[0].otu_labels.slice(0,10);
     console.log(`OTU_labels: ${labels}`)


     var trace = {
         x: sampleValues,
         y: OTU_id,
         text: labels,
         marker: {
         color: 'blue'},
         type:"bar",
         orientation: "h",
     }; 

     // creating the data variable
     var data_1 = [trace];


// creating layout to plot
     var layout_1 = {
          title: "Top 10 OTU",
          yaxis:{
              tickmode:"linear",
          },
          margin: {
              l: 100,
              r: 100,
              t: 100,
              b: 30
          }
      };
     
     // creating bar plots
      Plotly.newPlot("bar", data_1, layout_1);



     //  creating data for bubble plot
      var trace_1 = {
          x: data.samples[0].otu_ids,
          y: data.samples[0].sample_values,
          mode: "markers",
          marker: {
              size: data.samples[0].sample_values,
              color: data.samples[0].otu_ids
          },
          text:  data.samples[0].otu_labels

      };

     // layout for bubble plot
      var layout_2 = {
          xaxis:{title: "OTU ID"},
          height: 600,
          width: 1000
      };

     // data for bubble plot
      var data_2 = [trace_1];


     //  creating bubble plot
      Plotly.newPlot("bubble", data_2, layout_2); 



});

}


// creating function to get demoinfo data
function gettingDemoInfo(id) {

// creating json to read data
     d3.json("../../samples.json").then((sampledata)=> {
          // getting metadata for demograph panel
          var metadata = sampledata.metadata;
          console.log(metadata)


          var result = metadata.filter(meta => meta.id.toString() === id)[0];

          // selecting the demograph panel to gain data
          var demographicInfo = d3.select("#sample-metadata");


          //  empty the demographic info panel each time before getting new id info
          demographicInfo.html("");

          // grabs the demographic data and append in the panel
          Object.entries(result).forEach((key) => {   
               demographicInfo.append("h5").text(key[0].toLowerCase() + ": " + key[1] + "\n");    
           });

});
}

// creating function for chaning events
function optionChanged(id) {
     gettingPlots(id);
     gettingDemoInfo(id);
 }


 function init() {
     // selecting dropdown menu 
     var dropdown = d3.select("#selDataset");
 
     // read the data 
     d3.json("../../samples.json").then((sampledata)=> {
         console.log(sampledata)
 
         // getting the id data to the dropdwown menu
         sampledata.names.forEach(function(name) {
             dropdown.append("option").text(name).property("value");
         });
 
         // calling the functions to display the data and the plots to the page
         gettingPlots(sampledata.names[0]);
         gettingDemoInfo(sampledata.names[0]);
     });
 }
 
 init();


