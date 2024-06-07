import React, { useState, useMemo } from "react";
import "./reservationsTable.css";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import Edit from "@mui/icons-material/Edit";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import dayjs from "dayjs";

const ReservationsTable = ({ onEdit, onDelete, data }) => {
  const [filterDate, setFilterDate] = useState("");

  const clearFilters = () => {
    setGlobalFilter(""); // Reset global text filter to empty
    setFilterDate(""); // Reset date filter to empty
  };

  const filteredData = useMemo(() => {
    if (filterDate) {
      return data.filter((row) => {
        // Assuming row.datum is in the format YYYY-MM-DD and filterDate is also in YYYY-MM-DD
        return row.datum === dayjs(filterDate).format("YYYY-MM-DD");
      });
    }
    return data; // Return unfiltered data if no filter is applied
  }, [data, filterDate]);

  const columns = useMemo(
    () => [
      { Header: "Datum", accessor: "datum" },
      { Header: "Začátek", accessor: "zacatek_cas" },
      { Header: "Konec", accessor: "konec_cas" },
      { Header: "Klient", accessor: "klient_jmeno" },
      { Header: "Služba", accessor: "klient_sluzba" },
      { Header: "Přídavkové služby", accessor: "klient_sluzby_dodatecne" },
      { Header: "Telefon", accessor: "klient_telefon" },
      { Header: "Email", accessor: "klient_email" },
      { Header: "Cena", accessor: "klient_cena" },
    ],
    []
  );

  const tableInstance = useTable(
    { columns, data: filteredData },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = tableInstance;

  return (
    <div className="reservationsTable">
      <input
        type="text"
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Vyhledávat záznam"
      />

      <input
        type="date"
        value={filterDate ? filterDate : dayjs().format("YYYY-MM-DD")}
        onChange={(e) => setFilterDate(e.target.value)}
        placeholder="Filter by date"
      />

      <button onClick={clearFilters}>Odstranit filtr</button>

      {/* Button to add new reservation */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            const rowClass =
              index % 2 === 0 ? "table-row-even" : "table-row-odd";

            return (
              <tr {...row.getRowProps()} className={rowClass}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
                <td>
                  <button onClick={() => onEdit(row.original)}>
                    <Edit className="mui" />
                  </button>
                  <button
                    onClick={() => onDelete(row.original.id)}
                    className="delete"
                  >
                    <DeleteOutline className="mui" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsTable;
