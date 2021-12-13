'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddNotificationTokenColumnSchema extends Schema {
  up() {
    this.alter('users', (table) => {
      // alter table
      table.json('notification_token').after('password')
    })
  }

  down() {
    this.alter('users', (table) => {
      // reverse alternations
      table.dropColumn('notification_token')
    })
  }
}

module.exports = AddNotificationTokenColumnSchema
