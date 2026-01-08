// AuthService.js
// Location: Frontend/src/services/AuthService.js

export const AuthService = {
  // Check if user is authenticated
  isAuthenticated: () => {
    return Boolean(localStorage.getItem('authToken'));
  },
  
  // Login user and store authentication
  login: (userData) => {
    localStorage.setItem('authToken', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
  },
  
  // Logout user and clear all auth data
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('loginData'); // Clean up old key if exists
  },
  
  // Get stored user data
  getUserData: () => {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
  }
};