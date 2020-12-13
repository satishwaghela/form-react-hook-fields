import React from 'react';
import PropTypes from 'prop-types';

import { getHelperText, useIsMount, MemoField, getEmptyObject } from './FieldUtils';
import useCheckbox from './useCheckbox';

export default function Checkbox (props) {
  const {
    getCheckboxProps = getEmptyObject, form, fieldKeyPath, validation,
    validateOnChange = true
  } = props;

  const {
    fieldKeyPath,
    value,
    handleChange,
    onRef,
    helperText
  } = useCheckbox({
    form, fieldKeyPath, validation, validateOnChange
  })

  return (
    <>
      <input
        type='checkbox'
        ref={onRef}
        onChange={handleChange}
        checked={!!value}
        {...getCheckboxProps({ value })}
      />
      {helperText}
    </>
  );
}

Checkbox.propTypes = {
  getCheckboxProps: PropTypes.func,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func,
  validateOnChange: PropTypes.bool,
  controlType: PropTypes.string
};

export function MemoCheckbox (props) {
  return (
    <MemoField
      Field={Checkbox}
      props={props}
    />
  );
}
