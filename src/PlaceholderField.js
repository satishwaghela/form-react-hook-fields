import React from 'react';
import PropTypes from 'prop-types';

import { MemoField } from './FieldUtils';

export default function PlaceholderField (props) {
  const { form, fieldKeyPath, validation } = props;

  return (
    <>
      <div
        ref={form.registerField(fieldKeyPath, {
          validation: validation
        })}
      />
    </>
  );
}

PlaceholderField.propTypes = {
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func
};

export function MemoPlaceholderField (props) {
  return (
    <MemoField
      Field={PlaceholderField}
      props={props}
    />
  );
}