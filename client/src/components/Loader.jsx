import { Suspense } from "react";

const Loader = ({ children }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default Loader;
