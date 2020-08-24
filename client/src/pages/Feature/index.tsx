import React, { useEffect, useState } from 'react';
import { projectRequest, featureRequest } from '../../httpRequests';
import NameBadge from '../../components/NameBadge';
import Tag from '../../components/Tag';
import { updateProject } from '../../httpRequests/projects';

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
	type: string;
	status: string;
	name: string;
	description: string;
	tags: string[];
	projectId: string;
	assigneeId: string;
}

type ProjectObj = {
	_id: string;
	name: string,
	description: string;
	type: string;
	tags: string[]
}

const Feature = ({ match }: PathProps) => {
	console.log(`Rendering Feature page... `);

	const [featureId] = useState<string | undefined>(match.params.id);
	const [feature, updateFeature] = useState<FeatureObj>({
		_id: '',
		type: 'feature',
		status: 'open',
		name: '',
		description: '',
		tags: [],
		projectId: '',
		assigneeId: ''
	});
	const [projectId, updateProjectId] = useState<string | undefined>(undefined);
	const [project, updateProject] = useState<ProjectObj | undefined>(undefined);

	useEffect(() => {
		console.log('making GET api call to get feature data...');
		if (featureId !== undefined) {
			featureRequest
				.getFeatureById(featureId)
				.then(res => {
					console.log('Received feature data, updating feature state...')
					updateFeature(res.data)
				})
				.catch(err => console.error(err))
		}
	}, [featureId])

	useEffect(() => {
		if (feature && feature.projectId !== projectId && projectId !== undefined) {
			projectRequest.getProjectById(projectId)
				.then(res => {
					console.log('Received project data, updating project data...')
					updateProject(res.data)
				})
				.catch(err => console.error(err))
		}
	}, [feature])

	const saveButtonPressed = () => {
		if (feature && featureId) {
			featureRequest
				.updateFeatureById(featureId, feature)
				.then(res => console.log(res))
				.catch(err => console.error(err))
		} else {
			console.log('feature is undefined...')
		}
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-6 col-lg-8 border border-primary rounded d-flex flex-column">
					<div className="my-1 py-1">
						<NameBadge type='feature'
							name={feature.name}
							saveButtonPressed={saveButtonPressed} />


							<div className="row">
								<div className="col-12 col-md-5">

									<div>
										<hr className="my-2" />
									</div>

									<div className="py-1 d-flex align-items-center flex-wrap">
										{
											feature.tags.map(tag => {
												return (<Tag key={tag} name={tag} />)
											})
										}
									</div>

									<label>Status: </label>
									<div className="input-group">
										<select className="custom-select"
											defaultValue={feature.status}
											onChange={(event) => {
												console.log(event.target.selectedOptions[0].value)
												updateFeature({ ...feature, status: event.target.selectedOptions[0].value })
											}}
										>
											<option value='open'>Open</option>
											<option value='active'>Active</option>
											<option value='complete'>Complete</option>
											<option value='in-review'>In-review</option>
											<option value='close'>Close</option>
										</select>
										<div className="input-group-append">
											<button className="btn btn-outline-dark"
												type="button"
												onClick={() => {
													console.log('saving...');
													saveButtonPressed()
												}}
											>
												Save
									</button>
										</div>
									</div>

									{feature.tags}
									{feature.assigneeId}
								</div>
								<div className="col-12 col-md-7">
									<h4>Description</h4>
									<p>{feature.description}</p>
								</div>
							</div>



						<div className="col-3">
							<button className="btn btn-danger btn-sm my-1"
								onClick={() => console.log(featureId)}
							>
								console.log featureId
				</button>

							<button className="btn btn-danger btn-sm my-1"
								onClick={() => console.log(feature)}
							>
								console.log feature state
				</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}


export default Feature;