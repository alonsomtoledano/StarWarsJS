import { fetchDataPeople, fetchDataPlanets } from './fetchdata';
import { GraphQLServer } from 'graphql-yoga'


const urlBase = 'https://swapi.co/api/';
const urlPeople = `${urlBase}people/`;


const runApp = (dataPeople, dataPlanets) => {

  const typeDefs = `
  type Query{
    character(name: String!): Character!
  }

  type Character{
    name: String!
    height: Int!
    hair_color: String!
    gender: String!
    planet: String!
  }
  `

  const resolvers = {
    Query: {
      character: (parent, args, ctx, info) => {
        const result = dataPeople.find(obj => obj.name == args.name);

        if (result){
          return {
            name: result.name,
            height: result.height,
            hair_color: result.hair_color,
            gender: result.gender,
            planet: dataPlanets[0].name
          }
        }
        else return null;
      },
    }
  }
  console.log("dataPeople" + dataPeople);
  console.log("dataPlanets" + dataPlanets);
  const server = new GraphQLServer({typeDefs, resolvers})
  server.start();
};


// main program
fetchDataPeople(runApp, urlPeople);

export { runApp };