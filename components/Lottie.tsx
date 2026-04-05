"use client";

import Lottie from "lottie-react";

const LottieForm = ({ data }: { data: any }) => {
  return (
    <>
      <Lottie animationData={data} />
    </>
  );
};

export default LottieForm;
