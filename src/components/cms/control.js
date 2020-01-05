import PropTypes from 'prop-types';
import React from 'react';

export default class Control extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    forID: PropTypes.string,
    value: PropTypes.node,
    classNameWrapper: PropTypes.string.isRequired,
  }

  static defaultProps = {
    value: '',
  }

  render() {
    console.log(this)
    const {
      forID,
      value,
      onChange,
      classNameWrapper,
    } = this.props;

    return (
      <div>
        <input
          type="text"
          id={forID + "-input-1"}
          className={classNameWrapper}
          value={value || ''}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    );
  }
}