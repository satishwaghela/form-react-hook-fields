import React from 'react';
import PropTypes from 'prop-types';

import useTextField from './useTextField';
import { MemoField } from './FieldUtils';

export default function TextField (props) {
  const { form, getTextFieldProps, validation, valueChange, validateOnChange } = props;

  const {
    textFieldProps,
    changeHandleProps,
    value,
    onRef,
    helperText
  } = useTextField({
    form, getTextFieldProps, validation, valueChange, validateOnChange
  });

  return (
    <>
      <input
        type='text'
        defaultValue={value || ''}
        {...changeHandleProps}
        {...textFieldProps}
        ref={onRef}
      />
      {helperText}
    </>
  );
}

TextField.propTypes = {
  getTextFieldProps: PropTypes.func,
  valueChange: PropTypes.string,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validateOnChange: PropTypes.bool,
  validation: PropTypes.func
};

export function MemoTextField (props) {
  return (
    <MemoField
      Field={TextField}
      props={props}
    />
  );
}
