// Mock Database
const users = [
    {
      email: "test@example.com",
      password: "123456",
      name: "Test User",
    },
  ];
  
  // Simulate User Signup
  export const signup = ({ name, email, password }) => {
    // Check if the email already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return { success: false, message: "Email already registered" };
    }
    // Add new user to database
    users.push({ name, email, password });
    return { success: true, message: "Signup successful" };
  };
  
  // Simulate User Login
  export const login = ({ email, password }) => {
    const user = users.find((user) => user.email === email);
    if (!user) {
      return { success: false, message: "Email not registered" };
    }
    if (user.password !== password) {
      return { success: false, message: "Incorrect password" };
    }
    return { success: true, message: "Login successful" };
  };
  