import React, { Fragment, useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Paginate from '../components/Paginate'; // Import component phân trang
import '../css/footer.css';
import '../css/listStudent.css';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse'; // Import papaparse
import initFontAwesome from '../utils/initFontAwesome';

initFontAwesome();

function ListStudent() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(5); // Số lượng sinh viên mỗi trang
  const [currentUserRole, setCurrentUserRole] = useState(''); // Vai trò của người dùng
  const [searchNameTerm, setSearchNameTerm] = useState(''); // Trạng thái cho tìm kiếm tên sinh viên
  const [searchCodeTerm, setSearchCodeTerm] = useState(''); // Trạng thái cho tìm kiếm mã sinh viên
  const [noResults, setNoResults] = useState(false); // Trạng thái cho không có kết quả
  const [csvData, setCsvData] = useState([]); // Dữ liệu CSV

  useEffect(() => {
    fetchCurrentUserRole().then(role => setCurrentUserRole(role));
    const fetchData = async () => {
      try {
        let url = `http://localhost/do-an/searchStudent.php/?page=${currentPage}&size=${pageSize}`;
        if (searchNameTerm || searchCodeTerm) {
          url = `http://localhost/do-an/searchStudent.php/?page=${currentPage}&size=${pageSize}&search=${searchNameTerm || searchCodeTerm}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if ((searchNameTerm || searchCodeTerm) && data.students.length === 0) {
          setNoResults(true);
          setUsers([]);
          setTotalPages(1);
        } else {
          setNoResults(false);
          setUsers(data.students);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [currentPage, searchNameTerm, searchCodeTerm, pageSize]);

  const fetchCurrentUserRole = async () => {
    // Thay thế bằng cách lấy vai trò thực tế của người dùng từ Auth0 hoặc API
    return 'Users'; // Hoặc lấy vai trò thực tế từ API
  };

  const fetchCsvData = async () => {
    try {
      const response = await fetch(`http://localhost/do-an/exportAllStudents.php`);
      const csvText = await response.text(); // Nhận dữ liệu dưới dạng văn bản

      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          setCsvData(results.data); // Kết quả phân tích cú pháp sẽ là một mảng các đối tượng
        }
      });
    } catch (error) {
      console.error('Error fetching CSV data:', error);
    }
  };

  useEffect(() => {
    fetchCsvData();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Bạn có chắc muốn xóa sinh viên này?")) {
      try {
        const response = await fetch(`http://localhost/do-an/deleteStudent.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: userId }),
        });

        const result = await response.text();
        console.log(result);

        // Sau khi xóa, tải lại danh sách sinh viên
        const updatedUsers = users.filter(user => user.id !== userId);

        // Nếu số lượng sinh viên trên trang hiện tại ít hơn pageSize, lấy thêm sinh viên từ trang tiếp theo
        if (updatedUsers.length < pageSize && currentPage < totalPages) {
          fetch(`http://localhost/do-an/paginate.php/?page=${currentPage + 1}&size=1`)
            .then(response => response.json())
            .then(data => {
              setUsers([...updatedUsers, ...data.items]);
            });
        } else {
          setUsers(updatedUsers);
        }

        // Nếu trang hiện tại không còn sinh viên nào sau khi xóa, chuyển về trang trước đó
        if (updatedUsers.length === 0 && currentPage > 1) {
          setCurrentPage(prevPage => prevPage - 1);
        }

      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleSearch = async () => {
    try {
      setCurrentPage(1); // Reset trang về 1 khi tìm kiếm mới
      const response = await fetch(`http://localhost/do-an/searchStudent.php?page=${currentPage}&size=${pageSize}&search=${searchNameTerm || searchCodeTerm}`);
      const data = await response.json();

      if (data.students.length === 0) {
        setNoResults(true);
        setUsers([]); // Xóa danh sách sinh viên nếu không có kết quả
      } else {
        setNoResults(false);
        setUsers(data.students);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const navigate = useNavigate();

  const displayInfo = (studentId) => {
    navigate(`/student-info/${studentId}`);
  };
  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>
      <div className="user-table-container">
        <h2 style={{ textAlign: 'center', paddingBottom: '20px' }}>Bảng Sinh Viên Vi Phạm</h2>
        <div className="filter-bar">
          <div className="buttons">
            <CSVLink
              filename={"students.csv"}
              className="btn btn-primary"
              data={csvData}
              headers={[
                { label: "Họ tên", key: "full_name" },
                { label: "Mã Sinh Viên", key: "student_code" },
                { label: "Ngày Sinh", key: "dob" },
                { label: "Lớp Sinh Hoạt", key: "class_code" },
                { label: "Môn Thi", key: "exam_subject" },
                { label: "Suất Thi", key: "exam_time" },
                { label: "Phòng Thi", key: "exam_room" },
                { label: "Hình Thức Vi Phạm", key: "violate" },
                { label: "Hình Thức Xử Lý", key: "processing" },
                { label: "Cán Bộ Coi Thi", key: "exam_invigilator1" }
              ]}
            >
              <i className="fa-solid fa-file-arrow-down"></i> Export
            </CSVLink>
          </div>
        </div>

        <div className="search-bar">
          <input type="text" className="w-250" placeholder="Tìm mã sinh viên ..." onChange={(e) => setSearchCodeTerm(e.target.value)} value={searchCodeTerm} />
          <input type="text" className="w-250" placeholder="Tìm tên sinh viên ..." onChange={(e) => setSearchNameTerm(e.target.value)} value={searchNameTerm} />
          <input type="date" placeholder="dd/mm/yyyy" className="date-picker w-250" />
          <input type="text" className="w-250" placeholder="Tìm theo lớp ..." />
          <button className="search-btn w-250" onClick={handleSearch}>Tìm kiếm</button>
        </div>

        {noResults ? (
          <p style={{ textAlign: 'center', color: 'red' }}>Không tìm thấy sinh viên</p>
        ) : (
          <>
            <Table>
              <thead style={{ textAlign: 'center' }}>
                <tr>
                  <th>Họ tên</th>
                  <th>Mã Sinh Viên</th>
                  <th style={{ display: 'none' }}>Ngày Sinh</th>
                  <th>Lớp Sinh Hoạt</th>
                  <th>Môn Thi</th>
                  <th>Suất Thi</th>
                  <th>Phòng Thi</th>
                  <th>Hình Thức Vi Phạm</th>
                  <th style={{ display: 'none' }}>Hình Thức Xử Lý</th>
                  <th>Cán Bộ Coi Thi </th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: 'center' }}>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.full_name}</td>
                    <td>{user.student_code}</td>
                    <td style={{ display: 'none' }}>{user.dob}</td>
                    <td>{user.class_code}</td>
                    <td>{user.exam_subject}</td>
                    <td>{user.exam_time}</td>
                    <td>{user.exam_room}</td>
                    <td>{user.violate}</td>
                    <td style={{ display: 'none' }}>{user.processing}</td>
                    <td>{user.exam_invigilator1}</td>
                    <td>
                      {currentUserRole === 'Users' && (
                        <>
                          <Button color="danger" onClick={() => handleDelete(user.id)} style={{ marginLeft: '10px' }}>Xóa</Button>
                          <Button color="info" onClick={() => displayInfo(user.id)} style={{ marginLeft: '10px' }}><i class="fa fa-info" aria-hidden="true"></i></Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Paginate
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
}

export default ListStudent;
