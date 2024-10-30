import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { userSignup, resetError } from '../redux/actions/userActions';

function SignForm() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const { error, loading } = useSelector(state => state.user);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Reset global error when user starts typing
    if (error) {
      dispatch(resetError());
    }
  };

  const onSubmit = (e) => {
    e.preventDefault(); 
    dispatch(userSignup(formData, navigate));
  };

  const isButtonDisabled = !formData.firstname || !formData.lastname || !formData.email || !formData.password || loading;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '350px' }}>
        <h1 className="text-center mb-4 text-blue50">Sign Up</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              value={formData.firstname} 
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              value={formData.lastname} 
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email} 
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
              value={formData.password}
              onChange={onChange}
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/" className="text-primary">Already have an account?</Link>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isButtonDisabled}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignForm;
