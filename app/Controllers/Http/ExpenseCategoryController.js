'use strict'

const ExpenseCategory = use('App/Models/ExpenseCategory')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with expensecategories
 */
class ExpenseCategoryController {
  /**
   * Show a list of all expensecategories.
   * GET expensecategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const expenseCategories = await new ExpenseCategory().query().where('user_id', userId).fetch()
      response.send({
        status: 'success',
        data: expenseCategories,
        message: 'Expense categories retrieved successfully'
      })
    } catch (error) {
      response.send({
        status: 'error',
        message: error.message || 'Oops!, something went wrong please try again',
        error: error
      })
    }
  }

  /**
   * Render a form to be used for creating a new expensecategory.
   * GET expensecategories/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new expensecategory.
   * POST expensecategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single expensecategory.
   * GET expensecategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing expensecategory.
   * GET expensecategories/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update expensecategory details.
   * PUT or PATCH expensecategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a expensecategory with id.
   * DELETE expensecategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = ExpenseCategoryController
