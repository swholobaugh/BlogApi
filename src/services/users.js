import Joi from '@hapi/joi'
import db from '../helpers/db'

const userSchema = Joi.object({
  uuid: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  picture: Joi.string()
    .uri()
    .required(),
})

const createNewUserObject = data => {
  const { error, value } = userSchema.validate(data)
  return !error
    ? {
        ...value,
        created: new Date().toLocaleString(),
        lastAccess: new Date().toLocaleString(),
      }
    : { error }
}

const createUserObject = data => {
  const { error, value } = userSchema.validate(data)
  return !error
    ? {
        ...value,
        lastAccess: new Date().toLocaleString(),
      }
    : { error }
}

export const getAll = async () => await db('users')

export const getByUUId = async uuid => {
  return await db('users')
    .where({ uuid })
    .first()
}

export const getById = async id => {
  return await db('users')
    .where({ id })
    .first()
}

export const add = async user => {
  const userObject = createNewUserObject(user)
  if (!userObject.error) {
    const id = await db('users').insert(userObject)
    return await getById(id[0])
  } else {
    return userObject
  }
}

export const update = async user => {
  if (await getByUUId(user.uuid)) {
    const userObject = createUserObject(user)
    await db('users')
      .where({ uuid: user.uuid })
      .update(userObject)
    return await getByUUId(user.uuid)
  } else {
    return null
  }
}

export const addOrUpdate = async user => {
  if (user.uuid) {
    const dbUser = await getByUUId(user.uuid)
    return dbUser ? await update(user) : await add(user)
  }
  return null
}
