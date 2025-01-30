import http from "../http-common";
const get= (id) =>{
  //return http.get(`http://localhost:8080/api/employees/${id}`);
  return http.get(`https://employee-management-be-nsts.onrender.com/api/employees/${id}`);

};
function getAll() {
  return http.get("https://employee-management-be-nsts.onrender.com/api/employees");
 // return http.get("http://localhost:8080/api/employees");
  
}

const create = (data) => {
   return http.post("https://employee-management-be-nsts.onrender.com/api/employees", data);
 // return http.post("http://localhost:8080/api/employees",data);
};

const update = (id,data) => {
   return http.put(`https://employee-management-be-nsts.onrender.com/api/employees/${id}`, data);
  // return http.put(`http://localhost:8080/api/employees/${id}`,data);
};

const remove = (eid) => {
  return http.delete(`https://employee-management-be-nsts.onrender.com/api/employees/${eid}`);
  // return http.delete(`http://localhost:8080/api/employees/${eid}`);
};

const EmpService = {
  get,
  getAll,
  create,
  update,
  remove,
};

export default EmpService;
