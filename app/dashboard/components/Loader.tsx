import Lottie from "lottie-react";
import loaderAnimation from "../../Loader.json";

export const LoaderMain = () => (
  <div className="flex items-center justify-center h-screen">
    <Lottie animationData={loaderAnimation} loop={true} className="w-36 h-36" />
  </div>
);

export const Loader = () => {
  return (
    <div className="flex items-center justify-center gap-1 py-3">
      <Lottie
        animationData={loaderAnimation}
        loop={true}
        className="w-24 h-24 "
      />
    </div>
  );
};
