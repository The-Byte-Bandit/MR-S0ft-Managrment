import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, resetError } from '../redux/actions/userActions'; // Import resetError
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); 

  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  // Clear error on input change
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Reset error when user starts typing
    if (user.error) {
      dispatch(resetError()); // Use the global error reset
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Dispatch the login action
    dispatch(userLogin(email, password, navigate));
  };

  const isButtonDisabled = !email || !password || user.loading;

  // Clear any existing error when the component mounts
  useEffect(() => {
    dispatch(resetError()); // Reset the error when the component loads
  }, [dispatch]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '350px' }}>
        <h1 className="text-center mb-4 text-blue50">Login</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>

          {/* Display an error message if there's an error */}
          {user.error && (
            <div className="alert alert-danger">
              {user.error}
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center">
            <Link to="/signup" className="text-primary">Don't have an account?</Link>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isButtonDisabled}
            >
              {user.loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
