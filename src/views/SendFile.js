import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

function SendFile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setErrorMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('csv_file', selectedFile);

    try {
      const response = await fetch('http://localhost/do-an/sendfile.php', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUploadStatus('File uploaded successfully!');
      setSelectedFile(null); // Reset file selection
      setErrorMessage(''); // Clear error message
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('Error uploading file. Please try again.');
    }
  };

  return (
    <div className="upload-container" style={{ maxWidth: '600px', margin: '20px auto' }}>
      <h3 className="text-center">Upload CSV File</h3>
      {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
      {uploadStatus && <Alert color="success">{uploadStatus}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="fileUpload">Choose CSV File</Label>
          <Input
            type="file"
            id="fileUpload"
            onChange={handleFileChange}
            accept=".csv"
            required
          />
        </FormGroup>
        <Button color="primary" type="submit" block>
          Upload
        </Button>
      </Form>
    </div>
  );
}

export default SendFile;
