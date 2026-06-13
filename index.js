import app from "./src/app.js";
import { PORT } from "./src/config/env.js";
import { USER_NAME } from "./src/config/env.js";  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/api/${USER_NAME}/joke?word=school`);
});