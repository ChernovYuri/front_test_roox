import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.scss';
import Sidebar from './components/sidebar/Sidebar';
import UserProfile from './pages/UserProfile/UserProfile';
import UserList from './pages/UserList/UserList';

const App: React.FC = () => {
    return (
        <div className="app">
            <Sidebar/>
            <div className="app_content">
                <Routes>
                    <Route path="/" element={<UserList/>}/>
                    <Route path="/user/:userId" element={<UserProfile/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default App;
