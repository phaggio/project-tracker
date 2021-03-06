import React from 'react';

type PropsType = {
  state: any;
  name: string;
}

const ConsoleLogButton = (props: PropsType) => {

  return (
    <button className="btn btn-danger btn-sm mt-1 mr-1 py-0"
      onClick={() => console.log(props.state)}
    >
      {`console.log ${props.name}`}
    </button>
  )
}

export default ConsoleLogButton