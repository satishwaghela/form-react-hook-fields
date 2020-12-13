import React from 'react';
import PropTypes from 'prop-types';

import { MemoField, getEmptyObject } from './FieldUtils';
import useRadioGroup from './useRadioGroup';

export default function MuiRadioGroup (props) {
  const {
    getRadioProps = getEmptyObject, getLabelProps = getEmptyObject, form, fieldKeyPath, validation,
    radioOptions, validateOnChange = true
  } = props;

  const {
    fieldMetaData,
    value,
    handleChange,
    onRef,
    helperText
  } = useRadioGroup({
    form, fieldKeyPath, validation, radioOptions, validateOnChange
  });

  return (
    <>
      {radioOptions.map((option, i) => (
        <label
          key={i}
          {...getLabelProps({ option })}
        >
          <input
            type='radio'
            checked={option.value === value}
            ref={onRef}
            handleChange={handleChange}
            {...getRadioProps({ value, option })}
          /> {option.label}
        </label>
      ))}
      {helperText}
    </>
  );
}

MuiRadioGroup.propTypes = {
  getFormControlLabelProps: PropTypes.func,
  getRadioProps: PropTypes.func,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func,
  validateOnChange: PropTypes.bool,
  radioOptions: PropTypes.array
};

export function MemoMuiRadioGroup (props) {
  return (
    <MemoField
      Field={MuiRadioGroup}
      props={props}
    />
  );
}
