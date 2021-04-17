'use strict'

const UserRepository = use('App/Repositories/UserRepository')
const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  constructor() {
    this.repo = new UserRepository()
  }

  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const users = await User.query().paginate(1, 10)
      response.status(200).send({
        status: 'success',
        users,
        message: 'Users retrieved successfully'
      })
    } catch (error) {
      response.status(500).send({
        status: 'error',
        message: 'Oops! something went wrong please try again',
        error: error.message
      })
    }
  }



  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show({ params, response }) {
    try {
      const user = this.repo.findOne(params)
      return response.status(user.statusCode).send(user.data)
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Oops!, Something went wrong please try again',
        error: error.message,
      })
    }
  }


  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const user = this.repo.update(params, request)
      return response.status(user.statusCode).send(user.data)
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Oops!, Something went wrong please try again',
        error: error.message,
      })
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      const user = this.repo.delete(params)
      return response.status(user.statusCode).send(user.data)
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Oops!, Something went wrong please try again',
        error: error.message,
      })
    }
  }
}

module.exports = UserController
