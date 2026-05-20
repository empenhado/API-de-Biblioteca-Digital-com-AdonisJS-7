import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  name: vine.string().nullable(),
  email: email().unique({ table: 'users', column: 'email' }),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})

export const createUserValidator = vine.create({
  name: vine.string(),
  email: vine.string().email().unique({table: 'users', column: 'email'}),
  password: vine.string().minLength(6)
})

export const updateUserValidator = vine.create({
  name: vine.string(),
  password: vine.string().minLength(6)
})