module.exports = {
  mongo: {
    url: `mongodb://${process.env.MONGO_HOST}:27017`,
    database: "professionisti-cyber"
  },
  oauth: {
    linkedin: {
      clientId: process.env.OAUTH_LINKEDIN_CLIENTID,
      clientSecret: process.env.OAUTH_LINKEDIN_CLIENTSECRET
    }
  }
}
