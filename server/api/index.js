const router = require('express').Router()

router.get('/test', (req, res) => {
  res.send({result: 'success'})
})

module.exports = router
