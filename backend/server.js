const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock In-Memory Database
const users = {
  // Pre-seed the reviewer account so they can log in immediately
  'hire-me@anshumat.org': {
    id: 'reviewer_123',
    email: 'hire-me@anshumat.org',
    password: 'HireMe@2025!',
    profileComplete: false
  }
};
const applications = {}; // map of appId -> { userId, status, data, lastSaved }

// 1. Mock Authentication: Sign Up
app.post('/api/auth/signup', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
  
  if (users[email]) {
    return res.status(409).json({ error: 'An account with this email already exists' });
  }

  // Create mock user
  users[email] = { id: `user_${Date.now()}`, email, password, profileComplete: false };
  
  // Simulate network delay
  setTimeout(() => {
    res.status(201).json({ 
      token: `fake_token_${users[email].id}`, 
      user: { id: users[email].id, email, profileComplete: false } 
    });
  }, 1000);
});

// 2. Mock Authentication: Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
  
  const user = users[email];
  if (!user) {
    return res.status(404).json({ error: 'No account found with this email' });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: 'Incorrect password' });
  }
  
  // Simulate network delay
  setTimeout(() => {
    res.json({ 
      token: `fake_token_${user.id}`, 
      user: { id: user.id, email: user.email, name: user.name, dob: user.dob, city: user.city, profileComplete: user.profileComplete } 
    });
  }, 1000);
});

app.post('/api/users/profile', (req, res) => {
  const { userId, name, dob, city } = req.body;
  const userKey = Object.keys(users).find(k => users[k].id === userId);
  
  if (userKey) {
    users[userKey] = { ...users[userKey], name, dob, city, profileComplete: true };
    res.json({ user: users[userKey] });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// 2. Application Endpoints
app.get('/api/applications', (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: 'userId is required' });
  
  const userApps = Object.values(applications).filter(app => app.userId === userId);
  res.json({ applications: userApps });
});

app.get('/api/applications/:id', (req, res) => {
  const app = applications[req.params.id];
  if (app) res.json({ application: app });
  else res.status(404).json({ error: 'Application not found' });
});

app.post('/api/applications', (req, res) => {
  const { userId, type } = req.body;
  const newApp = {
    id: `APP${Math.floor(Math.random() * 1000000)}`,
    userId,
    type: type || 'fresh',
    status: 'draft',
    data: {
      personalDetails: {},
      familyDetails: {},
      addressDetails: {}
    },
    lastSaved: new Date().toISOString()
  };
  
  applications[newApp.id] = newApp;
  res.status(201).json({ application: newApp });
});

app.put('/api/applications/:id', (req, res) => {
  const appId = req.params.id;
  const { data } = req.body;
  
  if (applications[appId]) {
    applications[appId] = {
      ...applications[appId],
      data: { ...applications[appId].data, ...data },
      lastSaved: new Date().toISOString()
    };
    
    // Simulate network delay for sync realism
    setTimeout(() => {
      res.json({ application: applications[appId] });
    }, 500);
  } else {
    res.status(404).json({ error: 'Application not found' });
  }
});

app.post('/api/applications/:id/submit', (req, res) => {
  const appId = req.params.id;
  if (applications[appId]) {
    applications[appId].status = 'submitted';
    applications[appId].submittedAt = new Date().toISOString();
    
    setTimeout(() => {
      res.json({ application: applications[appId], message: 'Application submitted successfully' });
    }, 1500);
  } else {
    res.status(404).json({ error: 'Application not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
