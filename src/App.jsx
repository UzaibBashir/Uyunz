import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import './App.css';

// Import pages
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Attendance from './pages/Attendance';
import Notes from './pages/Notes';
import Notices from './pages/Notices';
import Timetable from './pages/Timetable';
import Doubts from './pages/Doubts';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Feed from './pages/Feed';

function App() {
  return (

    <Router>
      <Routes>

        <Route path="/" element={
          <Layout title="Welcome, Uzaib">
            <Dashboard />
          </Layout>
          }
        />
        <Route path="/dashboard" element={
          <Layout title="Welcome, Uzaib">
            <Dashboard />
          </Layout>
          } 
        />

        <Route path="/students" element={
          <Layout title="Student Management">
            <Students />
          </Layout>
        } />
        <Route path="/attendance" element={
          <Layout title="Attendance Tracking">
            <Attendance />
          </Layout>
        } />

        <Route path="/notes" element={
          <Layout title="Notes Management">
            <Notes />
          </Layout>
        } />
        
        <Route path="/notices" element={
          <Layout title="Notices">
            <Notices />
          </Layout>
        } />
        <Route path="/timetable" element={
          <Layout title="Timetable">
            <Timetable />
          </Layout>
        } />
        <Route path="/doubts" element={
          <Layout title="Student Doubts">
            <Doubts />
          </Layout>
        } />
        <Route path="/analytics" element={
          <Layout title="Analytics">
            <Analytics />
          </Layout>
        } />
        <Route path="/profile" element={
          <Layout title="Profile">
            <Profile />
          </Layout>
        } />
        <Route path="/settings" element={
          <Layout title="Settings">
            <Settings />
          </Layout>
        } />
        <Route path="/feed" element={
          <Layout title="Feed">
            <Feed />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;

