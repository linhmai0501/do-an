import React, { Fragment, useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import Paginate from '../components/Paginate'; // Import component phân trang
import EditStudentModal from '../components/EditStudentModal'; // Import modal chỉnh sửa
import '../css/footer.css';
import '../css/listStudent.css';
import { CSVLink} from "react-csv";
import { user } from '@nextui-org/theme';
function ListStudent() {
  
  
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(5); // Số lượng sinh viên mỗi trang
  const [selectedStudent, setSelectedStudent] = useState(null); // Để giữ thông tin sinh viên được chọn để chỉnh sửa
  const [isEditModalOpen, setEditModalOpen] = useState(false); // Để kiểm soát việc mở/đóng modal
  const [currentUserRole, setCurrentUserRole] = useState(''); // Vai trò của người dùng
  const [searchTerm, setSearchTerm] = useState(''); // Thêm trạng thái cho tìm kiếm


  useEffect(() => {
    // Giả sử bạn có một hàm để lấy vai trò người dùng từ Auth0 hoặc API
    fetchCurrentUserRole().then(role => setCurrentUserRole(role));

    fetch(`http://localhost/do-an/paginate.php/?page=${currentPage}&size=${pageSize}`)
      .then(response => response.json())
      .then(data => {
        setUsers(data.items); // Thay đổi tùy thuộc vào cấu trúc phản hồi từ API
        setTotalPages(data.totalPages); // Thay đổi tùy thuộc vào cấu trúc phản hồi từ API
      })
      .catch(error => console.error('Error:', error));
  }, [currentPage, pageSize]);

  const fetchCurrentUserRole = async () => {
    // Thay thế bằng cách lấy vai trò thực tế của người dùng từ Auth0 hoặc API
    // Đây chỉ là ví dụ
    return 'Users'; // Hoặc lấy vai trò thực tế từ API
  };

  const toggleEditModal = () => {
    setEditModalOpen(!isEditModalOpen);
  };

  const handleEdit = (user) => {
    setSelectedStudent(user); // Chọn sinh viên để chỉnh sửa
    toggleEditModal(); // Mở modal
  };

  const handleSearch = (searchTerm) => {
    const url = `http://localhost/do-an/searchStudent.php?search=${encodeURIComponent(searchTerm)}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Xử lý dữ liệu sinh viên ở đây
        })
        .catch(error => console.error('Error:', error));
  };

  const handleSave = async (updatedStudent) => {
    try {
      const response = await fetch(`http://localhost/do-an/updateStudent.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudent),
      });

      const result = await response.text();
      console.log(result);

      // Cập nhật danh sách sinh viên sau khi chỉnh sửa
      setUsers(users.map(user => (user.id === updatedStudent.id ? updatedStudent : user)));
      toggleEditModal(); // Đóng modal
    } catch (error) {
      console.error('Error:', error);
    }
  };

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>

      <div className="user-table-container">
        <h2 style={{ textAlign: 'center', paddingBottom: '20px' }}>Bảng Sinh Viên Vi Phạm</h2>
      <div className="filter-bar">
        <div className="buttons">

        <div className="btn-large">
        <label htmlFor='test' className="btn btn-success">
        <i className="fa-solid fa-file-import"></i> Import
        </label>
        <input id="test" type="file" hidden/>
        </div>
        <CSVLink
         filename={"users.csv"}
         className="btn btn-primary"
         data={users}
         >
         <i className="fa-solid fa-file-arrow-down"></i> Export
         </CSVLink>

          {/* <button className="import-btn">Import Excel</button>
          <button className="export-btn" >Export Excel</button> */}
        </div>
      </div>

      <div className="search-bar ">
        <input type="text" className='w-250'  placeholder="Tìm mã sinh viên ..." />
        <input type="text" className='w-250' onChange={(e) => setSearchTerm(e.target.value)} placeholder="Tìm tên sinh viên ..." value={searchTerm} />
        <input type="date" placeholder="dd/mm/yyyy" className="date-picker w-250" />
        <input type="text" className='w-250' placeholder="Tìm theo lớp ..." />
        <button className="search-btn w-250" onClick={handleSearch} >Tìm kiếm</button>
      </div>
        <Table>
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Mã Sinh Viên</th>
              <th>Ngày Sinh</th>
              <th>Lớp Sinh Hoạt</th>
              <th>Môn Thi</th>
              <th>Suất Thi</th>
              <th>Phòng Thi</th>
              <th>Hình Thức Vi Phạm</th>
              <th>Hình Thức Xử Lý</th>
              <th>Cán Bộ Coi Thi </th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.full_name}</td>
                <td>{user.student_code}</td>
                <td>{user.dob}</td>
                <td>{user.class_code}</td>
                <td>{user.exam_subject}</td>
                <td>{user.exam_time}</td>
                <td>{user.exam_room}</td>
                <td>{user.violate}</td>
                <td>{user.processing}</td>
                <td>{user.exam_invigilator1}</td>
                <td>
                  {currentUserRole === 'Users' && (
                    <>
                      <Button color="warning" onClick={() => handleEdit(user)}>Sửa</Button>
                      <Button color="danger" onClick={() => handleDelete(user.id)} style={{ marginLeft: '10px' }}>Xóa</Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div style={{display:'flex',justifyContent:'space-around'}} >
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <EditStudentModal 
        isOpen={isEditModalOpen} 
        toggle={toggleEditModal} 
        student={selectedStudent} 
        onSave={handleSave} 
      />
    </Fragment>
  );
}

export default ListStudent;
