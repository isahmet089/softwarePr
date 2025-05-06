const app = require('./app');
const dbConnect = require('./config/dbConfig');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
dbConnect();

app.listen(PORT|| 3000, () => {
  console.log(`Server is running on port ${PORT}`);
});