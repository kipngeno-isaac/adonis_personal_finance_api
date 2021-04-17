'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.post('register', 'AuthController.register')
  Route.post('login', 'AuthController.login')
}).prefix('auth')

Route.group(() => {
  Route.get('/users', 'UserController.index')
  Route.get('/users/:id', 'UserController.show')
  Route.patch('/users/:id', 'UserController.update')
  Route.delete('/users/:id', 'UserController.destroy')
}).prefix('api/v1')

Route.group(() => {
  Route.post('/expenses', 'ExpenseController.store')
  Route.get('/expenses', 'ExpenseController.index')
  Route.get('/expenses/:id', 'ExpenseController.show')
  Route.patch('/expenses/:id', 'ExpenseController.update')
  Route.delete('/expenses/:id', 'ExpenseController.destroy')
}).prefix('api/v1')
