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

const addCar = async car => {
    await knex('car').inser(car)
}

const getCars = async personId => {
    return await knex('cars').select("*").where({ personId });
}

const deleteCars = async personId => {
    return await knex('cars').where({ personId: personId }).del();
}

module.exports = {
    addCar,
    getCars,
    deleteCars
}