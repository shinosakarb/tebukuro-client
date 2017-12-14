const prod = process.env.NODE_ENV === 'production'

module.exports = {
  'process.env.BASE_URL': prod ? 'http://tebukuro-api.shinosakarb.org/' : 'http://localhost:3000/',
}
