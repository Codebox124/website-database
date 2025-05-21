const fs = require('fs');
const csv = require('csvtojson');

async function main() {
  const actors = await csv().fromFile('data/actors.csv');
  const movies = await csv().fromFile('data/movies.csv');

  const actorMap = actors.map(actor => {
    const actorId = actor.ID; // from Actor file
    const actorMovies = movies
      .filter(movie => movie.Actor_ID === actorId)
      .map(movie => ({
        title: movie.Movie_Name,
        year: movie.Movie_Release_Year,
        description: movie.Brief_Description_of_Movie,
      }));

    return {
      ID: actor.ID,
      Actor_Name: actor.Actor_Name,
      Legal_First_Name: actor.Legal_First_Name,
      Legal_Last_Name: actor.Legal_Last_Name,
      Birth_Date: actor.Birth_Date,
      Death_Date: actor.Death_Date,
      Name_First_Movie: actor.Name_First_Movie,
      Year_First_Movie: actor.Year_First_Movie,
      Total_Movies: actorMovies.length,
      Movies: actorMovies,
    };
  });

  fs.writeFileSync('data/actors.json', JSON.stringify(actorMap, null, 2));
  console.log('✅ actors.json generated!');
}

main();
