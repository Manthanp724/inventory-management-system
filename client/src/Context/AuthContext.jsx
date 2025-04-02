import React, {createContext, useEffect, useState} from "react";
import axios from "axios";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    // load the user when he register or enter the app

    useEffect( () => {
        const storedUser = localStorage.getItem("user");
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }
    },[])


    // store User in the local Storage

    const storeUser = (userData) => {
        console.log("UserData : ", userData);
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData);
    }

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    }


    // now connect the frontend with the backend in user part
    const signup = async(name, email, phone, password, organization) => {
        setLoading(true);
        setError(false);
        try {
            const res = await axios.post("http://localhost:8080/user/v1/signup",{name, email, phone, password, organization})
            if (!res.data.user) {  
                throw new Error("Invalid response from server"); 
            }    
            storeUser(res.data.message)
            return true;
        } catch (error) {
            setError(error.response?.data?.error || "Signup failed. Please try again.");
            return false;
        } finally {
            setLoading(false);
        }
    }

    // for login
    const login = async(email, password) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post("http://localhost:8080/user/v1/login",{email, password})

            if (!res.data.user) {  
                throw new Error("Invalid response from server"); 
            }    
            storeUser(res.data.user);
            return true;
        } catch (err) {
            console.log("Error : ", err);
            
            setError(err.response?.data?.error || "Login failed. Please try again.");
            return false;
        } finally {
            setLoading(false);
        }
    }
    return(
        <AuthContext.Provider value={{user, error, login, signup, loading, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
