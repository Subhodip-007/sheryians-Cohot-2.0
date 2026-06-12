import React from 'react';
// 1. Import the styles object
import styles from './button.module.css'; 

function Button() {
  return (
    // 2. Access the class name as a property of the object
    <button className={styles.btn}>
      Click Me
    </button>
  );
}

export default Button;