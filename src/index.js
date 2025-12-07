import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./db/db.js";

dotenv.config({
  path: "./.env",
});
const port = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`🔗 Space backend is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Mongodb Error", err);
    process.exit(1);
  });
