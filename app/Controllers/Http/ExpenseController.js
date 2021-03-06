'use strict'
const Expense = use('App/Models/Expense')
const ExpenseRepository = use('App/Repositories/ExpenseRepository')
const moment = require('moment')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with expenses
 */
class ExpenseController {
  constructor() {
    this.repo = new ExpenseRepository()
  }
  /**
   * Show a list of all expenses.
   * GET expenses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    try {
      console.log('moment', moment().format('YYYY-MM-DD'));
      const userId = request.input('user_id');
      const page = request.input('page')
      const expenses = await Expense.query()
        .where('user_id', userId)
        // .where('date', moment().format('YYYY-MM-DD'))
        .paginate(page, 10)
      return response.ok({
        status: true,
        expenses,
        message: 'Expenses retrieved successfully'
      })
    } catch (error) {
      return response.send({
        status: false,
        message: 'Oops! something went wrong please try again',
        error: error.message
      })
    }
  }


  /**
   * Create/save a new expense.
   * POST expenses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const expense = await this.repo.save(request)
      return response.created(expense)
    } catch (error) {
      return response.send({
        status: 'error',
        message: 'Oops! something went wrong please try again',
        error: error.message
      })
    }
  }

  /**
   * Display a single expense.
   * GET expenses/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show({ params, response }) {
    try {
      const expense = await this.repo.findOne(params)
      return response.status(expense.statusCode).send(expense.data)
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Oops! something went wrong please try again',
        error: error.message
      })
    }
  }



  /**
   * Update expense details.
   * PUT or PATCH expenses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const expense = await this.repo.update(params, request)
      return response.status(expense.statusCode).send(expense.data)
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Oops! something went wrong please try again',
        error: error.message
      })
    }
  }

  /**
   * Delete a expense with id.
   * DELETE expenses/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      const expense = await this.repo.delete(params)
      return response.status(expense.statusCode).send(expense.data)
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Oops! something went wrong please try again',
        error: error.message
      })
    }
  }
}

module.exports = ExpenseController
