const faqModel = require('../../models').Faq

const faqController = {
  getAll: async(req, res, next) => {
    const orderDirection = req.query.order
    try {
      const options = {
        where: {
          isDeleted: 0
        }
      }
      if (orderDirection === 'ASC' || orderDirection === 'DESC') options.order = [['order', orderDirection], ['id', 'ASC']]
      const faqs = await faqModel.findAll(options)
      res.json(faqs)
    } catch (err) {
      next(err)
    }
  },

  get: async(req, res, next) => {
    const { id } = req.params
    try {
      const faq = await faqModel.findOne({
        where: {
          id,
          isDeleted: 0
        }
      })
      res.json(faq)
    } catch (err) {
      next(err)
    }
  },

  create: async(req, res, next) => {
    const { title, content, order } = req.body
    try {
      const faq = await faqModel.create({
        title,
        content,
        order
      }, {
        fields: ['title', 'content', 'order']
      })
      res.json(faq)
    } catch (errObj) {
      if (errObj.errors.some((error) => error.type === 'unique violation')) return res.json('order should be unique')
      next(errObj)
    }
  },

  update: async(req, res, next) => {
    const { title, content, order } = req.body
    const { id } = req.params
    try {
      const result = await faqModel.update({
        title,
        content,
        order
      }, {
        where: {
          id,
          isDeleted: 0
        }
      })
      if (!result[0]) return res.status(404).json(`id: ${id} doesn't exist`)
      const faq = await faqModel.findOne({
        where: {
          id,
          isDeleted: 0
        }
      })
      res.json(faq)
    } catch (errObj) {
      if (errObj.errors.some((error) => error.type === 'unique violation')) return res.status(404).json('order should be unique')
      next(errObj)
    }
  },

  delete: async(req, res, next) => {
    const { id } = req.params
    try {
      const result = await faqModel.update({
        isDeleted: 1
      }, {
        where: {
          id,
          isDeleted: 0
        }
      })
      if (!result[0]) return res.status(404).json(`id: ${id} doesn't exist`)
      res.json(`id: ${id} is deleted`)
    } catch (err) {
      next(err)
    }
  },

  checkInput: (req, res, next) => {
    const { title, content, order } = req.body
    if (order <= 0) return res.status(400).json('order should be greater then 0')
    if ((!title && title !== 0) || (!content && content !== 0) || (!order)) return res.status(400).json('input cannot be null')
    next()
  }
}

module.exports = faqController
