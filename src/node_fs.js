const fs = require('fs');

let rawdata = fs.readFileSync('./json/sw_data.json');  
let student = JSON.parse(rawdata);
var planets = [];
for(var v=0; v<student.results.length; v++){
    var data = {
        name:student.results[v].name,
        diameter:student.results[v].diameter,
        gravity:student.results[v].gravity,
        climate:student.results[v].climate};
    planets.push(data);
}

let res = JSON.stringify(planets);  
fs.writeFileSync('sw_data-2.json', res);  