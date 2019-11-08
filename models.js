const databaseLoginData = require('./database.js')
const knex = require('knex')({ client: 'mysql', connection: databaseLoginData })
const bookshelf = require('bookshelf')(knex)

const User = bookshelf.Model.extend({
  tableName: 'users'
})

module.exports = {
  User,
  //other models
}
