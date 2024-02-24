import React, { useState, useEffect } from "react";
import OrdService from "../services/OrdService";

const Ord = props => {
  const initialOrdState = {
    ord_id: null,
    ord_total: "",
    cust_name: "",
    cust_email:"",
    currency:"",
    created: ""
  };
  const [currentOrd, setCurrentOrd] = useState(initialOrdState);
  const [message, setMessage] = useState("");
  const [shipmentStatus,setShipmentStatus] = useState("")

  const getOrd = id => {
    OrdService.get(id)
      .then(response => {
        setCurrentOrd(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getOrd(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    // console.log("Value:",value);
    // setCurrentOrd({ ...currentOrd, [name]: value });
    setShipmentStatus(value);

  };

 

  const updateOrd = () => {
    const data = { 
      "order_id": currentOrd.Id,
      "shipment_status": shipmentStatus
    } 
    OrdService.update(data)
      .then(response => {
        console.log(response.data);
        setMessage("The information was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentOrd ? (
        <div className="edit-form">
          <h4>Update</h4>
          <form>
          
            <div className="form-group">
              <label htmlFor="shipping_status">Shipping Status</label>
              <input
                type="text"
                className="form-control"
                id="shipping_status"
                name="shipping_status"
                value={currentOrd.shipping_status}
                onChange={handleInputChange}
              />
            </div>

          </form>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateOrd}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Ord...</p>
        </div>
      )}
    </div>
  );
};

export default Ord;
