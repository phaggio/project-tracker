import React, { useEffect, useState } from 'react';
import { featureRequest } from '../../httpRequests';

type PathProps = {
	history: boolean;
	location: string;
	match: MatchObj;
};

type MatchObj = {
	isExact: boolean;
	params: MatchParams;
	path: string;
	url: string;
};

type MatchParams = {
	id: string;
};

type FeatureObj = {
	_id: string;
	status: string;
	name: string;
	description: string;
	tags: string[];
	projectId: string;
	assigneeId: string;
}

const Feature = ({ match }: PathProps) => {
	console.log(`rendering Feature page... `);
	console.log(match.params);

	const [featureId] = useState(match.params.id);
	const [feature, updateFeature] = useState<FeatureObj | undefined>(undefined)

	useEffect(() => {
		console.log('making GET api call to get feature data...');
		featureRequest
			.getFeatureById(featureId)
			.then(res => {
				console.log('Received feature data, updating feature state...')
				updateFeature(res.data)
			})
			.catch(err => console.error(err))
	}, [featureId])

	console.log(featureId);
	return (
		<div className="container">
			feature detail here
			<br />
			{match.params.id}


			<br />
			<button className="btn btn-danger btn-sm" onClick={() => console.log(feature)}>console.log feature state</button>
		</div>
	)
}


export default Feature;