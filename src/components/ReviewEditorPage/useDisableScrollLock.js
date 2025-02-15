import { useEffect } from "react";

function useDisableScrollLock() {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalMarginRight = document.body.style.marginRight;

    document.body.style.overflow = "auto"; // Prevents scroll locking
    document.body.style.marginRight = "0px"; // Prevents content shifting

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.marginRight = originalMarginRight;
    };
  }, []);
}

export default useDisableScrollLock;
