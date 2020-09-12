import PropTypes from 'prop-types';
import React from 'react';

export default function Preview({ value}) {
  return <div className={"preview"}>{ value }</div>;
}

Preview.propTypes = {
  value: PropTypes.node
};
