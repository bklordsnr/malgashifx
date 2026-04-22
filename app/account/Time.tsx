import { useEffect, useState } from "react";

const Time = () => {
  let time = new Date().toLocaleTimeString();
  const [CurrentTime, setCurrentTime] = useState(time);

  useEffect(() => {
    const updatedTime = () => {
      let time = new Date().toLocaleTimeString();
      setCurrentTime(time);
    };

    setInterval(updatedTime, 1000);
  }, []);

  return <div className="text-center text-sm text-[#FF4949] bg-secondary rounded-[15px] px-1 py-[5px]" suppressHydrationWarning>{CurrentTime}</div>;
};

export default Time;
