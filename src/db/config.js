const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true, 
  useUnifiedTopology: true, 
  poolSize: 10, 
  bufferMaxEntries: 0,
}

const DB_HOST = 'localhost'
const DB_NAME = 'referral-program'
const DB_PORT = 27017

const dbConnectionURL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`


const serverURL = 'http://localhost:3000'

module.exports = {
  dbConnectionURL,
  options,
  serverURL,
}
