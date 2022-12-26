import React from 'react';
import classes from './Card.module.css';

const Card = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className={classes.card}>
      {children}
    </div>
  );
};

export default Card;