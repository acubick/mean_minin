module.exports.login = function (req, res) {
  res.status(200).json({
                         login: true,
                         msg: 'login from controller'
                       })
}


module.exports.register = function (req, res) {
  res.status(200).json({
                         register: true,
                         msg: 'register from controller'
                       })
}
