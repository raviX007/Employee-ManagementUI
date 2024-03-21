import React, { useState, useEffect } from "react";
import EmpService from "../services/EmpService";

const Emp = props => {
  const initialOrdState = {
    emp_name: "",
    emp_sal: "",
    dept_name: "",
    dept_id:"",
    emp_phn:"",
    
  };
  const [currentEmp, setCurrentEmp] = useState(initialOrdState);
  const [message, setMessage] = useState("");
  

  const getEmp = id => {
    EmpService.get(id)
      .then(response => {
        setCurrentEmp(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getEmp(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    // console.log("Value:",value);
    setCurrentEmp({ ...currentEmp, [name]: value });
    // setShipmentStatus(value);

  };

 

  const updateEmp = () => {
    EmpService.update(currentEmp.emp_id, currentEmp)
      .then(response => {
        console.log(response.data);
        setMessage("The Employee Information was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentEmp ? (
        <div className="edit-form">
          <h4>Update Employee</h4>
          <form>
          
            <div className="form-group">
              <label htmlFor="emp_id">Emp Id</label>
              <input
                type="text"
                className="form-control"
                id="emp_id"
                name="emp_id"
                value={currentEmp.emp_id}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emp_sal">Emp Sal</label>
              <input
                type="text"
                className="form-control"
                id="emp_sal"
                name="emp_sal"
                value={currentEmp.emp_sal}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emp_name">Emp Name</label>
              <input
                type="text"
                className="form-control"
                id="emp_name"
                name="emp_name"
                value={currentEmp.emp_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dept_id">Dept Id</label>
              <input
                type="text"
                className="form-control"
                id="dept_id"
                name="dept_id"
                value={currentEmp.dept_id}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dept_name">Dept Name</label>
              <input
                type="text"
                className="form-control"
                id="dept_name"
                name="dept_name"
                value={currentEmp.dept_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emp_phn">Emp Contact</label>
              <input
                type="text"
                className="form-control"
                id="emp_phn"
                name="emp_phn"
                value={currentEmp.emp_phn}
                onChange={handleInputChange}
              />
            </div>

          </form>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateEmp}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Emp...</p>
        </div>
      )}
    </div>
  );
};

export default Emp;
