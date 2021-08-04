var expressJwt = require("express-jwt");

// make sure that the app uses jwt and hence uthenticated users for api calls

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  console.log("I am getting called");
  return expressJwt({
    secret,
    algorithms: ["HS256"],
    // isRevoked: isRevoked,
  }).unless({
    path: [
      {
        url: /\/api\/v1\/books(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      { url: /\/api\/v1\/bookissue(.*)/, methods: ["GET", "OPTIONS", "POST"] },

      `${api}/user/login`,
    ],
  });
}

// function to revoke jwt token if the user is not admin

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
}

module.exports = authJwt;
