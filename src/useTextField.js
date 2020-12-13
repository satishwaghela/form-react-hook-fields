import React, { useEffect } from 'react';
import { debounce as _debounce } from 'lodash';

import { getHelperText, useIsMount, getEmptyObject } from './FieldUtils';

export default function useTextField (props) {
  const { getTextFieldProps = getEmptyObject, form, fieldKeyPath, validation, valueChange = 'onChange', validateOnChange = true } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const value = form.getFieldValue(fieldKeyPath);
  let textFieldRef;

  const isMount = useIsMount();
  useEffect(() => {
    if (validateOnChange && !isMount) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator && validator();
    }
    const input = textFieldRef.querySelector('input');
    if (input.value !== value) {
      input.value = value || '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = _debounce((value) => {
    form.setFieldValue(fieldKeyPath, value);
  }, 100);

  const changeHandleProps = {};
  if (valueChange === 'onBlur') {
    changeHandleProps.onBlur = (e) => handleChange(e.target.value);
  } else {
    changeHandleProps.onChange = (e) => handleChange(e.target.value);
  }

  const textFieldProps = getTextFieldProps({ value: value }) || {};

  return {
    changeHandleProps,
    value,
    fieldMetaData,
    onRef: (ref) => {
      textFieldRef = ref;
      const formRef = form.registerField(fieldKeyPath, {
        validation: validation
      });
      formRef.current = ref;
    },
    helperText: getHelperText(fieldMetaData),
    textFieldProps
  }
}

