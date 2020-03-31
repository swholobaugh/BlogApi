import * as users from '../services/users'
const admin = require('firebase-admin')
const serviceAccount = require('../../firebaseServiceAccount.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://blog-17950.firebaseio.com',
})

const auth = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization?.split(' ')[1]
    const decoded = idToken ? await admin.auth().verifyIdToken(idToken) : null
    if (decoded) {
      const theUser = await admin.auth().getUser(decoded.uid)

      const user = {
        uuid: theUser.uid,
        name: theUser.displayName,
        picture: theUser.photoURL || 'https://thelogin.rodolforoman.xyz/img/user.471a1ad3.png',
        email: theUser.email,
      }
      const dbUser = await users.addOrUpdate(user)
      req.user = dbUser
      next()
    } else {
      res.status(401).end()
    }
  } catch (error) {
    res.status(401).end()
  }
}

export default auth
