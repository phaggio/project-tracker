import React from 'react';

type PropsType = {
  text: string;
  onChange: (text: string) => void;
}

const DescriptionTextarea = (props: PropsType) => {

  return (
    <textarea
      className="form-control"
      id="description"
      style={
        props.text.length > 150 ?
          { height: '140px', whiteSpace: 'pre-wrap' }
          :
          { height: '80px', whiteSpace: 'pre-wrap' }
      }
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.onChange(event.target.value)
      }}
      placeholder="enter item description ..."
    />
  )
}

export default DescriptionTextarea;