import React from 'react';
import PropTypes from 'prop-types';

import { MemoField, getEmptyObject } from './FieldUtils';
import useCheckboxGroup from './useCheckboxGroup';

export default function CheckboxGroup (props) {
  const {
    getCheckboxProps = getEmptyObject, form, fieldKeyPath, validation,
    checkboxOptions, validateOnChange = true
  } = props;

  const {
    fieldMetaData,
    value,
    handleChange,
    onRef,
    helperText
  } = useCheckboxGroup({
    form, fieldKeyPath, validation, checkboxOptions, validateOnChange
  });

  return (
    <>
      {checkboxOptions.map((option, i) => (
        <input
          type='checkbox'
          key={i}
          checked={value.includes(option.value)}
          onChange={handleChange}
          {...getCheckboxProps({ value: value, option })}
          ref={onRef}
        />
      ))}
      {helperText}
    </>
  );
}

CheckboxGroup.propTypes = {
  getCheckboxProps: PropTypes.func,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func,
  checkboxOptions: PropTypes.array,
  validateOnChange: PropTypes.bool
};

export function MemoCheckboxGroup (props) {
  return (
    <MemoField
      Field={CheckboxGroup}
      props={props}
    />
  );
}
