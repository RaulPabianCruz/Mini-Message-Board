const { Client } = require('pg');

const SQL = `
    CREATE TABLE IF NOT EXISTS messagebrd (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    msg VARCHAR(150),
    name VARCHAR(25),
    dateAdded DATE
    );
`;

async function main() {
    console.log('...seeding');
    let connectionString;
    if(process.env.NODE_ENV === 'prod')
        connectionString = process.env.DATABASE_URL;
    else
        connectionString = process.env.CONNECTION_STRING;

    if(process.env.DATABASE_URL)
        console.log('DBURL: ' + process.env.DATABASE_URL);

    console.log('node_env: ' + process.env.NODE_ENV);
    console.log('connectionString: ' + connectionString);

    const client = new Client({ connectionString: connectionString });

    try{
        await client.connect();
        await client.query(SQL);
    }
    catch(e){
        console.error(e);
    }
    finally{
        await client.end();
        console.log('done');
    }
}

main();