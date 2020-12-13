import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import useTextField from './useTextField';
import { MemoField } from './FieldUtils';

export default function MuiTextField (props) {
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
      <TextField
        error={!fieldMetaData.validating && !!fieldMetaData.error}
        fullWidth
        {...changeHandleProps}
        defaultValue={value || ''}
        ref={onRef}
        {...textFieldProps}
      />
      {helperText}
    </>
  );
}

MuiTextField.propTypes = {
  getTextFieldProps: PropTypes.func,
  valueChange: PropTypes.string,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validateOnChange: PropTypes.bool,
  validation: PropTypes.func
};

export function MemoMuiTextField (props) {
  return (
    <MemoField
      Field={MuiTextField}
      props={props}
    />
  );
}
