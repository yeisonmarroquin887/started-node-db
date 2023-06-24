const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");


{
    Movie.belongsToMany(Actor, {through: "MovieActor"})
    Actor.belongsToMany(Movie, {through: "MovieActor"})
}

{
     Movie.belongsToMany(Director, {through: "MovieDirector"})
     Director.belongsToMany(Movie, {through: "MovieDirector"})
}

{
    Movie.belongsToMany(Genre, {through: "MovieGenre"})
    Genre.belongsToMany(Movie, {through: "MovieGenre"})
}