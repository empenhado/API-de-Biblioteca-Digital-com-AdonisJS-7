import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator } from '#validators/user'



export default class UsersController {
  /**
   * Display a list of resource
   */
  async index(){ //lista todos os usuarios
    const users = await User.all()
    return users
  } 

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) { //cria usuarios
    const {name,email,password} = await request.validateUsing(createUserValidator)
    const user = await User.create({
      name,
      email,
      password,
    })
    return user
  } 

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {//mostra o usuario relacionado ao parametro
    try{
      const user = await User.findByOrFail('id', params.id)
      return user
    } catch(error){
      return response.status(404).json({error: 'User not found'})
    }
  } 

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}