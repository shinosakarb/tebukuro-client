const prod = process.env.NODE_ENV === 'production'

module.exports = {
  'process.env.BASE_URL': prod ? 'https://api.example.com/' : 'http://localhost:3000/',
}
