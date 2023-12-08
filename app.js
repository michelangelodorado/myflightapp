const express = require('express');
const app = express();
const port = 8080;

// Middleware to parse JSON in the request body
app.use(express.json());

// Sample data
const users = [
  { id: 1, firstname: 'Mike', surname: 'Dorado', number: '943xxx43'  },
  { id: 2, firstname: 'Zacha', surname: 'Valerie', number: '861xxx62'  },
  { id: 3, firstname: 'Yuki', surname: 'Dorado', number: '861xxx63'  },
];

const roles = [
  { id: 1, role: 'Solutions Engineer' },
  { id: 2, role: 'Software QA'  },
];

// Route to get all users
app.get('/users', (req, res) => {
//  res.json(users);
        // Use JSON.stringify with null and 2 for indentation
  const formattedUsers = JSON.stringify(users, null, 2);

  // Set Content-Type header to application/json
  res.setHeader('Content-Type', 'application/json');

  // Send the nicely formatted JSON response
  res.end(formattedUsers);
});

// Route to get all roles
app.get('/roles', (req, res) => {
  //res.json(roles);
  const formattedUsers = JSON.stringify(roles, null, 2);

  // Set Content-Type header to application/json
  res.setHeader('Content-Type', 'application/json');

  // Send the nicely formatted JSON response
  res.end(formattedUsers);
});

// Route to get a specific user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
 // const formatteduser = JSON.stringify(user, null, 2);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.setHeader('Content-Type', 'application/json');
  res.json(user);
});

// Route to create a new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  if (!isValidUser(newUser)) {
    return res.status(400).json({ error: 'Bad Request. Invalid user data.' });
  }
  newUser.id = users.length + 1;
  users.push(newUser);

  res.status(201).json(newUser);
});

function isValidUser(user) {
  // Implement your validation logic here
  // For example, check if the required fields are present
  return user && user.firstname && user.surname && user.number;
}

// Route to update a user by ID
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Update user data
  user.name = req.body.name;
  res.json(user);
});

// Route to delete a user by ID
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Remove user from the array
  users.splice(index, 1);

  res.json({ message: 'User deleted successfully' });
});

app.listen(port, () => {
  console.log("Server Running!");
});
