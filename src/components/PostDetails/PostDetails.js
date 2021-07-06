import React from 'react';
console.log('PostDetails outside');
const PostDetails = () => {
  console.log('PostDetails inside');
  return (
    <div>
      <h1>ASSDDDD</h1>
      <h1 className='asd'>ASSDDDD</h1>
      {console.log('PostDetails inside return')}
      PostDetails
    </div>
  );
};

export default PostDetails;
