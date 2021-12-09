'use strict'

const Push = require('web-push')
const Env = use('Env')
class PushNotification {

  async dailyReminder(subscription) {
    Push.setVapidDetails(
      'mailto:test@mail.org',
      Env.get('PUBLIC_KEY', 'BOx6niRL1VeYTNz1t_iMWJTAW4crETATuD8sUZnpovevzNri-NQpWqJP40kEtmALZPPpQ_ZFT7hDAx6cfsp9ReQ'),
      Env.get('PRIVATE_KEY', 'NPXpBe0S8MpYqKOH3n7oU76yTg33RU_vcBUZjGQUEq4')
    )

    Push.sendNotification(subscription, 'This is a test notification ')
  }

}

module.exports = PushNotification;
