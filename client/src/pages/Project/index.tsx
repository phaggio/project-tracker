import React, { useState, useEffect } from 'react';
import { projectRequest, featureRequest } from '../../httpRequests'
import NewButton from '../../components/NewButton';
import AddNewButton from '../../components/AddNewButton';
import FeatureLink from '../../components/FeatureLink';

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

type FeatureArray = FeatureObj[];


const Project = ({ match }: PathProps) => {
	console.log('match', match);
	console.log('rendering Project page...');

	const [projectId] = useState(match ? match.params.id : '');
	const [project, updateProject] = useState({
		_id: '',
		type: '',
		name: '',
		description: '',
		tags: []
	});

	const [features, updateFeatures] = useState<FeatureArray>([]);

	const buttons = [
		{
			name: 'New feature',
			url: `/new/feature/project/${project.name}/${project._id}`,
			ariaLabel: 'add-new-feature'
		},
		{
			name: 'New work item',
			url: `/new/workitem/project/${project.name}/${project._id}`,
			ariaLabel: 'add-new-work-item'
		}
	]

	if (match) console.log(`Found project ID in URL...`);

	useEffect(() => {
		if (match) {
			console.log(`projectId found in URL, making initial GET api call to get project info...`)
			projectRequest
				.getProjectById(projectId)
				.then(res => updateProject(res.data));
		}
	}, [projectId, match])

	useEffect(() => {
		if (match) {
			featureRequest
				.getFeaturesByProjectId(projectId)
				.then(res => updateFeatures(res.data));
		}
	}, [projectId, match])

	return (
		<div className="container">
			<div className="row">

				<div className="col-12 col-md-5 col-lg-4 border border-primary d-flex flex-column">
					<div className="py-1 d-flex align-items-center">
						<h1><span className="badge badge-primary">{project.name}</span></h1>
					</div>

					<div>
						<hr className="my-2" />
					</div>

					<div className="py-1 d-flex align-items-center flex-wrap">
						{
							project.tags.map(tag => {
								return (<span className="badge badge-info mr-1 my-1" key={tag}>{tag}</span>)
							})
						}
					</div>

					<div>
						<hr className="my-2" />
					</div>

					<div className="py-1">
						<h5>Description</h5>
						<p>{project.description}</p>
					</div>

				</div>

				<div className="col-12 col-md-7 col-lg-8 border border-danger">
					<div className="row py-1 d-flex justify-content-end border border-success rounded">
						<AddNewButton buttons={buttons} small={true} />
					</div>

					<div>
						WILL NEED TO SHOW project status summary here, with graphs and numbers, etc.
						<br />
						WORK IN PROGRESS.........................
					</div>

				</div>
			</div>
			{/* end of first row */}


			<div className="row mt-1 border border-info rounded">
				<div className="col-12 col-md-5 border border-success rounded">
					<h4>Features</h4>

					{features ? features.map(feature => {
						return (
							<FeatureLink key={feature._id} featureData={feature} />
						)
					})
						:
						''
					}

				</div>
				<div className="col-12 col-md-8 border border-secondary rounded">

				</div>
			</div>


			<button onClick={() => console.log(features)}>console.log features state</button>

		</div>
	)
};



export default Project