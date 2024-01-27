const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const date = new Date()
                  .toLocaleString('sv-SE', {timeZone: 'Asia/Tokyo'});
  res.send(
    '<h1>It works!</h1>' +
    `<p>Currently it is ${date}</p>`
  );
});

app.listen(port, () => {
  console.log(`Wakeup server. listening on port ${port}`);
});