import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
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

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    // Kiểm tra các trường nhập và thiết lập lỗi
    if (!formData.full_name) newErrors.full_name = 'Họ và tên là bắt buộc';
    if (!formData.student_code) newErrors.student_code = 'Mã sinh viên là bắt buộc';
    if (!formData.dob) newErrors.dob = 'Ngày sinh là bắt buộc';
    if (!formData.class_code) newErrors.class_code = 'Lớp sinh hoạt là bắt buộc';
    if (!formData.exam_subject) newErrors.exam_subject = 'Môn thi là bắt buộc';
    if (!formData.exam_time) newErrors.exam_time = 'Suất thi là bắt buộc';
    if (!formData.exam_room) newErrors.exam_room = 'Phòng thi là bắt buộc';
    if (!formData.violate) newErrors.violate = 'Hình thức vi phạm là bắt buộc';
    if (!formData.processing) newErrors.processing = 'Hình thức xử lý là bắt buộc';
    if (!formData.exam_invigilator1) newErrors.exam_invigilator1 = 'Cán bộ coi thi 1 là bắt buộc';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));

    // Xóa lỗi khi người dùng bắt đầu nhập
    if (value) {
      setErrors(prevErrors => ({ ...prevErrors, [id]: '' }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return; // Ngăn không cho gửi nếu có lỗi

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

      setErrors({}); // Xóa lỗi khi gửi thành công
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="main">
      <h2>Thêm sinh viên vi phạm</h2>
      <form className="container-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="full_name">Họ và tên</label>
          <input
            type="text"
            id="full_name"
            className={`form-control ${errors.full_name ? 'is-invalid' : formData.full_name ? 'is-valid' : ''}`}
            placeholder="Nhập họ và tên"
            value={formData.full_name}
            onChange={handleChange}
          />
          {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
          {formData.full_name && !errors.full_name && <div className="valid-feedback">LookGood</div>}
        </div>
        <div className="form-group">
          <label htmlFor="student_code">Mã Sinh Viên</label>
          <input
            type="text"
            id="student_code"
            className={`form-control ${errors.student_code ? 'is-invalid' : formData.student_code ? 'is-valid' : ''}`}
            placeholder="Nhập mã sinh viên"
            value={formData.student_code}
            onChange={handleChange}
          />
          {errors.student_code && <div className="invalid-feedback">{errors.student_code}</div>}
          {formData.student_code && !errors.student_code && <div className="valid-feedback">LookGood</div>}
        </div>
        <div className="form-group">
          <label htmlFor="dob">Ngày sinh</label>
          <input
            type="date"
            id="dob"
            className={`form-control ${errors.dob ? 'is-invalid' : formData.dob ? 'is-valid' : ''}`}
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
          {formData.dob && !errors.dob && <div className="valid-feedback">LookGood</div>}
        </div>
        <div className="form-group">
          <label htmlFor="class_code">Lớp sinh hoạt</label>
          <input
            type="text"
            id="class_code"
            className={`form-control ${errors.class_code ? 'is-invalid' : formData.class_code ? 'is-valid' : ''}`}
            placeholder="Nhập lớp sinh hoạt"
            value={formData.class_code}
            onChange={handleChange}
          />
          {errors.class_code && <div className="invalid-feedback">{errors.class_code}</div>}
          {formData.class_code && !errors.class_code && <div className="valid-feedback">LookGood</div>}
        </div>
        <div className="form-group">
          <label htmlFor="exam_subject">Môn thi</label>
          <input
            type="text"
            id="exam_subject"
            className={`form-control ${errors.exam_subject ? 'is-invalid' : formData.exam_subject ? 'is-valid' : ''}`}
            placeholder="Nhập tên môn thi"
            value={formData.exam_subject}
            onChange={handleChange}
          />
          {errors.exam_subject && <div className="invalid-feedback">{errors.exam_subject}</div>}
          {formData.exam_subject && !errors.exam_subject && <div className="valid-feedback">LookGood</div>}
        </div>
        <div className="form-group">
          <label htmlFor="exam_time">Suất thi</label>
          <input
            type="time"
            id="exam_time"
            className={`form-control ${errors.exam_time ? 'is-invalid' : formData.exam_time ? 'is-valid' : ''}`}
            value={formData.exam_time}
            placeholder="08h00"
            onChange={handleChange}
          />
          {errors.exam_time && <div className="invalid-feedback">{errors.exam_time}</div>}
          {formData.exam_time && !errors.exam_time && <div className="valid-feedback">LookGood</div>}
        </div>
        <div className="form-group">
          <label htmlFor="exam_room">Phòng thi</label>
          <input
            type="text"
            id="exam_room"
            className={`form-control ${errors.exam_room ? 'is-invalid' : formData.exam_room ? 'is-valid' : ''}`}
            value={formData.exam_room}
            placeholder="K.B203"
            onChange={handleChange}
          />
          {errors.exam_room && <div className="invalid-feedback">{errors.exam_room}</div>}
          {formData.exam_room && !errors.exam_room && <div className="valid-feedback">LookGood</div>}
        </div>
        <div className="form-group">
          <label htmlFor="violate">Hình thức vi phạm</label>
          <input
            type="text"
            id="violate"
            className={`form-control ${errors.violate ? 'is-invalid' : formData.violate ? 'is-valid' : ''}`}
            value={formData.violate}
            placeholder="Chép tài liệu"
            onChange={handleChange}
          />
          {errors.violate && <div className="invalid-feedback">{errors.violate}</div>}
          {formData.violate && !errors.violate && <div className="valid-feedback">LookGood</div>}
        </div>
        <div className="form-group">
          <label htmlFor="processing">Hình thức xử lý</label>
          <select
            id="processing"
            className={`form-control ${errors.processing ? 'is-invalid' : formData.processing ? 'is-valid' : ''}`}
            value={formData.processing}
            onChange={handleChange}
          >
            <option value="">Chọn hình thức xử lý</option>
            <option value="Suspension">Đình chỉ thi</option>
            <option value="Warning">Cảnh cáo</option>
            <option value="Reprimand">Khiển trách</option>
          </select>
          {errors.processing && <div className="invalid-feedback">{errors.processing}</div>}
          {formData.processing && !errors.processing && <div className="valid-feedback">LookGood</div>}
        </div>
        <div className="form-group">
          <label htmlFor="exam_invigilator1">Cán bộ coi thi 1</label>
          <input
            type="text"
            id="exam_invigilator1"
            className={`form-control ${errors.exam_invigilator1 ? 'is-invalid' : formData.exam_invigilator1 ? 'is-valid' : ''}`}
            value={formData.exam_invigilator1}
            onChange={handleChange}
          />
          {errors.exam_invigilator1 && <div className="invalid-feedback">{errors.exam_invigilator1}</div>}
          {formData.exam_invigilator1 && !errors.exam_invigilator1 && <div className="valid-feedback">LookGood</div>}
        </div>
        {/* <div className="form-group">
          <label htmlFor="exam_invigilator2">Cán bộ coi thi 2</label>
          <input
            type="text"
            id="exam_invigilator2"
            className={`form-control ${errors.exam_invigilator2 ? 'is-invalid' : formData.exam_invigilator2 ? 'is-valid' : ''}`}
            value={formData.exam_invigilator2}
            onChange={handleChange}
          />
          {errors.exam_invigilator2 && <div className="invalid-feedback">{errors.exam_invigilator2}</div>}
          {formData.exam_invigilator2 && !errors.exam_invigilator2 && <div className="valid-feedback">LookGood</div>}
        </div> */}
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Lưu</button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
