"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";
import Papa from "papaparse";  // Thư viện dùng để parse file CSV

const ViolationsTable = () => {
  const [violations, setViolations] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost/do-an/khao_thi/')
      .then(response => {
        setViolations(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  // Export function to download violations data as CSV
  const handleExport = () => {
    const csvData = violations[0]?.map(violation => ({
      "Mã Sinh Viên": violation.student_code,
      "Họ Tên": violation.full_name,
      "Ngày Sinh": violation.dob,
      "Lớp Sinh Hoạt": violation.class_code,
      "Môn Thi": violation.exam_subject,
      "Thòi Gian Thi": violation.exam_time,
      "Phòng Thi": violation.exam_room,
      "Hình Thức Vi Phạm": violation.violate,
      "Hình Thức Xử Lý": violation.processing,
      "Cán Bộ Coi Thi 1": violation.exam_invigilator1,
      "Cán Bộ Coi Thi 2": violation.exam_invigilator2,
    }));

    const csvContent = [
      ["Mã Sinh Viên", "Họ Tên", "Ngày Sinh", "Lớp Sinh Hoạt", "Môn Thi", "Thời Gian Thi", "Phòng Thi", "Hình Thức Vi Phạm", "Hình Thức Xử Lý", "Cán Bộ Coi Thi 1", "Cán Bộ Coi Thi 2"],
      ...csvData.map(item => [item["Mã Sinh Viên"], item["Họ Tên"], item["Ngày Sinh"], item["Lớp Sinh Hoạt"], item["Môn Thi"], item["Thời Gian Thi"], item["Phòng Thi"], item["Hình Thức Vi Phạm"], item["Hình Thức Xử Lý"], item["Cán Bộ Coi Thi 1"], item["Cán Bộ Coi Thi 2"]])
    ]
      .map(row => row.join(","))
      .join("\n");

    const bom = '\uFEFF';  // Byte Order Mark
    const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "violations.csv");
    a.click();
  };

  // Handle import: Read CSV file and send to the backend
  const handleImport = (event) => {
    const file = event.target.files[0];

    // Use PapaParse to parse the CSV file
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log(results.data);
        // Send parsed data to the backend for database insertion
        axios.post('http://localhost/do-an/khao_thi/importStudents.php', results.data)
          .then(response => {
            console.log("Import successful:", response.data);
          })
          .catch(error => {
            console.error("There was an error importing the data:", error);
          });
      },
    });
  };

  return (
    <div>
      <h3 style={{textAlign : "center"}}>Danh sách sinh viên vi phạm</h3>
      <br />
      {/* Export and Import buttons */}
      <div className="mb-3">
        <Button color="primary" onClick={handleExport}>
          Export
        </Button>
        {' '}
        <input
          type="file"
          accept=".csv"
          id="import-file"
          style={{ display: 'none' }}
          onChange={handleImport}
        />
        <Button color="secondary" onClick={() => document.getElementById("import-file").click()}>
          Import
        </Button>
      </div>
      <br />

      <Table striped>
        <thead>
          <tr>
            <th>Họ Tên</th>
            <th>Mã Sinh Viên</th>
            <th>Ngày Sinh</th>
            <th>Chi Tiết Vi Phạm</th>
          </tr>
        </thead>
        <tbody>
          {violations[0]?.map((violation, index) => (
            <tr key={index}>
              <td>{violation.full_name}</td>
              <td>{violation.student_code}</td>
              <td>{violation.dob}</td>
              <td>{violation.violate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViolationsTable;
