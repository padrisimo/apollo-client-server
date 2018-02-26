import React from 'react';

const Notelist = ({ notes }) => (
  <ul>
    {notes.map(item => 
      <li key={item.id}> > {item.details} </li>
    )}
  </ul>
);

export default Notelist;
