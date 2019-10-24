# 🐻 ✴️ StarWars
![alt text](./StarWarsLogo.png)
Graphql query API for information about Star Wars.
All information is provided by [Star Wars API](https://swapi.co/).
## 📝 Info
The program, the first time it is started, makes a call to the API, generating locally the necessary files so as not to require further consultation.
## 🔍 Queries
- 👨 Character
    Introducing the name of a character, it shows basic information such as:
    - Name
    - Height
    - Hair Color
    - Gender
    - Planet
    #####
- 👁️ Filter
    Introducing a character's hair color, show all the characters with that characteristic.
## 🖥️ Example
### Input
```js
query{
  character(name: "Luke Skywalker"){
    name
    height
    hair_color
    gender
    planet
  }
  filter(hair_color: "brown"){
    name
    height
    hair_color
    gender
    planet
  }
}
```
### Output

```js
"data": {
    "character": {
      "name": "Luke Skywalker",
      "height": 172,
      "hair_color": "blond",
      "gender": "male",
      "planet": "Alderaan"
    },
    "filter": [
      {
        "name": "Leia Organa",
        "height": 150,
        "hair_color": "brown",
        "gender": "female",
        "planet": "Alderaan"
      },
      {
        "name": "Owen Lars",
        "height": 178,
        "hair_color": "brown, grey",
        "gender": "male",
        "planet": "Alderaan"
      }
    ]
}
```