import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { get as _get } from 'lodash';

import { getHelperText, useIsMount, getEmptyObject } from './FieldUtils';

export default function ReactSelect (props) {
  const {
    form, fieldKeyPath, validation,
    valueKey, validateOnChange = true,
    getSelectProps = getEmptyObject
  } = props;

  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);
  const value = form.getFieldValue(fieldKeyPath);

  const isMount = useIsMount();
  useEffect(() => {
    if (validateOnChange && !isMount) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator && validator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const selectProps = getSelectProps({ value });
  const options = selectProps.options || [];
  const multiple = selectProps.multiple;

  const handleChange = (selected) => {
    let value;
    if (valueKey) {
      if (multiple) {
        value = selected.map(option => _get(option, valueKey));
      } else {
        value = _get(selected, valueKey);
      }
    } else {
      value = selected;
    }
    form.setFieldValue(fieldKeyPath, value);
  };

  let selected;
  if (valueKey) {
    let emptyValue;
    if (multiple) {
      emptyValue = [];
    } else {
      emptyValue = '';
    }
    const _value = value || emptyValue;
    if (multiple) {
      selected = options.filter(option => {
        const optionValue = _get(option, valueKey);
        return _value.includes(optionValue);
      });
    } else {
      selected = options.find(option => {
        const optionValue = _get(option, valueKey);
        return _value === optionValue;
      });
    }
  } else {
    selected = value;
  }

  return (
    <>
      <Select
        value={selected}
        onChange={handleChange}
        components={{
          DropdownIndicator: null
        }}
        {...selectProps}
        ref={form.registerField(fieldKeyPath, {
          validation: validation
        })}
      />
      {getHelperText(fieldMetaData)}
    </>
  );
}

ReactSelect.propTypes = {
  getSelectProps: PropTypes.func,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func,
  validateOnChange: PropTypes.bool,
  valueKey: PropTypes.string
};

export function MemoReactSelect (props) {
  return (
    <MemoField
      Field={ReactSelect}
      props={props}
    />
  );
}
