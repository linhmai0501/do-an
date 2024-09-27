import React, { useEffect, useState } from 'react';
import "../css/GetFile.css"; // Import file CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faDownload, faSearch } from '@fortawesome/free-solid-svg-icons';

function ListFiles() {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage] = useState(5); // Số file hiển thị mỗi trang

  const fetchFiles = async () => {
    try {
      const response = await fetch('http://localhost/do-an/khao_thi/getfile.php'); // Đảm bảo đường dẫn đúng
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const filteredFiles = files.filter(file =>
    file.file_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="app-container">
      <h2 className="title">Danh sách các file CSV đã nhận</h2>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Tìm kiếm file..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      
      <ul className="file-list">
        {currentFiles.length > 0 ? currentFiles.map((file) => (
          <li key={file.id} className="file-item">
            <FontAwesomeIcon icon={faFileAlt} className="file-icon" />
            <span className="file-name">{file.file_name}</span>
            <span className="file-date">{new Date(file.uploaded_at).toLocaleString()}</span>
            <a className="download-btn" href={`http://localhost/uploads/${file.file_name}`} download={file.file_name}>
              <FontAwesomeIcon icon={faDownload} className="download-icon" />
              Download
            </a>
          </li>
        )) : (
          <li className="file-item">Không tìm thấy file phù hợp</li>
        )}
      </ul>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredFiles.length / filesPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`pagination-button ${index + 1 === currentPage ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ListFiles;
