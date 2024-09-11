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

const Handle = () => (
 
    <Router>
        <Routes>
            
            <Route path="/" element=
            {<Layout><Register /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/auth/role" element={<Layout><SelectRole /></Layout>} />

            <Route
                path="/:questionType"
                element={
                    <Layout>
                        {/* <RequireAuth> */}
                            <QuestionLoader />
                        {/* </RequireAuth> */}
                    </Layout>
                }
            />
        </Routes>
    </Router>
);

export default Handle;
