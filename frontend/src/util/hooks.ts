import { useEffect, useState, useRef } from "react";
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

export const useFormikAutoSave = (
  formik: FormikValues,
  debounceTime: number = 1500
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
