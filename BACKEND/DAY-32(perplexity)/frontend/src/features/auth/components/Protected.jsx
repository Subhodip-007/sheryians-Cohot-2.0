import React from 'react'
import { useSelector } from "react-redux"
import { Navigate } from 'react-router';
import Loading from './Loading';

const Protected = ({ children }) => {
    // 1. Grab the top-level auth state safely (fallback to an empty object if auth slice is missing)
    const auth = useSelector(state => state.auth || {});
    
    // 2. Safely extract variables using standard properties, not destructuring nested properties
    const user = auth.user;
    const loading = auth.loading;

    // 3. If Redux says it's loading (like when handleGetMe is running), show the cat loader
    if (loading) {
       return <Loading />
    }

    // 4. If loading finishes and user is still null, bounce them to login
    if (!user) {
         return <Navigate to="/login" replace />;
    }

    return children;
}

export default Protected;