import request from 'request';
import fs from 'fs';

const urlPlanets = `https://swapi.co/api/planets/`;


const fetchDataPeople = (callback, url, dataPeople) => {
  if (!dataPeople) dataPeople = [];

  try{
    dataPeople = JSON.parse(fs.readFileSync("./people.json").toString());
    fetchDataPlanets(callback, dataPeople, urlPlanets);
  }catch(e){
    console.log('fetching people data...');
    request({ url, json: true }, (error, response) => {
      if (response.body) {
        dataPeople = [...dataPeople, ...response.body.results];
      }
      if (response.body.next !== null)
        fetchDataPeople(callback, response.body.next, dataPeople);
      else{
        fs.writeFileSync("./people.json", JSON.stringify(dataPeople));
        fetchDataPlanets(callback, dataPeople, urlPlanets);
      }
    });
  }
};

const fetchDataPlanets = (callback, dataPeople, url, dataPlanets) => {
  if (!dataPlanets) dataPlanets = [];

  try{
    dataPlanets = JSON.parse(fs.readFileSync("./planets.json").toString());
    callback(dataPeople, dataPlanets);
  }catch(e){
    console.log('fetching planet data...');
    request({ url, json: true }, (error, response) => {
      if (response.body) {
        dataPlanets = [...dataPlanets, ...response.body.results];
      }
      if (response.body.next !== null)
        fetchDataPlanets(callback, dataPeople, response.body.next, dataPlanets);
      else{
        fs.writeFileSync("./planets.json", JSON.stringify(dataPlanets));
        callback(dataPeople, dataPlanets);
      }
    });
  }
};

export { fetchDataPeople, fetchDataPlanets };
