import { fetchDataPeople } from './fetchdata';
import { GraphQLServer } from 'graphql-yoga'


const urlPeople = `https://swapi.co/api/people/`;


const runApp = (dataPeople, dataPlanets) => {

  const typeDefs = `
  type Query{
    character(name: String!): Character!
    filter(hair_color: String!): [Character]!
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
      filter: (parent, args, ctx, info) => {
        var arrayResults = dataPeople.slice();

        if (args.hair_color){
          arrayResults = arrayResults.filter(obj => obj.hair_color.includes(args.hair_color));
          return arrayResults
            .map(character => {
              return{
                name: character.name,
                height: character.height,
                hair_color: character.hair_color,
                gender: character.gender,
                planet: dataPlanets[0].name
              }
            })
        }
      }
    }
  }

  const server = new GraphQLServer({typeDefs, resolvers})
  server.start();
};


// main program
fetchDataPeople(runApp, urlPeople);