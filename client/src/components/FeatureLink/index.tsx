import React from 'react';
import { Link } from 'react-router-dom';

type FeatureLinkProps = {
  featureData: FeatureData;
}

type FeatureData = {
  _id: string;
  projectId: string;
  name: string;
  status: string;
}

const FeatureLink = (props: FeatureLinkProps) => {
  return (

    <Link className="btn btn-warning border border-dark w-100 text-left text-truncate"
      title={props.featureData.name}
      to={`/feature/${props.featureData._id}`}>
      {props.featureData.name}
    </Link>

  )
}

export default FeatureLink;