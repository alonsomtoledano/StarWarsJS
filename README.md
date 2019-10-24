# 🐻 ✴️ StarWars
![alt text](./StarWarsLogo.png)
Graphql query API for information about Star Wars.
All information is provided by [Star Wars API](https://swapi.co/).
## 📝 Info
The program, the first time it is started, makes a call to the API, generating locally the necessary files so as not to require further consultation.
## Install
```js
npm install
```
## Run
```js
npm start
```
## 🔍 Queries
- 👨 People
    Introducing the name, gender of a character and some pagination settings, it filters and shows basic information such as with this characteristics:
    - Name
    - Gender
    - Url
    #####
- 👁️ Character
    Introducing a character's ID, it shows the character information with this ID.
## 🖥️ Example
### Input
```js
query{
  people(page: 1, number: 2, name: "L", gender: "male"){
    name
    gender
    url
  }
  character(id: 1){
    name
    gender
    url
  }
}
```
### Output

```js
"data": {
    "people": [
      {
        "name": "Luke Skywalker",
        "gender": "male",
        "url": "https://swapi.co/api/people/1/"
      },
      {
        "name": "Owen Lars",
        "gender": "male",
        "url": "https://swapi.co/api/people/6/"
      }
    ],
    "character": {
      "name": "Luke Skywalker",
      "gender": "male",
      "url": "https://swapi.co/api/people/1/"
    }
  }
}
```