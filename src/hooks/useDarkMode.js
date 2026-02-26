import { useCallback, useEffect, useState } from "react";

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark")) || false,
  );
  const changeMode = useCallback(() => {
    setIsDark((prev) => {
      const changedValue = !prev;
      localStorage.setItem("isDark", changedValue);
      return changedValue;
    });
  }, []);

  useEffect(() => {
    if (isDark) return document.body.classList.add("dark");
    document.body.classList.remove("dark");
  }, [isDark]);

  return { isDark, changeMode, setIsDark };
};

export default useDarkMode;
