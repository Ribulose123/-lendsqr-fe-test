import React, { useState } from 'react';
import '../styles/Login.scss';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const container = {
    hidden: { opacity: 0, y: -20 }, // Start position off-screen (above)
    show: {
      opacity: 1,
      y: 0, // End position on-screen
      transition: {
        duration: 0.5, // Animation duration
      },
    },
  };

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      const extractedName = email.split('@')[0];
      login(extractedName);
      navigate('/dashboard');
    }
    console.log(email, password);
  };

  return (
    <motion.div
      className="login"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <img src="/Group.svg" alt="Logo" />

      <div className="content">
        <img src="/image/pablo-sign-in 1.jpg" alt="Sign In Illustration" />
        <div className="form-container">
          <h2>Welcome!</h2>
          <p>Enter details to login.</p>
          <form onSubmit={handleSumbit}>
            <input
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password" 
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>Forgot PASSWORD?</p>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
