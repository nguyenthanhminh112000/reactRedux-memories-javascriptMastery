import React, { useEffect } from 'react';
// import styles
import useStyles from './styles.js';
console.log('Form outside');
const Form = () => {
  useEffect(() => {
    console.log('Form inside useEffect ');
  }, []);

  console.log('Form inside');
  const classes = useStyles();
  return (
    <div>
      {console.log('Form inside return')}
      Form
    </div>
  );
};

export default Form;
