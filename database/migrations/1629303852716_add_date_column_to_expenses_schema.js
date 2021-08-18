'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddDateColumnToExpensesSchema extends Schema {
  up() {
    this.table('expenses', (table) => {
      // alter table
      table.date('date')
    })
  }

  down() {
    this.table('expenses', (table) => {
      // reverse alternations
      table.dropColumn('date')
    })
  }
}

module.exports = AddDateColumnToExpensesSchema
