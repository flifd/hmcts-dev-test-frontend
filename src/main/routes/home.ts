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
}
