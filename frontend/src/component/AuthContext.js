import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [user, setUser] = useState(null);
  const API_BASE_URL=process.env.REACT_APP_URL+"/employees";
  // console.log(API_BASE_URL);
  
  // Fetch employee data from API
  useEffect(() => {
    fetch(API_BASE_URL)
      .then(res => res.json())
      .then(data => setEmployeeDetails(data))
      .catch(err => console.error("Failed to fetch employee data:", err));
  },[API_BASE_URL]);
  
  const login = (employeeId, password) => {
    const foundUser = employeeDetails.find(emp => (emp.employeeId === employeeId) && (emp.password === password));
    if (foundUser) {
      setUser(foundUser);
      return { success: true, role: foundUser.role };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  };
  
  const logout = () => setUser(null);

  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
  
};

export const useAuth = () => useContext(AuthContext);
