// frontend/src/auth/auth.js
// Function to check if the user is logged in
export function userIsLoggedIn() {
  // Check if the access token exists in localStorage
  const accessToken = localStorage.getItem('accessToken');
  console.log('token: ', accessToken); 
  // Return true if the access token exists and is not empty, indicating the user is logged in
  return accessToken !== null && accessToken !== '';
}

// Function to retrieve the current user ID
export function getCurrentUserId() {
  // Retrieve user ID from localStorage or another source
  return localStorage.getItem('userId');
}
