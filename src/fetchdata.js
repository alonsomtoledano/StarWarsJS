import request from 'request';
import fs from 'fs';

const urlFilms = `https://swapi.co/api/films/`;


const fetchDataPeople = (callback, url, dataPeople) => {
  if (!dataPeople) dataPeople = [];

  try{
    dataPeople = JSON.parse(fs.readFileSync("./people.json").toString());
    fetchDataFilms(callback, dataPeople, urlFilms);
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
        fetchDataFilms(callback, dataPeople, urlFilms);
      }
    });
  }
};

const fetchDataFilms = (callback, dataPeople, url, dataFilms) => {
  if (!dataFilms) dataFilms = [];

  try{
    dataFilms = JSON.parse(fs.readFileSync("./films.json").toString());
    callback(dataPeople, dataFilms);
  }catch(e){
    console.log('fetching films data...');
    request({ url, json: true }, (error, response) => {
      if (response.body) {
        dataFilms = [...dataFilms, ...response.body.results];
      }
      if (response.body.next !== null)
        fetchDataFilms(callback, dataPeople, response.body.next, dataFilms);
      else{
        fs.writeFileSync("./films.json", JSON.stringify(dataFilms));
        callback(dataPeople, dataFilms);
      }
    });
  }
};

export { fetchDataPeople, fetchDataFilms };
