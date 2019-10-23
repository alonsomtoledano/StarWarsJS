import { fetchDataPeople } from './fetchdataPeople';
import { fetchDataPlanets } from './fetchdataPlanets';
import { GraphQLServer } from 'graphql-yoga'


const urlBase = 'https://swapi.co/api/';
const urlPeople = `${urlBase}people/`;
const urlPlanets = `${urlBase}planets/`;

const runApp = (dataPeople, fetchDataPlanets) => {
  const typeDefs = `
  type Query{
    character(name: String!): Character!
  }

  type Character{
    name: String!
    height: Int!
    hair_color: String!
    gender: String!
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
          }
        }
        else return null;
      },
    }
  }

  const server = new GraphQLServer({typeDefs, resolvers})
  server.start();

};

// main program
fetchDataPeople(runApp, urlPeople);
fetchDataPlanets(runApp, urlPlanets);