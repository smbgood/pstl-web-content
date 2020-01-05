import PropTypes from 'prop-types';
import React from 'react';
//import { graphql, useStaticQuery } from "gatsby"

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

  /*getSiteInfo(){
    const { site } = useStaticQuery(
      graphql`
          query {
              site {
                  siteMetadata {
                      title
                      description
                      author
                  }
              }
          }
      `
    )
    return site
  }*/


  render() {
    const {
      forID,
      value,
      onChange,
      classNameWrapper,
    } = this.props;

    /*console.log(this.getSiteInfo())*/

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