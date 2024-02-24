import React, { useState, useEffect, useMemo, useRef } from "react";
import OrdService from "../services/OrdService";
import { useTable } from "react-table";

const OrdList = (props) => {
  const [ords, setOrds] = useState([]);
  const ordRef = useRef();

  ordRef.current = ords;

  useEffect(() => {
    retrieveOrds();
  }, []);

  const retrieveOrds = () => {
    OrdService.getAll()
      .then((response) => {
        console.log("API response: ", JSON.stringify(response));
        setOrds(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  const openOrd = (rowIndex) => {
    const id = ordRef.current[rowIndex].Id;
    console.log("id is : ", id);
    props.history.push("/ord/" + id);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "OrderNumber",
      },
      {
        Header: "Order Total",
        accessor: "OrderTotal",
      },
      {
        Header: "Customer Name",
        accessor: "CustomerFirstName",
      },
      {
        Header: "Customer Email",
        accessor: "CustomerEmail",
      },
      {
        Header: "Currency Used",
        accessor: "Currency",
      },
      {
        Header: "Order Date",
        accessor: "CreatedAt",
      },
      {
        Header: "Update Shipment Status",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openOrd(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
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
    data: ords,
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

export default OrdList;
