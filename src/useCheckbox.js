import React, { useEffect } from 'react';

import { getHelperText, useIsMount } from './FieldUtils';

export default function useCheckbox () {
  const {
    form, fieldKeyPath, validation,
    validateOnChange = true
  } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);
  const value = form.getFieldValue(fieldKeyPath, false);
  
  const isMount = useIsMount();
  useEffect(() => {
    if (validateOnChange && !isMount) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator && validator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (event) => {
    const value = event.target.checked;
    form.setFieldValue(fieldKeyPath, value);
  };

  return {
    fieldMetaData,
    value,
    handleChange,
    onRef: (ref) => {
      form.registerField(fieldKeyPath, {
        validation: validation
      });
      formRef.current = ref;
    },
    helperText: getHelperText(fieldMetaData)
  }
}
