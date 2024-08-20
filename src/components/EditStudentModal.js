import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

function EditStudentModal({ isOpen, toggle, student, onSave }) {
  const [formData, setFormData] = useState({
    full_name: '',
    student_code: '',
    dob: '',
    class_code: '',
    exam_subject: '',
    exam_time: '',
    exam_room: '',
    violate: '',
    processing: '',
    exam_invigilator1: '',
    // exam_invigilator2: '',
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Chỉnh sửa sinh viên</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="full_name">Họ tên</Label>
            <Input
              type="text"
              name="full_name"
              id="full_name"
              value={formData.full_name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="student_code">Mã Sinh Viên</Label>
            <Input
              type="text"
              name="student_code"
              id="student_code"
              value={formData.student_code}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="dob">Ngày Sinh</Label>
            <Input
              type="date"
              name="dob"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="class_code">Lớp Sinh Hoạt</Label>
            <Input
              type="text"
              name="class_code"
              id="class_code"
              value={formData.class_code}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exam_subject">Môn Thi</Label>
            <Input
              type="text"
              name="exam_subject"
              id="exam_subject"
              value={formData.exam_subject}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exam_time">Thời Gian Thi</Label>
            <Input
              type="time"
              name="exam_time"
              id="exam_time"
              value={formData.exam_time}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exam_room">Phòng Thi</Label>
            <Input
              type="text"
              name="exam_room"
              id="exam_room"
              value={formData.exam_room}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="violate">Hình Thức Vi Phạm</Label>
            <Input
              type="text"
              name="violate"
              id="violate"
              value={formData.violate}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="processing">Hình Thức Xử Lý</Label>
            <Input
              type="text"
              name="processing"
              id="processing"
              value={formData.processing}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exam_invigilator1">Cán Bộ Coi Thi</Label>
            <Input
              type="text"
              name="exam_invigilator1"
              id="exam_invigilator1"
              value={formData.exam_invigilator1}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>Lưu</Button>{' '}
        <Button color="secondary" onClick={toggle}>Hủy</Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditStudentModal;
