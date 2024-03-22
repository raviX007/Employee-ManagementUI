import React, { useState, useEffect, useMemo, useRef } from "react";
import EmpService from "../services/EmpService";
import { useTable } from "react-table";

const EmpList = (props) => {
  const [emps, setEmps] = useState([]);
  const empRef = useRef();

  empRef.current = emps;

  useEffect(() => {
    retrieveEmps();
  }, []);

  const retrieveEmps = () => {
    EmpService.getAll()
      .then((response) => {
        console.log("API response: ", JSON.stringify(response));
        const sortedEmps = response.data.sort((a, b) => a.emp_id - b.emp_id);
        setEmps(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  const openEmp = (rowIndex) => {
    const id = empRef.current[rowIndex].Id;
    console.log("id is : ", id);
    props.history.push("/emp/" + id);
  };
  const deleteEmp = (rowIndex) => {
    const id = empRef.current[rowIndex].emp_id;

    EmpService.remove(id)
      .then((response) => {
        props.history.push("/emp");

        let newEmp = [...empRef.current];
        newEmp.splice(rowIndex, 1);

        setEmps(newEmp);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Employee ID",
        accessor: "emp_id",
      },
      {
        Header: "Employee Name",
        accessor: "emp_name",
      },
      {
        Header: "Department Name",
        accessor: "dept_name",
      },
      {
        Header: "Department Id",
        accessor: "dept_id",
      },
      {
        Header: "Employee Contact",
        accessor: "emp_phn",
      },
      
      {
        Header: "Update Employee Information",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openEmp(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteEmp(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: emps,
  });

  return (
    <div className="list row">
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpList;
