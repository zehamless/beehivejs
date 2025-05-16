require('dotenv').config();
const app = require('./src/app');
const {connectDB} = require("./config/db");

const PORT = process.env.PORT || 3000;

(async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})();
