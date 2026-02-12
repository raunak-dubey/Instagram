import 'dotenv/config'

import app from "./src/app.js";
import connectDB from "./src/config/db.config.js";

connectDB();
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})