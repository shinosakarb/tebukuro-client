const prod = process.env.NODE_ENV === 'production'

module.exports = {
  'process.env.BASE_URL': prod ? 'https://tebukuro-api.shinosakarb.org/' : 'http://localhost:3000/',
  'process.env.FRONT_URL': prod ? 'https://tebukuro.shinosakarb.org/' : 'http://localhost:4000/',
}
