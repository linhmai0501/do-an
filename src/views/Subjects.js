'use client';
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import "../css/ExamSubjectsTable.css"

const ExamSubjectsTable = () => {
  const [subjects, setSubjects] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({
    subject_name: '',
    exam_time: '',
    exam_room: '',
    exam_invigilator1: '',
    exam_invigilator2: ''
  });

  const fetchSubjects = async () => {
    const response = await fetch('http://localhost/do-an/getExamSubjects.php');
    const data = await response.json();
    setSubjects(data);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubject({ ...newSubject, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gửi dữ liệu đến server để thêm môn học
    await fetch('http://localhost/do-an/khao_thi/addExamSubject.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSubject),
    });
    setNewSubject({ subject_name: '', exam_time: '', exam_room: '', exam_invigilator1: '', exam_invigilator2: '' }); // Reset form
    toggleModal(); // Đóng modal
    fetchSubjects(); // Gọi lại hàm để cập nhật danh sách môn học
  };

  const deleteExamSubject = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa môn thi này không?")) {
      try {
        const response = await fetch(`http://localhost/do-an/deleteExamSubject.php`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        const result = await response.text(); // Đọc phản hồi như văn bản
        console.log(result); // In ra phản hồi để kiểm tra

        const jsonResult = JSON.parse(result); // Chuyển đổi thành JSON

        if (jsonResult.message) {
          alert(jsonResult.message);
          fetchSubjects(); // Gọi lại hàm fetchSubjects để cập nhật danh sách môn học
        } else {
          alert("Lỗi khi xóa môn thi: " + jsonResult.error);
        }
      } catch (error) {
        alert("Lỗi: " + error.message);
      }
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Danh Sách Môn Thi</h3>
      <Button color="primary" onClick={toggleModal} style={{ marginBottom: '20px' }}>Thêm Môn Học</Button>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Môn</th>
            <th>Thời Gian</th>
            <th>Phòng Thi</th>
            <th>Cán Bộ Coi Thi 1</th>
            <th>Cán Bộ Coi Thi 2</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {subjects[0]?.map((subject) => (
            <tr key={subject.id}>
              <td>{subject.id}</td>
              <td>{subject.subject_name}</td>
              <td>{subject.exam_time}</td>
              <td>{subject.exam_room}</td>
              <td>{subject.exam_invigilator1}</td>
              <td>{subject.exam_invigilator2}</td>
              <td>
                <button type="button" className="btn btn-outline-danger" onClick={() => deleteExamSubject(subject.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalIsOpen} toggle={toggleModal}>
        <ModalHeader style={{textAlign : 'center'}} toggle={toggleModal}>Thêm Môn Học</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="subject_name">Tên Môn</Label>
              <Input
                type="text"
                name="subject_name"
                id="subject_name"
                value={newSubject.subject_name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="exam_time">Thời Gian</Label>
              <Input
                type="time"
                name="exam_time"
                id="exam_time"
                value={newSubject.exam_time}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="exam_room">Phòng Thi</Label>
              <Input
                type="text"
                name="exam_room"
                id="exam_room"
                value={newSubject.exam_room}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="exam_invigilator1">Cán Bộ Coi Thi 1</Label>
              <Input
                type="text"
                name="exam_invigilator1"
                id="exam_invigilator1"
                value={newSubject.exam_invigilator1}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="exam_invigilator2">Cán Bộ Coi Thi 2</Label>
              <Input
                type="text"
                name="exam_invigilator2"
                id="exam_invigilator2"
                value={newSubject.exam_invigilator2}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <ModalFooter>
              <Button color="primary" type="submit">Lưu</Button>{' '}
              <Button color="secondary" onClick={toggleModal}>Hủy</Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ExamSubjectsTable;
