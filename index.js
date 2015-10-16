var githubStaticAuth = require('github-static-auth')
var cookie = require('cookie-cutter')
var config = require('./config')

var auth = githubStaticAuth({
  githubSecretKeeper: config.ghAuthHost,
  githubClientId: config.client_id
})

start()

function start () {
  var token = cookie.get('github-auth-example')

  if (token) {
    auth.getProfile(token, function (err, profile) {
      renderProfile(profile)
    })
  } else if (auth.getCode()) {
    auth.login(function (err, token) {
      cookie.set('github-auth-example', token)
      window.location = window.location.origin
    })
  } else {
    renderLink()
  }
}

function renderProfile (profile) {
  var p = document.createElement('p')
  p.innerHTML = profile.name
  document.body.appendChild(p)

  var logout = document.createElement('a')
  logout.href = '#'
  logout.innerHTML = 'log out'
  document.body.appendChild(logout)

  logout.addEventListener('click', function (e) {
    e.preventDefault()
    cookie.set('github-auth-example', '')
    window.location = window.location
  })
}

function renderLink () {
  var url = 'https://github.com/login/oauth/authorize?client_id=' +
  config.client_id + '&scope=user&redirect_uri=' + config.redirect_uri
  var link = document.createElement('a')
  link.href = url
  link.innerHTML = 'Log in with GitHub'
  document.body.appendChild(link)
}
