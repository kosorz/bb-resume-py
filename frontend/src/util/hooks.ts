import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { FormikValues } from "formik";

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useIsMount = () => {
  const isMountRef = useRef(true);

  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

export const useWindowHeight = () => {
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return height;
};

export const useFormikAutoSave = (
  formik: FormikValues,
  debounceTime: number = 1000
) => {
  const debouncedValues = useDebounce(formik.values, debounceTime);
  const isMount = useIsMount();

  useEffect(() => {
    if (!isMount) {
      formik.submitForm();
    }

    // eslint-disable-next-line
  }, [debouncedValues]);
};
