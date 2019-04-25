var loggly = require('node-loggly-bulk');

var client = loggly.createClient({
  token: "your-really-long-input-token",
  subdomain: "your-subdomain",
  auth: {
    username: "your-username",
    password: "your-password"
  },
  //
  // Optional: Tag to send with EVERY log message
  //
  tags: ['global-tag']
});