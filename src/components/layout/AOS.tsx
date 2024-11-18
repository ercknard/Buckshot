"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AOScall = () => {
  useEffect(() => {
    AOS.init({
      disable: function () {
        const maxWidth = 768;
        return window.innerWidth < maxWidth;
      },
      offset: 50,
    });
  }, []);

  return <></>;
};

export default AOScall;
