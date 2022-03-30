'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddCategoryColumnToExpensesSchema extends Schema {
  up () {
    this.table('expenses', (table) => {
      // alter table
      table.integer("category_id").unsigned()
    })
  }

  down () {
    this.table('expenses', (table) => {
      // reverse alternations
      table.dropColumn('category_id')
    })
  }
}

module.exports = AddCategoryColumnToExpensesSchema
