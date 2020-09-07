import { useRef, useEffect } from "react";

const useHasMounted = () => {
  const hasMounted = useRef(false);
  useEffect(() => {
    hasMounted.current = true;
  }, []);
  return hasMounted.current;
};

export default useHasMounted;
