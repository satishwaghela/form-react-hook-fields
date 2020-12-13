import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { MemoField, getEmptyObject } from './FieldUtils';
import useCheckboxGroup from './useCheckboxGroup';

export default function MuiCheckboxGroup (props) {
  const {
    getFormControlLabelProps = getEmptyObject, getCheckboxProps = getEmptyObject, form, fieldKeyPath, validation,
    checkboxOptions, controlType = 'checkbox', validateOnChange = true
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

  let ControlComp;
  if (controlType === 'switch') {
    ControlComp = Switch;
  } else {
    ControlComp = Checkbox;
  }

  return (
    <>
      {checkboxOptions.map((option, i) => (
        <FormControlLabel
          key={i}
          label={option.label}
          control={(
            <ControlComp
              name={option.value}
              checked={value.includes(option.value)}
              onChange={handleChange}
              {...getCheckboxProps({ value: value, option })}
            />
          )}
          ref={onRef}
          {...getFormControlLabelProps({ value: value, option })}
        />
      ))}
      {helperText}
    </>
  );
}

MuiCheckboxGroup.propTypes = {
  getFormControlLabelProps: PropTypes.func,
  getCheckboxProps: PropTypes.func,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func,
  checkboxOptions: PropTypes.array,
  validateOnChange: PropTypes.bool,
  controlType: PropTypes.string
};

export function MemoMuiCheckboxGroup (props) {
  return (
    <MemoField
      Field={MuiCheckboxGroup}
      props={props}
    />
  );
}
