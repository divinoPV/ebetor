import React from 'react';
import styles from './ItemsContainer.module.scss';

export default class ItemsContainer extends React.Component {
  render() {
    return <div className={`${styles.ItemsContainer} ${this.props.className ?? ''}`} {...this.props.rest}>{this.props.children}</div>
  }
}
