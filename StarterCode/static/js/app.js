// Name local JSON file to variable
json_file = "/data/samples.json"

var dropdown_list = d3.select("#selDataset");
var demographic = d3.select('#sample-metadata');
var bar_chart = d3.select('#bar');
var bubble_chart = d3.select('#bubble');

function newmetadata(sample){
  d3.json(json_file).then(function(data) {
    var metaData = data.metadata;
    var inside_list = metaData.filter(patients=> patients.id == sample);
    var instance = inside_list[0];
    demographic.html("");
    Object.entries(instance).forEach(([key, value]) => {
      var text = demographic.append("li");
      text.text(`${key}: ${value}`)
    })
  })
};

function init() {
  d3.json(json_file).then(function(data){
    var names = data.names;
    names.forEach((patients) => {
      var list = dropdown_list.append("option").property("value",patients).text(patients)
    });
    var patient = names[0];
    console.log(patient);
    newmetadata(patient);
    makePlots(patient)
  });
};

function makePlots(sample) {
  d3.json(json_file).then(function(data){
    var sampleData = data.samples
    console.log(sampleData)
    var selectedPatient = sampleData.filter(patients=> patients.id == sample);
    var selectedPatient = selectedPatient[0];
    console.log(selectedPatient)
    //var id = selectedPatient.id;
    var otu_ids = selectedPatient.otu_ids;
    var otu_ids_text = []
    otu_ids.forEach((otu) => {
      var string = otu.toString();
      otu_ids_text.push(`OTU ${string}`)
    });
    var otu_labels = selectedPatient.otu_labels;
    var sample_values = selectedPatient.sample_values;
    console.log(otu_ids);
    console.log(otu_ids_text);

    var bar_plot_data = [{
      x: sample_values.slice(0,10),
      y: otu_ids_text.slice(0,10),
      type: "bar",
      text: otu_labels.slice(0,10),
      orientation: "h"
    }];

    var layout = {
      title: "Bar Chart Test",
      xaxis: {
        title: "Bacteria Count"
      },
      yaxis: {
        title: "ID"
      }
    };
  
    Plotly.newPlot("bar", bar_plot_data, layout);

    var bubble_plot_data = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        opacity: 0.8,
        size: sample_values
      }
    }];
  
    var bubble_layout = {
      title: 'Bubble Chart Test',
      xaxis: {
        title: 'OTU ID'
      },
      yaxis: {
        title: 'Count in Subject/Patient'
      },
      showlegend: false,
      height: 500,
      width: 1200,
    };
  
    Plotly.newPlot("bubble", bubble_plot_data, bubble_layout);
  });
};
makePlots();

function optionChanged(new_id) {
  newmetadata(new_id);
  makePlots(new_id);
};

init();