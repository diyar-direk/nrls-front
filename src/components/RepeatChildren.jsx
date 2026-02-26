import { Fragment } from "react";

/**
 * @typedef {Object} RepeatChildrenProps
 * @property {React.ReactNode} children
 * @property {number} [count=1]
 * @param {RepeatChildrenProps} props
 * @returns {JSX.Element[]}
 */
const RepeatChildren = ({ children, count = 1 }) => {
  return Array.from({ length: count }).map((_, index) => (
    <Fragment key={index}>{children}</Fragment>
  ));
};

export default RepeatChildren;
