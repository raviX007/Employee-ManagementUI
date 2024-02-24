import React, { useState } from "react";
import EmpService from "../services/OrdService";


const AddEmp = () => {
  const initialEmpState = {
    emp_id: null,
    emp_name: "",
    emp_sal: 0,
    dept_name:"",
    dept_id:0,
    emp_phone: 0
  
  };
  const [emp, setEmp] = useState(initialEmpState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEmp({ ...emp, [name]: value });
  };

  const saveEmp = () => {
    var data = {
      emp_name: emp.emp_name,
      emp_sal: emp.emp_sal,
      dept_name: emp.dept_name,
      dept_id: emp.dept_id,
      emp_phn: emp.emp_phn
    };

    EmpService.create(data)
      .then(response => {
        setEmp({
          emp_id: response.data.emp_id,
          emp_name: response.data.emp_name,
          emp_sal: response.data.emp_sal,
          dept_name: response.data.dept_name,
          dept_id: response.data.dept_id,
          emp_phn: response.data.emp_phn
  
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newEmp = () => {
    setEmp(initialEmpState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newEmp}>
            Add
          </button>
        </div>
      ) : (
        <div>

          <div className="form-group">
            <label htmlFor="emp_name">Employee Name</label>
            <input
              type="text"
              className="form-control"
              id="emp_name"
              required
              value={emp.description}
              onChange={handleInputChange}
              name="emp_name"
            />
          </div>


          <div className="form-group">
            <label htmlFor="emp_sal">Employee Salary</label>
            <input
              type="number"
              className="form-control"
              id="emp_sal"
              required
              value={emp.emp_sal}
              onChange={handleInputChange}
              name="emp_sal"
            />
          </div>


          <div className="form-group">
            <label htmlFor="dept_name">Dept Name</label>
            <input
              type="text"
              className="form-control"
              id="dept_name"
              required
              value={emp.dept_name}
              onChange={handleInputChange}
              name="dept_name"
            />
          </div>


          <div className="form-group">
            <label htmlFor="dept_id">Dept id</label>
            <input
              type="text"
              className="form-control"
              id="dept_id"
              required
              value={emp.dept_id}
              onChange={handleInputChange}
              name="dept_id"
            />
          </div>

          <div className="form-group">
            <label htmlFor="emp_phn">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="emp_phn"
              required
              value={emp.emp_phn}
              onChange={handleInputChange}
              name="emp_phn"
            />
          </div>
          

          <button onClick={saveEmp} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddEmp;
