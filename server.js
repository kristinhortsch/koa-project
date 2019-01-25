require('dotenv').config();
require('./lib/utils/connect')();
const app = require('./lib/app');

app.listen(3000, () => {
  console.log('Server started on port 7890');
});

