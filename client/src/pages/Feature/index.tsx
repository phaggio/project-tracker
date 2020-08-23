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

	const [featureId] = useState(match.params.id);
	const [feature, updateFeature] = useState<FeatureObj | undefined>(undefined);
	const [editStatus, updateEditStatus] = useState(false);

	useEffect(() => {
		console.log('making GET api call to get feature data...');
		featureRequest
			.getFeatureById(featureId)
			.then(res => {
				console.log('Received feature data, updating feature state...')
				updateFeature(res.data)
			})
			.catch(err => console.error(err))
		// updateFeature({
		// 	_id: '5f3cb26ecb0be8061d7e0ee3',
		// 	name: 'some feature',
		// 	description: 'some description',
		// 	status: 'active',
		// 	tags: ['test', 'ux', 'dev work'],
		// 	projectId: '5f3c50c6770db46d5cd47941',
		// 	assigneeId: ''
		// })
	}, [featureId])

	console.log(featureId);
	return (
		<div className="container">

			{/* if feature is available */}
			{feature ?
				<div id='feature-found'>
					<div className="col-12">
						<h3>{feature.name}</h3>
					</div>
					<div className="row">
						<div className="col-12 col-md-5">


							<label>Status: </label>
							<div className="input-group">
								<select className="custom-select"
									defaultValue={feature.status}
									onChange={(event) => {
										console.log(event.target.selectedOptions[0].value)
										updateFeature({ ...feature, status: event.target.selectedOptions[0].value })
									}}>
									<option value='open'>Open</option>
									<option value='active'>Active</option>
									<option value='complete'>Complete</option>
									<option value='in-review'>In-review</option>
									<option value='close'>Close</option>
								</select>
								<div className="input-group-append">
									<button className="btn btn-outline-dark"
										type="button"
										onClick={() => console.log('saved...')}
									>
										Save
									</button>
								</div>
								{feature.status}
							</div>

							{feature.tags}
							{feature.assigneeId}
						</div>
						<div className="col-12 col-md-7">
							<h4>Description</h4>
							<p>{feature.description}</p>
						</div>
					</div>




					<div className="row">
						<button className="btn btn-danger btn-sm"
							onClick={() => console.log(featureId)}>
							console.log featureId
				</button>

						<button className="btn btn-danger btn-sm"
							onClick={() => console.log(feature)}>
							console.log feature state
				</button>
					</div>
				</div>
				:
				<div><h2>No feature found</h2></div>
			}

		</div>
	)
}


export default Feature;