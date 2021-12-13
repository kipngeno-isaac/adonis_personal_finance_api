'use strict'

const Task = use('Task')
const moment = require('moment')
const Notification = use('App/Repositories/NotificationRepository')

class ScheduleIt extends Task {
  static get schedule() {
    return '5 * * * *'
    // return '*/2 * * * *'
  }

  async handle() {
    const notification = new Notification()
    await notification.dailyReminder()
    console.log('Run at ', moment().format('dddd, MMMM Do YYYY, h:mm:ss a'));
    this.info('Task ScheduleIt handle')
  }
}

module.exports = ScheduleIt
