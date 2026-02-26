import { Suspense } from "react";
import Loading from "./loading/Loading";
/**
 * @param {React.HtmlHTMLAttributes<HTMLDivElement></HTMLDivElement>} props
 */
const PageFallback = ({ children, ...props }) => {
  return (
    <Suspense
      fallback={
        <div {...props}>
          <Loading />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default PageFallback;
