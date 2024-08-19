import React, { Fragment,useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Hero from "../components/Hero";

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    // Kiểm tra URL hiện tại
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    if (code) {
      // Xóa tham số `code` khỏi URL
      url.searchParams.delete('code');
      history.replace(url.pathname + url.search);
    }
  }, [history]);

  return(
    <Fragment>
    <Hero />
  </Fragment>
  )
} ;

export default Home;
