import React from 'react';

import './styles.less';

const Card = ({
  title,
  body: bodyFromProps,
  bgColor = 'white'
}) => {
  let body;

  if (typeof bodyFromProps === "string" || typeof bodyFromProps === "number") {
    body = bodyFromProps.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    console.log('body', body);
  } else if (typeof body === "function") {
    body = bodyFromProps();
  }
  else if (React.isValidElement(bodyFromProps)) {
    body = bodyFromProps
  }

  return (
    <div className={`app-card w-1/3 mx-2 p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ${bgColor} `}>
      <div className="app-card-title text-30px font-bold text-white" >
        {title}
      </div>
      <div className="app-card-body mt-8 text-24px text-white font-medium" >
        {body}
      </div>
    </div>
  )
}

export default Card;