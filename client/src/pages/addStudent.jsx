import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createStudent } from '../redux/actions/userActions';


function AddStudent() {
    const token = useSelector(state => state.user.user.token);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    classes: '',
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createStudent(formData, token));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 font-normal">Add Student</h2>
      <form onSubmit={onSubmit} className="p-4 border rounded shadow-sm bg-light">
        {error && <div className="alert alert-danger">{error}</div>}
        
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
        
        <div className="mb-3">
          <label htmlFor="classes" className="form-label">Classes (Comma-separated IDs)</label>
          <input
            type="text"
            className="form-control"
            id="classes"
            name="classes"
            value={formData.classes}
            onChange={onChange}
            placeholder="e.g., 12345, 67890"
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
