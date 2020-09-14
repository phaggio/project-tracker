import React from 'react';

type PropsType = {
  type: string;
  name: string | null | undefined;
}

const SmallNameBadge = (props: PropsType) => {
  const color = ((type: string) => {
    switch (type) {
      case 'project':
        return 'primary';
      case 'feature':
        return 'warning';
      case 'work':
        return 'light';
      case 'bug':
        return 'danger';
      default:
        return 'primary';
    }
  })(props.type);

  return (
    <span className={`badge badge-${color} p-2 w-auto`}>
      <label className="text-center text-wrap m-0">
        {props.name ? props.name : '(open)'}
      </label>
    </span>
  )
}

export default SmallNameBadge;