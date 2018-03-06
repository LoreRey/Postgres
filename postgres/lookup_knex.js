const pg = require("pg");
const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database,
    port: settings.port,
    ssl: settings.ssl
  }
});

const query = process.argv;

function printResults(rows) {

  console.log(`Found ${rows.length} person(s) by the name '${query}':`);

  rows.forEach( function(row) {
    const id = row.id;
    const firstName = row.first_name;
    const lastName = row.last_name;
    const birthdate = row.birthdate;

    console.log(`- ${id}: ${firstName} ${lastName}, born '${birthdate.toLocaleDateString()}'`);

  });
}

console.log("Searching ...");

knex.select().from('famous_people')
  .where('first_name', query)
  .orWhere('last_name', query)
  .asCallback(function(err, rows){
    if (err) { return console.error(err); }
    printResults(rows);
  }).finally(function() {
    knex.destroy();
  });