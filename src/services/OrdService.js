import http from "../http-common";
const get= (id) =>{
  //return http.get(`http://127.0.0.1:5000/employee/${id}`);
  // return http.get(`http://localhost:8080/api/employees/${id}`);
  return http.get(`http://localhost:8080/orders/${id}`);

};
function getAll() {
  // return http.get("http://127.0.0.1:5000/employee");
  // return http.get("http://localhost:8080/api/employees");
  return http.get("http://localhost:8080/orders/");
}

// const create = (data) => {
//   //return http.post("http://127.0.0.1:5000/employee", data);
//   return http.post("http://localhost:8080/api/employees", data);
// };

const update = (data) => {
  //return http.put(`http://127.0.0.1:5000/employee/${id}`, data);
  console.log("data is : ", data)
  return http.put(`http://localhost:8080/orders/`, data);
};

// const remove = (eid) => {
//   //return http.delete(`http://127.0.0.1:5000/employee/${eid}`);
//   return http.delete(`http://localhost:8080/api/employees/${eid}`);
// };



const OrdService = {
  get,
  getAll,
  //create,
  update,
  //remove,
};

export default OrdService;
