import request from 'request';
import fs from 'fs';

const fetchDataPlanets = (callback, url, dataPlanets) => {
  if (!dataPlanets) dataPlanets = [];

  try{
    dataPlanets = JSON.parse(fs.readFileSync("./planets.json").toString());
    callback(dataPlanets);
  }catch(e){
    console.log('fechting data...');
    request({ url, json: true }, (error, response) => {
      if (response.body) {
        dataPlanets = [...dataPlanets, ...response.body.results];
      }
      if (response.body.next !== null)
        fetchDataPlanets(callback, response.body.next, dataPlanets);
      else{
        fs.writeFileSync("./planets.json", JSON.stringify(dataPlanets));
        callback(dataPlanets);
      }
    });
  }
};

export { fetchDataPlanets };
