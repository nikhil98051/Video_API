const express = require('express');
const app = express();
const videosRouter = require('./routes/videos');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/videos', videosRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
