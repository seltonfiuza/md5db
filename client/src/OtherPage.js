import React from 'react';
import { Link } from 'react-router-dom';

export default function OtherPage() {
  return (
    <div>
      Im some other page
      <Link to="/">Go back to home page!</Link>
    </div>
  );
}
