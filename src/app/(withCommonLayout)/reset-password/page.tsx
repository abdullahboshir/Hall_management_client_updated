import { Suspense } from "react";
import ResetPasswordPage from "./ResetPasswordPage"; // adjust path if needed

const ResetPasswordWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
};

export default ResetPasswordWrapper;
