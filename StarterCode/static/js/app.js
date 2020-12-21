// Name local JSON file to variable
json_file = "/data/samples.json"

// Fetch the JSON data and console log it
d3.json(json_file).then(function(data) {

  var sampleData = data.samples
  console.log(sampleData)

  // Map Patient IDS for later filtering
  //var patient_ids = sampleData.map((subject) => {
    //return subject.id
  //})
  
  // Map OTU IDS for each patient
  //var patient_otu_ids = sampleData.map((subject) => {
    //var text_otu_ids = []
    //var raw_ids = subject.otu_ids
    //raw_ids.forEach((id) => {
      //var string = id.toString();
      //text_otu_ids.push(`OTU ${string}`)
    //});
    //return text_otu_ids
  //});

  // Map OTU Samples found in each patient
  //var patient_otu_samples = sampleData.map((subject) => {
    //return subject.sample_values
  //});

  // Map OTU labels for each sample
  //var patient_otu_labels = sampleData.map((subject) => {
    //return subject.otu_labels
  //});

  // Filter to Select a Certain Patient to be used later with user input
  function selectPatient(person) {
    return person.id === "955"
  };
  
  var patient = sampleData.filter(selectPatient);
  console.log(patient)

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