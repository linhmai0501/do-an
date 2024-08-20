import React, { useState } from "react";
import "../css/addStudent.css";

const AddStudent = () => {
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
    // exam_invigilator2: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost/do-an/addStudent.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.text();
      console.log(result);

      setFormData({
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
        // exam_invigilator2: ''
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="main">
      <h2>Thêm sinh viên vi phạm</h2>
      <form className="container-form" onSubmit={handleSubmit}>
        <div className="form-group-1">
          <div className="form-group">
            <label htmlFor="full_name">Họ và tên</label>
            <input type="text" id="full_name" placeholder="Nhập họ và tên" value={formData.full_name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="student_code">Mã Sinh Viên</label>
            <input type="text" id="student_code" placeholder="Nhập mã sinh viên" value={formData.student_code} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Ngày sinh</label>
            <input type="date" id="dob" placeholder="dd/mm/yyyy" value={formData.dob} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="class_code">Lớp sinh hoạt</label>
            <input type="text" id="class_code" placeholder="Nhập lớp sinh hoạt" value={formData.class_code} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="exam_subject">Môn thi</label>
            <input type="text" id="exam_subject" placeholder="Nhập tên môn thi" value={formData.exam_subject} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="exam_time">Suất thi</label>
            <input type="text" id="exam_time" value={formData.exam_time} placeholder="08h00" onChange={handleChange}/>
          </div>
        </div>
        <div className="form-group-2">
          <div className="form-group">
            <label htmlFor="exam_room">Phòng thi</label>
            <input type="text" id="exam_room" value={formData.exam_room} placeholder="K.B203" onChange={handleChange}  />
          </div>
          <div className="form-group">
            <label htmlFor="violate">Hình thức vi phạm</label>
            <input type="text" id="violate" value={formData.violate} placeholder="Chép tài liệu" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="processing">Hình thức xử lý</label>
            <select id="processing" value={formData.processing} onChange={handleChange}>
              <option value="Suspension">Đình chỉ thi</option>
              <option value="Warning">Cảnh cáo</option>
              <option value="Reprimand">Khiển trách</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exam_invigilator1">Cán bộ coi thi 1</label>
            <input type="text" id="exam_invigilator1" value={formData.exam_invigilator1} onChange={handleChange} />
          </div>
          {/* <div className="form-group">
            <label htmlFor="exam_invigilator2">Cán bộ coi thi 2</label>
            <input type="text" id="exam_invigilator2" value={formData.exam_invigilator2} onChange={handleChange} />
          </div> */}
        </div>
        <button type="submit" className="btn-save">Lưu</button>
      </form>
    </div>
  );
};

export default AddStudent;
