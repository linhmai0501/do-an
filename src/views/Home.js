import React, { Fragment, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Hero from "../components/Hero";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra URL hiện tại
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    if (code) {
      // Xóa tham số `code` khỏi URL
      url.searchParams.delete('code');
      const newUrl = url.pathname + url.search;

      // Thay đổi URL mà không làm mới trang
      navigate(newUrl, { replace: true });
    }
  }, [navigate]);

  return (
    <Fragment>
      <Hero />
    </Fragment>
  );
};

export default Home;
