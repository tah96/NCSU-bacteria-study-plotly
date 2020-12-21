// Name local JSON file to variable
json_file = "/data/samples.json"

// Fetch the JSON data and console log it
d3.json(json_file).then(function(data) {
  var metaData = data.metadata;
  var sampleData = data.samples;
  console.log(sampleData);
  console.log(metaData);

  var dropdown_list = d3.select(".dropdown-menu");

  metaData.forEach((patients) => {
    inside_list = patients.id;
    console.log(inside_list);
    var list = dropdown_list.append("li")
      list.text(inside_list)
  });    

  // Filter to Select a Certain Patient to be used later with user input
  function selectPatient(person) {
    return person.id === "955"
  };
  
  var patient = sampleData.filter(selectPatient);
  console.log(patient);

  // Console log everything out to make sure everything runs
  //console.log(patient_ids);
  //console.log(patient_otu_labels);
  //console.log(patient_otu_ids);
  //console.log(patient_otu_samples);

  var patient_otu_ids = patient.map((otu) => {
    var text_otu_ids = []
    var raw_ids = otu.otu_ids
    raw_ids.forEach((id) => {
      var string = id.toString();
      text_otu_ids.push(`OTU ${string}`)
    });
    return text_otu_ids
  });

  var patient_otu_samples = patient.map((otu) => {
    return otu.sample_values
  });

  var patient_otu_labels = patient.map((otu) => {
    return otu.otu_labels
  });
  
  console.log(patient_otu_ids);
  console.log(patient_otu_samples);
  console.log(patient_otu_labels);
  
  var patient = sampleData.filter(selectPatient);
  console.log(patient)

  function init() {
    var bar_plot_data = [{
      x: patient_otu_samples[0].slice(0,10),
      y: patient_otu_ids[0].slice(0,10),
      type: "bar",
      text: patient_otu_labels[0].slice(0,10),
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
  };
  init();

});