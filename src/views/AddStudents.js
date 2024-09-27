'use client';
import { Badge, Button, Card, CardBody, CardTitle, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { useState, useEffect } from "react";
import "../css/AddStudents.css";

const AddViolation = () => {

  const [studentCode, setStudentCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [classCode, setClassCode] = useState('');
  const [examSubject, setExamSubject] = useState('');
  const [examTime, setExamTime] = useState('');
  const [examRoom, setExamRoom] = useState('');
  const [violate, setViolate] = useState('');
  const [processing, setProcessing] = useState('');
  const [examSubjects, setExamSubjects] = useState([]); // State to store exam subjects

  useEffect(() => {
    // Function to fetch exam subjects from server
    const fetchExamSubjects = async () => {
      try {
        const response = await fetch('http://localhost/do-an/getExamSubjects.php');
        const data = await response.json();
        setExamSubjects(data);
      } catch (error) {
        console.error("Error fetching exam subjects:", error);
      }
    };

    fetchExamSubjects();
  }, []);

  const handleExamSubjectChange = (e) => {
    const selectedSubjectId = e.target.value;
    setExamSubject(selectedSubjectId);

    // Find the selected exam subject from the list
    const selectedSubject = examSubjects[0]?.find(subject => subject.id === selectedSubjectId);
    
    if (selectedSubject) {
      setExamRoom(selectedSubject.exam_room); // Update exam room
      setExamTime(selectedSubject.exam_time); // Update exam time
    } else {
      setExamRoom(''); // Reset if not found
      setExamTime('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newViolation = {
      student_code: studentCode,
      full_name: fullName,
      dob: dob,
      class_code: classCode,
      exam_subject: examSubject,
      exam_time: examTime,
      exam_room: examRoom,
      violate: violate,
      processing: processing,
    };

    try {
      const response = await fetch('http://localhost/do-an/khao_thi/importStudents.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newViolation),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Added successfully:", data);
        // Reset the form after successful submission
        setStudentCode('');
        setFullName('');
        setDob('');
        setClassCode('');
        setExamSubject('');
        setExamTime('');
        setExamRoom('');
        setViolate('');
        setProcessing('');
      } else {
        throw new Error('Failed to add student');
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div style={{display : ""}}>
      <Row>
        <Col xs="12" >
          <Card>
            <CardTitle tag="h3" className="border-bottom p-3 mb-0" style={{ textAlign: "center" }}>
              Thêm Sinh Viên Vi Phạm
            </CardTitle>
            <CardBody className="">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label for="studentCode">Mã Sinh Viên</Label>
                      <Input type="text" id="studentCode" value={studentCode} onChange={(e) => setStudentCode(e.target.value)} required />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label for="fullName">Họ Tên</Label>
                      <Input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label for="dob">Ngày Sinh</Label>
                      <Input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label for="classCode">Lớp Sinh Hoạt</Label>
                      <Input type="text" id="classCode" value={classCode} onChange={(e) => setClassCode(e.target.value)} required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label for="examSubject">Môn Thi</Label>
                      <Input type="select" id="examSubject" value={examSubject} onChange={handleExamSubjectChange} required className="input-select" >
                        <option value="">Chọn Môn Thi</option>
                        {examSubjects[0]?.map((subject) => (
                          <option key={subject.id} value={subject.id}>
                            {subject.subject_name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label for="examTime">Thời Gian Thi</Label>
                      <Input type="text" id="examTime" value={examTime} onChange={(e) => setExamTime(e.target.value)} required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label for="examRoom">Phòng Thi</Label>
                      <Input type="text" id="examRoom" value={examRoom} onChange={(e) => setExamRoom(e.target.value)} required />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label for="violate">Hình Thức Vi Phạm</Label>
                      <Input type="text" id="violate" value={violate} onChange={(e) => setViolate(e.target.value)} required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label for="processing">Hình Thức Xử Lý</Label>
                      <Input type="text" id="processing" value={processing} onChange={(e) => setProcessing(e.target.value)} required />
                    </FormGroup>
                  </Col>
                </Row>
                <Button color="primary" type="submit">Thêm Sinh Viên</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddViolation;
