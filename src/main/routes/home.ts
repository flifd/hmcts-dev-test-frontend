import { Application } from 'express';
import axios from 'axios';

export default function (app: Application): void {
  app.get('/', async (req, res) => {
    try {
      // An example of connecting to the backend (a starting point)
      const response = await axios.get('http://localhost:4000/tasks');
      console.log(response.data);
      res.render('home', { "tasks": response.data, "taskSize": response.data.length });
    } catch (error) {
      console.error('Error making request:', error);
      res.render('home', {});
    }
  });

  app.get('/tasks/new', async (req, res) => {
    try {
      res.render('createtaskform');
    } catch (error) {
      console.error('Error making request:', error);
      res.render('home', {});
    }
  });

  app.post('/tasks/create', async (req, res) => {
    try {
      const { title, description, dueTime } = req.body;
      const day = req.body['dueDate-day'];
      const month = req.body['dueDate-month'];
      const year = req.body['dueDate-year'];
      
      // Combine date and time into ISO 8601 format
      const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${dueTime}:00`;
      
      await axios.post('http://localhost:4000/tasks', {
        title,
        description,
        dueTimestamp: dateString
      });
      res.redirect('/');
    } catch (error) {
      console.error('Error creating task:', error);
      res.render('createtaskform', { error: 'Failed to create task' });
    }
  });
}
