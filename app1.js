const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Viratvikky@82',
    database: 'moviebooking'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.use(express.static('public'));
// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

// Retrieve data from MySQL and send it to the client
app.get('/data', (req, res) => {
    connection.query('SELECT * FROM tickets', (error, results) => {
        if (error) {
            console.error('Error retreiving from MySQL:', error);
            return;
        }
        // Send the data as JSON to the client
        res.json(results);
    });
});

// Handle the element IDs submission
app.post('/submitelements', (req, res) => {
    const selectedElementIds = req.body.selectedElementIds;
  
    // Process the selected element IDs (e.g., perform actions based on the selected elements)
    // Here, we'll just log the selected element IDs for demonstration
    console.log('Selected element IDs:', selectedElementIds);

    selectedElementIds.forEach(element => {
        const updateQuery = 'UPDATE tickets SET status = 0 WHERE id = ?';
        const value = element;
        connection.query(updateQuery,value, (error, results) => {
            if (error) {
                console.error('Error updating MySQL:', error);
                return;
            }
            // Send the data as JSON to the client
            // res.json(results);
        });
      });
  
    // Respond to the client
    res.sendStatus(200);
  });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
