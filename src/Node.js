// Assuming 'express' is your Express.js app
const express = require('express');
const app = express();

app.post('/api/admin/login', (req, res) => {
  // Your authentication logic here
  // ...

  if (loginSuccessful) {
    res.status(200).json({ message: 'Login Successful' });
  } else {
    res.status(401).json({ message: 'Login Failed' });
  }
});

// Start the server
app.listen(8770, () => {
  console.log('Server is running on port 8770');
});
