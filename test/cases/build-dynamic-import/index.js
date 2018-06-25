import React, { cloneElement } from 'react';

//import x from './x'

function demo(R, N) {

  import('./a').then(A => {
    console.log(A);
  });

  import('./b').then(B => {
    console.log(B);
  });

  import('./d').then(D => {
    console.log(D);
  });

  return [4012938193, R, N,];
}

demo(React, cloneElement);
