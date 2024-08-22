import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Form, Input, Typography, Button, Row, Col, message } from 'antd';
import { PrinterOutlined, CheckOutlined, ArrowLeftOutlined } from '@ant-design/icons'; // Import icon ArrowLeft
import '../index.css';

const { Title } = Typography;

function StudentInfo() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost/do-an/getStudentDetails.php?id=${id}`);
        const data = await response.json();
        setStudent(data);
        form.setFieldsValue(data); // Set initial values in the form
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudent();
  }, [id, form]);

  const handlePrint = () => {
    window.print();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedData = form.getFieldsValue();
      const response = await fetch(`http://localhost/do-an/updateStudentDetails.php?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json();
      if (result.success) {
        message.success('Student information updated successfully!');
        setStudent(updatedData);
        setIsEditing(false);
      } else {
        message.error('Failed to update student information.');
      }
    } catch (error) {
      console.error('Error updating student details:', error);
      message.error('Error updating student information.');
    }
  };

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Button 
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)} // Quay lại trang trước đó
          style={{ marginRight: '20px' }}
        >
          Quay lại
        </Button>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Title level={3} style={{ margin: 0 }}>Thông Tin Sinh Viên</Title>
        </div>
      </div>
      
      <Form
        layout="vertical"
        className="printableArea"
        form={form}
        initialValues={student}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Name" name="full_name">
              <Input disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Student Code" name="student_code">
              <Input disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Date of Birth" name="dob">
              <Input type='date' disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Class Code" name="class_code">
              <Input disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Exam Subject" name="exam_subject">
              <Input disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Exam Time" name="exam_time">
              <Input type='time' disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Exam Room" name="exam_room">
              <Input disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Violate" name="violate">
              <Input disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Processing" name="processing">
              <Input disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Exam Invigilator" name="exam_invigilator1">
              <Input disabled={!isEditing} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              type="primary" 
              icon={<PrinterOutlined />} 
              onClick={handlePrint}
              style={{ width: '48%' }}
            >
              Print
            </Button>
            {!isEditing ? (
              <Button 
                type="primary" danger
                icon={<CheckOutlined />} 
                onClick={handleEdit}
                style={{ width: '48%' }}
              >
                Edit
              </Button>
            ) : (
              <Button 
                type="primary" 
                icon={<CheckOutlined />} 
                onClick={handleSave}
                style={{ width: '48%' }}
              >
                Save
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default StudentInfo;
