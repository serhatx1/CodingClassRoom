// Handle.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionLoader from './Component/Question';
import Login from './Page/login';
import Register from './Page/Register';
import RequireAuth from './Middleware/Route';
import Layout from './Hook/layout'; 
import Footer from './Component/Footer';
import { SelectRole } from './Page/SelectRole';
import CreateClass from './Page/CreateClass';
import { OwnClasses } from './Page/OwnClasses';
import { ParticularClass } from './Page/ParticularClass';
import { JoinClass } from './Component/JoinClass';
import CreateExam from './Page/CreateExam';

const Handle = () => (
 
    <Router>
        <Routes>
            
            <Route path="/" element=
            {<Layout><Register /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/auth/role" element={<Layout><SelectRole /></Layout>} />
            <Route path="/class/create" element={<Layout><CreateClass /></Layout>} />
            <Route path="/class/get" element={<Layout><OwnClasses /></Layout>} />
            <Route path="/class/:classID" element={<Layout><ParticularClass /></Layout>} />
            <Route path="/class/join" element={<Layout><JoinClass /></Layout>} />
            <Route path="/exam/create" element={<Layout><CreateExam /></Layout>} />






            <Route
                path="/:questionType"
                element={
                    <Layout>
                            <QuestionLoader />
                    </Layout>
                }
            />
        </Routes>
    </Router>
);

export default Handle;
