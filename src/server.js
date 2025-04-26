const app = require('./app');
const dbConnect = require('./config/dbConfig');

dbConnect();

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});