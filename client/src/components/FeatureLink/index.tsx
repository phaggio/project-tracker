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
    <div>
      <Link className="btn btn-warning btn-sm w-100 text-left mb-1"
        to={`/feature/${props.featureData._id}`}>
        {props.featureData.name}
      </Link>
    </div>
  )
}

export default FeatureLink