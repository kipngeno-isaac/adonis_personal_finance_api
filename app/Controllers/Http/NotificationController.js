'use strict'

const NotificationRepository = use('App/Repositories/NotificationRepository')

class NotificationController {
  constructor() {
    this.repo = new NotificationRepository()
  }


  async subscribe({ request, response }) {
    const subscription = request.post()
    const res = await this.repo.dailyReminder(subscription)

    console.log('response', res);

    response.ok({ status: true, message: 'subscription successful', data: res })

  }
}

module.exports = NotificationController
