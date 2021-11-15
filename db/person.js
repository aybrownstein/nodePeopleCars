const knex = require('knex')({
    client: 'mssql',
    connection: {
        server: 'localhost',
        user: 'my_db',
        password: '0000',
        database: 'nodePeopleCars',
        options: {
            port: 1433,
            instanceName: 'SQLEXPRESS'
        }
    }
});

const addPerson = async person => {
    await knex('people').insert(person);
}

const getPersonById = async id => {
    return await knex('people').where('id', id).select('*').first();
}

const getAll = async() => {
    const people = await knex.from('people')
        .leftJoin('cars', 'people.Id', 'cars.personId')
        .select('people.*').count({ carCount: 'cars.personId' })
        .groupBy('people.firstName', 'people.lastName', 'people.age', 'people.id');
    return (people);
}

module.exports = {
    addPerson,
    getPersonById,
    getAll
}