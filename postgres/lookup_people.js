const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const query = process.argv[2];

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

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching ...");
  client.query(`SELECT * FROM famous_people WHERE last_name LIKE $1::text`, [query], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    printResults(result.rows);
    client.end();
  });
});