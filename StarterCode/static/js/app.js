// Name local JSON file to variable
json_file = "/data/samples.json"

// Fetch the JSON data and console log it
d3.json(json_file).then(function(data) {
  var metaData = data.metadata;
  var sampleData = data.samples;
  console.log(sampleData);
  console.log(metaData);

  var dropdown_list = d3.select(".dropdown-menu");
  var demographic = d3.select('#sample-metadata')

  metaData.forEach((patients) => {
    inside_list = patients.id;
    var list = dropdown_list.append("li")
      list.text(inside_list)
  });    

  // Filter to Select a Certain Patient to be used later with user input
  function selectPatient(person) {
    return person.id === "955"
  };
  
  var patient = sampleData.filter(selectPatient);

  var patient_otu_ids_text = patient.map((otu) => {
    var text_otu_ids = []
    var raw_ids = otu.otu_ids
    raw_ids.forEach((id) => {
      var string = id.toString();
      text_otu_ids.push(`OTU ${string}`)
    });
    return text_otu_ids
  });

  var patient_otu_ids = patient.map((otu) => {
    return otu.otu_ids
  });

  var patient_otu_samples = patient.map((otu) => {
    return otu.sample_values
  });

  var patient_otu_labels = patient.map((otu) => {
    return otu.otu_labels
  });
  
  var patient = sampleData.filter(selectPatient);
  console.log(patient)

  function init() {
    var correct_patient = []
    var patientMetaData = metaData.forEach((patient)=> {
      if (patient.id === 954) {
        var patient_info = patient;
        correct_patient.push(patient_info)
      }
    });
    console.log(correct_patient);

    correct_patient.forEach((instance) => {
      // Step 3: Use 'Object.entries' to capture each UFO sighting key and value
      Object.entries(instance).forEach(([key, value]) => {
        var text = demographic.append("li");
        text.text(`${key}: ${value}`)
      });  
    });        
  
    var bar_plot_data = [{
      x: patient_otu_samples[0].slice(0,10),
      y: patient_otu_ids_text[0].slice(0,10),
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

    var bubble_plot_data = [{
      x: patient_otu_ids[0],
      y: patient_otu_samples[0],
      text: patient_otu_labels[0],
      mode: 'markers',
      marker: {
        color: patient_otu_ids[0],
        opacity: 0.8,
        size: patient_otu_samples[0]
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
  };
  init();

});