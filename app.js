const express = require('express');
const app = express();
const port = 8080;

// Middleware to parse JSON in the request body
app.use(express.json());

// Sample data
const flights = [
  { id: 1, origin: 'SIN', destination: 'MNL', airlines: 'PAL'  },
  { id: 2, origin: 'SIN', destination: 'MNL', airlines: 'CEB'  },
  { id: 3, origin: 'SIN', destination: 'MNL', airlines: 'SQ'  },
];

// Route to get all flights
app.get('/getFlight', (req, res) => {
//  res.json(flights);
        // Use JSON.stringify with null and 2 for indentation
  const formattedFlights = JSON.stringify(flights, null, 2);

  // Set Content-Type header to application/json
  res.setHeader('Content-Type', 'application/json');

  // Send the nicely formatted JSON response
  res.end(formattedFlights);
});

// Route to get a specific flight by ID
app.get('/getFlight/:id', (req, res) => {
  const flightId = parseInt(req.params.id);
  const flight = flights.find(u => u.id === flightId);
 // const formattedflight = JSON.stringify(flight, null, 2);

  if (!flight) {
    return res.status(404).json({ error: 'Flight not found' });
  }
  res.setHeader('Content-Type', 'application/json');
  res.json(flight);
});

// Route to create a new flight
app.post('/createFlight', (req, res) => {
  const newFlight = req.body;
  if (!isValidFlight(newFlight)) {
    return res.status(400).json({ error: 'Bad Request. Invalid flight data.' });
  }
  newFlight.id = flights.length + 1;
  flights.push(newFlight);

  res.status(201).json(newFlight);
});

function isValidFlight(flight) {
  // Implement your validation logic here
  // For example, check if the required fields are present
  return flight && flight.firstname && flight.surname && flight.number;
}

// Route to update a flight by ID
app.put('/updateFlight/:id', (req, res) => {
  const flightId = parseInt(req.params.id);
  const flight = flights.find(u => u.id === flightId);

  if (!flight) {
    return res.status(404).json({ error: 'Flight not found' });
  }

  // Update flight data
  flight.name = req.body.name;
  res.json(flight);
});

// Route to delete a flight by ID
app.delete('/deleteFlights/:id', (req, res) => {
  const flightId = parseInt(req.params.id);
  const index = flights.findIndex(u => u.id === flightId);

  if (index === -1) {
    return res.status(404).json({ error: 'Flight not found' });
  }

  // Remove flight from the array
  flights.splice(index, 1);

  res.json({ message: 'Flight deleted successfully' });
});

app.listen(port, () => {
  console.log("Server Running!");
});
