'use strict'

const Database = require("@adonisjs/lucid/src/Database")

const User = use('App/Models/User')
const NotificationRepository = use('App/Repositories/NotificationRepository')

class NotificationController {
  constructor() {
    this.repo = new NotificationRepository()
  }


  async subscribe({ request, response }) {
    const { user_id, subscription } = request.post()

    const user = await User.find(user_id)
    user.notification_token = JSON.stringify(subscription)
    await user.save()

    const res = await this.repo.subscribe(subscription)

    console.log('response', res);

    response.ok({ status: true, message: 'subscription successful', data: res })

  }

}

module.exports = NotificationController
