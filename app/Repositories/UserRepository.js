'use strict'

const User = use('App/Models/User')


class UserRepository {

  async register(auth, request) {
    const userData = request.only(['username', 'firstname', 'lastname', 'email', 'password'])
    let response
    try {
      const user = await User.create(userData)

      if (!user) {
        throw 'User registration failed please try again'
      }

      const token = await auth.withRefreshToken().generate(user, true)

      response = {
        statusCode: 200,
        data: {
          status: 'success',
          token,
          message: 'User registration successful'
        }
      }
    } catch (error) {
      response = {
        statusCode: 400,
        data: {
          status: 'error',
          error: error.message,
          message: 'User registration failed'
        }
      }
    }
    return response
  }

  async login(request, auth) {
    const email = request.input("email")
    const password = request.input("password")
    let response;
    try {

      const isAuth = await auth.attempt(email, password)

      if (!isAuth) {
        throw 'User Not Found. Register to be able to login'
      }
      let user = await User.findBy('email', email)

      let accessToken = await auth.withRefreshToken().generate(user, true)
      response = {
        statusCode: 200,
        data: {
          status: true,
          data: accessToken,
          message: 'Login Successful'
        }
      }

    } catch (error) {
      response = {
        statusCode: 400,
        data: {
          status: false,
          message: 'Ooops! Something went wrong please try again.',
          error: error.message
        }
      }
    }
    return response
  }

  async update(params, request) {
    const userData = request.only(['email', 'username', 'password'])
    let response
    try {
      const user = await User.query().where('id', params.id).update(userData)
      if (!user) {
        throw 'User does not exist'
      }

      response = {
        statusCode: 200,
        data: {
          status: true,
          user,
          message: 'User has been updated successfully'
        }
      }
    } catch (error) {
      response = {
        statusCode: 400,
        data: {
          status: false,
          error: error.message,
          message: 'Failed to update user'
        }
      }
    }
    return response
  }

  async delete(params) {
    let response
    try {
      const user = await User.find(params.id)
      if (!user) {
        throw 'User does not exist'
      }

      await user.delete()

      response = {
        statusCode: 200,
        data: {
          status: true,
          user,
          message: 'User has been removed successfully'
        }
      }
    } catch (error) {
      response = {
        statusCode: 400,
        data: {
          status: false,
          error: error.message,
          message: 'Failed to removed user'
        }
      }
    }
    return response
  }
}

module.exports = UserRepository;
