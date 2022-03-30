'use strict'

const Category = use('App/Models/ExpenseCategory')


class CategoryRepository {

  async save(request) {
    const categoryData = request.only(['user_id', 'name'])

    const category = await Category.create(categoryData)

    if (!category) {
      throw 'Failed to save category please try again'
    }

    return {
      status: true,
      category,
      message: 'Category saved successfully'
    }
  }

}

module.exports = CategoryRepository;
