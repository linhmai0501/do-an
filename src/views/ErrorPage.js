import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {Button} from "@nextui-org/react";


const ErrorPage = () => {
    const{logout} = useAuth0();
    const handleRetry = () => {
    logout({
        returnTo: window.location.origin, // Chuyển hướng về trang gốc sau khi đăng xuất
      });
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Đăng nhập bị từ chối</h1>
      <p>Chỉ cho phép đăng nhập bằng email @vku.udn.vn.</p>
      <Button onClick={handleRetry} color='warning' radius='full'>
        Thử lại
      </Button>
    </div>
  );
};

export default ErrorPage;
