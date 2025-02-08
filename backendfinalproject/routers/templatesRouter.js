const express = require('express')
templatesRouter = express.Router()
const {fetchAllTemplates,downloadTemplateByID} = require('../controllers/templatesController')

templatesRouter.get('/fetch_all_templates', fetchAllTemplates)
templatesRouter.get('/download/:id', downloadTemplateByID)

module.exports = templatesRouter