'use strict'

const Push = require('web-push')
const Env = use('Env')
const Database = use('Database')
class PushNotification {

  async subscribe(subscription) {
    Push.setVapidDetails(
      'mailto:test@mail.org',
      Env.get('PUBLIC_KEY', 'BOx6niRL1VeYTNz1t_iMWJTAW4crETATuD8sUZnpovevzNri-NQpWqJP40kEtmALZPPpQ_ZFT7hDAx6cfsp9ReQ'),
      Env.get('PRIVATE_KEY', 'NPXpBe0S8MpYqKOH3n7oU76yTg33RU_vcBUZjGQUEq4')
    )

    Push.sendNotification(subscription, 'Subscription to Notifications Succeeded ')
  }

  async dailyReminder() {
    const users = await Database.from('users').whereNotNull('notification_token')
    console.log(users);


    Push.setVapidDetails(
      'mailto:test@mail.org',
      Env.get('PUBLIC_KEY', 'BOx6niRL1VeYTNz1t_iMWJTAW4crETATuD8sUZnpovevzNri-NQpWqJP40kEtmALZPPpQ_ZFT7hDAx6cfsp9ReQ'),
      Env.get('PRIVATE_KEY', 'NPXpBe0S8MpYqKOH3n7oU76yTg33RU_vcBUZjGQUEq4')
    )

    users.forEach(user => {
      Push.sendNotification(JSON.parse(user.notification_token), 'Kindly add todays expenses to keep an accurate record')
    });
  }

}



module.exports = PushNotification;
