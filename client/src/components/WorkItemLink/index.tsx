import React from 'react';
import { Link } from 'react-router-dom';

type WorkItemLinkProps = {
  workItemData: WorkItemData;
}

type WorkItemData = {
  _id: string;
  status: string;
  name: string;
  description: string;
  type: string;
  parentId: string;
}

const WorkItemLink = (props: WorkItemLinkProps) => {
  return (
    <Link className="btn btn-light border border-dark w-100 text-left text-truncate"
      title={props.workItemData.name}
      to={`/workitem/${props.workItemData._id}`}>
      {props.workItemData.name}
    </Link>
  )
}

export default WorkItemLink;