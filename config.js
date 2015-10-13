var config = {
  development: {
    client_id: 'e17a3afcc2c7691bfd11',
    redirect_uri: 'http://127.0.0.1:9966',
    ghAuthHost: 'http://127.0.0.1:5000'
  },
  production: {}
}

module.exports = config[process.env.NODE_ENV]
