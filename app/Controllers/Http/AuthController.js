'use strict'
const UserRepository = use('App/Repositories/UserRepository')


class AuthController {
  constructor() {
    this.repo = new UserRepository()
  }

  /**
   * registration method
   */
  async register({ request, auth, response }) {
    try {
      const user = await this.repo.register(auth, request);

      return response.status(user.statusCode).send(user.data)
    }
    catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Registration failed please try again',
        error: error.message
      })
    }
  }


  /**
   * login endpoint
   * @param {*} param0
   * @returns
   */
  async login({ request, auth, response }) {
    try {
      const user = await this.repo.login(request, auth);

      return response.status(user.statusCode).send(user.data)
    }
    catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'You first need to register!',
        error: error.message
      })
    }
  }

}

module.exports = AuthController
