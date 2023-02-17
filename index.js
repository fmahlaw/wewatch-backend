import { app,PORT } from "./app.js";
import storeRoutes from "./routes/stores.js";

app.use("/post_name_toped", storeRoutes);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
