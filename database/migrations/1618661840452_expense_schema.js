'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExpenseSchema extends Schema {
  up() {
    this.create('expenses', (table) => {
      table.increments()
      table.string('name', 190).notNullable()
      table.string('amount', 100).notNullable()
      table.integer('user_id').notNullable().unsigned()
      table.integer('status').defaultTo(1)
      table.timestamps()
    })
  }

  down() {
    this.drop('expenses')
  }
}

module.exports = ExpenseSchema
