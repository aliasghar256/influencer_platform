const express = require('express')
const userRouter = require('./userRouter')
const influencerRouter = require('./influencerRouter')
const judgmentRouter = require('./judgmentRouter')
const favoritesRouter = require('./favoritesRouter')
const searchLogRouter = require('./searchLogRouter')
const actOrdinanceRouter = require('./actOrdinanceRouter')
const notificationsRouter = require('./influencerRouter')
const templatesRouter = require('./templatesRouter')
const mainRouter = express.Router()

mainRouter.use('/user', userRouter)
mainRouter.use('/influencer', influencerRouter)
//mainRouter.use('/elasticsearch', elasticSearchRouter)
//Middleware Added for all the routes after /judgment
// mainRouter.use(authenticateToken)
// mainRouter.use('/judgment', judgmentRouter)
// mainRouter.use('/notifications', notificationsRouter)
// mainRouter.use('/favorites', favoritesRouter)
// mainRouter.use('/searchlog', searchLogRouter)
// mainRouter.use('/usernote',userNoteRouter)
// mainRouter.use('/templates', templatesRouter)

//mainRouter.post('/authtoken', (req, res) => res.send('Token Verified'))

module.exports = mainRouter