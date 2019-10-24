import { fetchDataPeople } from './fetchdata';
import { GraphQLServer } from 'graphql-yoga'


const urlPeople = `https://swapi.co/api/people/`;


const runApp = (dataPeople, dataFilms) => {

  const typeDefs = `
  type Query{
    people(page: Int, number: Int, name: String, gender: String): [Character!]!
    character(id: Int!, films: Boolean): Character2!
  }

  type Character{
    name: String!
    gender: String!
    url: String!
  }
  type Character2{
    name: String!
    gender: String!
    url: String!
    films: [Film!]!
  }
  type Film{
    title: String!
    episode: String!
  }
  `

  const resolvers = {
    Query:{
      people: (parent, args, ctx, info) => {

        const page = args.page || 1;
        const number = args.number || 10;
        let first = number*(page - 1);
        let last = first + number;
        let arrayResults = dataPeople.slice();

        if(args.name && !args.gender){
          arrayResults = arrayResults.filter(obj => obj.name.includes(args.name));
        }
        else if(args.gender && !args.name){
          arrayResults = arrayResults.filter(obj => obj.gender == args.gender);
        }
        else if(args.name && args.gender){
          arrayResults = arrayResults.filter(obj => (obj.name.includes(args.name) && obj.gender == args.gender));
        }

        return arrayResults
        .slice(first, last)
        .map(character => {
          return{
            name: character.name,
            gender: character.gender,
            url: character.url
          }
        })
      },
      character: (parent, args, ctx, info) => {
        const result = dataPeople[args.id - 1];
        //let arrayResults = dataFilms.slice();

        // if (args.films){
        //   const url = result.url;
        //   arrayResults = arrayResults.filter(obj => obj.character.includes(url))
        //   .map(character => {
        //     return{
        //       name: result.name,
        //       gender: result.gender,
        //       url: result.url,
        //       films: character.name
        //     }
        //   })
        //   return{
        //     name: result.name,
        //     gender: result.gender,
        //     url: result.url,
        //   }
        // }
        // else{
          return{
            name: result.name,
            gender: result.gender,
            url: result.url
          }
        //}
      }
    }
  }

  const server = new GraphQLServer({typeDefs, resolvers})
  server.start();
};


// main program
fetchDataPeople(runApp, urlPeople);