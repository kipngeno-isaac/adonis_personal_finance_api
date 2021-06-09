'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExpenseCategoriesSchema extends Schema {
  up() {
    this.create('expense_categories', (table) => {
      table.increments()
      table.string('name', 255).notNullable().unique()
      table.integer('user_id').notNullable().unsigned()
      table.timestamps()
    })
  }

  down() {
    this.drop('expense_categories')
  }
}

module.exports = ExpenseCategoriesSchema
