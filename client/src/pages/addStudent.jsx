import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClasses, resetStatus, resetError, createStudent } from '../redux/actions/userActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddStudent() {
  const token = useSelector((state) => state.user.user.token);
  const classes = useSelector((state) => state.user.classes);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);
  
  const [formData, setFormData] = useState({
    date: '',
    gender: '',
    phone: '',
    firstname: '',
    lastname: '',
    address: '',
    qualification: '',
    email: '',
    classes: [],
    duration: '',
    trainingFee: '',
    amountPaid: '',
    balance: '',
    guardianName: '',
    guardianRelationship: '',
    guardianPhone: '',
    counselor: '',
    startDate: '',
    endDate: '',
    remark: '',
    password: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClasses(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (status === 201) {
      toast.success("Student created successfully!");
      setFormData({
        date: '',
        gender: '',
        phone: '',
        firstname: '',
        lastname: '',
        address: '',
        qualification: '',
        email: '',
        classes: [],
        duration: '',
        trainingFee: '',
        amountPaid: '',
        balance: '',
        guardianName: '',
        guardianRelationship: '',
        guardianPhone: '',
        counselor: '',
        startDate: '',
        endDate: '',
        remark: '',
        password: '',
      });
      dispatch(resetStatus());
    } else if (error) {
      toast.error(error);
    }
  }, [status, error, dispatch]);

  // Generate password based on firstname, lastname, and phone
  const generatePassword = () => {
    const { firstname, lastname, phone } = formData;
    if (firstname && lastname && phone) {
      const password = `${firstname.slice(0, 3)}${lastname.slice(0, 3)}${phone.slice(-4)}`;
      setFormData((prevData) => ({ ...prevData, password }));
    }
  };

  // Generate password whenever relevant fields are updated
  useEffect(() => {
    generatePassword();
  }, [formData.firstname, formData.lastname, formData.phone, generatePassword],);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) {
      dispatch(resetError());
    }
  };

  const handleClassSelection = (classId) => {
    setFormData((prevData) => ({
      ...prevData,
      classes: prevData.classes.includes(classId)
        ? prevData.classes.filter((id) => id !== classId)
        : [...prevData.classes, classId],
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createStudent(formData, token));
  };

  const isButtonDisabled = !formData.firstname || !formData.lastname || !formData.email || loading;

  return (
    <div className="w-full flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="w-full sm:max-w-[640px] lg:max-w-[800px] xl:max-w-[1000px] mt-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold text-blue50">Add Student</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Date</label>
              <input
                type="date"
                className="form-control p-3 border rounded-lg"
                name="date"
                value={formData.date}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Gender</label>
              <input
                type="text"
                className="form-control p-3 border rounded-lg"
                placeholder="Gender"
                name="gender"
                value={formData.gender}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Phone No.</label>
              <input
                type="text"
                className="form-control p-3 border rounded-lg"
                placeholder="Phone No."
                name="phone"
                value={formData.phone}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">First Name</label>
              <input
                type="text"
                className="form-control p-3 border rounded-lg"
                placeholder="First Name"
                name="firstname"
                value={formData.firstname}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                className="form-control p-3 border rounded-lg"
                placeholder="Last Name"
                name="lastname"
                value={formData.lastname}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Address</label>
              <input
                type="text"
                className="form-control p-3 border rounded-lg"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Qualification</label>
              <input
                type="text"
                className="form-control p-3 border rounded-lg"
                placeholder="Qualification"
                name="qualification"
                value={formData.qualification}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="form-control p-3 border rounded-lg"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-blue50 font-medium">Select Classes</label>
              <div className="flex flex-wrap gap-2">
                {classes?.map((classItem) =>
                  classItem.isActive ? (
                    <div
                      key={classItem._id}
                      onClick={() => handleClassSelection(classItem._id)}
                      className={`p-2 border rounded-full cursor-pointer text-sm ${
                        formData.classes.includes(classItem._id)
                          ? 'bg-blue100 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {classItem.className}
                    </div>
                  ) : null
                )}
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Duration</label>
              <input
                type="text"
                className="form-control p-3 border rounded-lg"
                placeholder="Duration"
                name="duration"
                value={formData.duration}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Training Fee</label>
              <input
                type="number"
                className="form-control p-3 border rounded-lg"
                placeholder="Training Fee"
                name="trainingFee"
                value={formData.trainingFee}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Amount Paid</label>
              <input
                type="number"
                className="form-control p-3 border rounded-lg"
                placeholder="Amount Paid"
                name="amountPaid"
                value={formData.amountPaid}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Balance</label>
              <input
                type="number"
                className="form-control p-3 border rounded-lg"
                placeholder="Balance"
                name="balance"
                value={formData.balance}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Guardian / Sponsor's Name</label>
              <input
                type="text"
                className="form-control p-3 border rounded-lg"
                placeholder="Guardian / Sponsor's Name"
                name="guardianName"
                value={formData.guardianName}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Relationship with Guardian</label>
              <input
                type="text"
                className="form-control p-3 border rounded-lg"
                placeholder="Relationship with Guardian"
                name="guardianRelationship"
                value={formData.guardianRelationship}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Guardian's Phone No.</label>
              <input
                type="text"
                className="form-control p-3 border rounded-lg"
                placeholder="Guardian's Phone No."
                name="guardianPhone"
                value={formData.guardianPhone}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Counselor</label>
              <input
                type="text"
                className="form-control p-3 border rounded-lg"
                placeholder="Counselor"
                name="counselor"
                value={formData.counselor}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Training Commencement Date</label>
              <input
                type="date"
                className="form-control p-3 border rounded-lg"
                name="startDate"
                value={formData.startDate}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">End Date</label>
              <input
                type="date"
                className="form-control p-3 border rounded-lg"
                name="endDate"
                value={formData.endDate}
                onChange={onChange}
              />
            </div>
          </div>
          <textarea
            className="form-control p-3 border rounded-lg"
            placeholder="Remark"
            name="remark"
            value={formData.remark}
            onChange={onChange}
            rows="3"
          ></textarea>

          {/* Generated Password Field */}
          <div className="mt-4">
            <label className="block mb-1 font-medium text-gray-700">Generated Password</label>
            <input
              type="text"
              className="form-control p-3 border rounded-lg bg-gray-100"
              name="password"
              value={formData.password}
              readOnly
            />
            <small className="text-gray-500">Password is auto-generated based on the user's data.</small>
          </div>

          <button
            type="submit"
            className={`w-full sm:w-auto px-6 py-3 mt-6 text-white rounded-lg transition duration-200 ${
              isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue50 hover:bg-blue25'
            }`}
            disabled={isButtonDisabled}
          >
            {loading ? 'Adding Student...' : 'Add Student'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
