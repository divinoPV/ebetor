import React from 'react';
import styles from './ImageItem.module.scss';

export default class ImageItem extends React.Component {
  render() {
    return <img alt={this.props.alt} className={`${styles['ImageItem']}`} src={this.props.src} {...this.props.rest} />;
  }
}
