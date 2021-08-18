'use strict'

const Expense = use('App/Models/Expense')
const moment = require('moment')


class ExpenseRepository {

  async save(request) {
    const expenseData = request.only(['user_id', 'name', 'amount'])

    expenseData.date = moment().format('YYYY-MM-DD');
    const expense = await Expense.create(expenseData)

    if (!expense) {
      throw 'Failed to save Expense please try again'
    }

    return {
      status: true,
      expense,
      message: 'Expense saved successfully'
    }
  }

  async update(params, request) {
    const expenseData = request.only(['name', 'amount'])
    let response
    try {
      const expense = await Expense.query().where('id', params.id).update(expenseData)
      if (!expense) {
        throw `couldn't find expense with id ${params.id}`
      }

      response = {
        statusCode: 200,
        data: {
          status: true,
          expense,
          message: 'Expense updated successfully'
        }
      }
    } catch (error) {
      response = {
        statusCode: 400,
        data: {
          status: false,
          error: error.message,
          message: 'Failed to update Expense'
        }
      }
    }
    return response
  }

  async findOne(params) {
    let response
    try {
      const expense = await Expense.find(params.id)
      if (!expense) {
        throw `Could not find expense with id ${params.id}`
      }

      response = {
        statusCode: 200,
        data: {
          status: true,
          expense,
          message: `Expense with id ${params.id} has been retrieved successfully`
        }
      }
    } catch (error) {
      response = {
        statusCode: 400,
        data: {
          status: false,
          error: error.message,
          message: 'Failed to retrieve expense'
        }
      }
    }
    return response
  }

  async delete(params) {
    let response
    try {
      const expense = await Expense.find(params.id)
      if (!expense) {
        throw `Couldn't find expense with id ${params.id}`
      }

      await expense.delete()

      response = {
        statusCode: 200,
        data: {
          status: true,
          expense,
          message: `Expense with id ${params.id} has been deleted successfully`
        }
      }
    } catch (error) {
      response = {
        statusCode: 400,
        data: {
          status: false,
          error: error.message,
          message: 'Failed to delete expense'
        }
      }
    }
    return response
  }
}

module.exports = ExpenseRepository;
