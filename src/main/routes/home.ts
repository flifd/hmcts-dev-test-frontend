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
      const { title, description } = req.body;
      const day = req.body['dueDate-day'];
      const month = req.body['dueDate-month'];
      const year = req.body['dueDate-year'];
      const dueTime = req.body.dueTime && req.body.dueTime !== '' ? req.body.dueTime : ' - 00:00:00';
      
      // Combine date and time into ISO 8601 format
      const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}${dueTime}`;
      
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

  app.get('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const response = await axios.get(`http://localhost:4000/tasks/${taskId}`);
    res.render('taskdetails', { task: response.data });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.render('error', { error: 'Task not found' });
  }
});

  app.post('/tasks/:taskId/status', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const taskStatus = req.body.taskStatus;
    const response = await axios.put(`http://localhost:4000/tasks/${taskId}/status`, {
        status: taskStatus
      });
      res.redirect('/tasks/' + response.data);
  } catch (error) {
    console.error('Error updating task:', error);
    res.render('error', { error: 'Failed to update task' });
  }
});

  app.post('/tasks/:taskId/delete', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    await axios.delete(`http://localhost:4000/tasks/${taskId}`);
    res.redirect('/');
  } catch (error) {
    console.error('Error fetching task:', error);
    res.render('error', { error: 'Task not found' });
  }
});
}
