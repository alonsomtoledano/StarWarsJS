import request from 'request';
import fs from 'fs';

const fetchDataPeople = (callback, url, dataPeople) => {
  if (!dataPeople) dataPeople = [];

  try{
    dataPeople = JSON.parse(fs.readFileSync("./people.json").toString());
    callback(dataPeople);
  }catch(e){
    console.log('fechting data...');
    request({ url, json: true }, (error, response) => {
      if (response.body) {
        dataPeople = [...dataPeople, ...response.body.results];
      }
      if (response.body.next !== null)
        fetchDataPeople(callback, response.body.next, dataPeople);
      else{
        fs.writeFileSync("./people.json", JSON.stringify(dataPeople));
        callback(dataPeople);
      }
    });
  }
};

export { fetchDataPeople };
