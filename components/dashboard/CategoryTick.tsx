import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Muting warnings
const originalWarn = console.warn;
console.warn = function (message, ...args) {
  if (typeof message === "string" && message.includes("Image with src")) {
    return;
  }
  originalWarn.apply(console, [message, ...args]);
};

export const CategoryTick = (props: any) => {
  const [size, setSize] = useState(50);

  const path = usePathname();

  const updateSize = () => {
    if (window.innerWidth >= 1500) {
      path === "/mypage/maps" ? setSize(120) : setSize(45); // xl and up
    } else if (window.innerWidth >= 1280) {
      path === "/mypage/maps" ? setSize(100) : setSize(40); // lg
    } else if (window.innerWidth >= 1024) {
      path === "/mypage/maps" ? setSize(90) : setSize(35); // lg
    } else if (window.innerWidth >= 768) {
      path === "/mypage/maps" ? setSize(75) : setSize(30); // md
    } else if (window.innerWidth >= 640) {
      path === "/mypage/maps" ? setSize(50) : setSize(18); // sm
    } else {
      path === "/mypage/maps" ? setSize(40) : setSize(12); // smaller
    }
  };

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <foreignObject
      x={props.x - size / 2}
      y={props.y}
      width={size}
      height={size}
    >
      <Image
        src={props.payload.value}
        alt={"Hero image"}
        width={size}
        height={size}
      />
    </foreignObject>
  );
};
