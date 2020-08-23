import React, { useState, useEffect } from 'react';
import { projectRequest, featureRequest } from '../../httpRequests'
import AddNewButton from '../../components/AddNewButton';
import Tag from '../../components/Tag';
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

	const [editMode, updateEditMode] = useState(false);

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

	useEffect(() => {
		if (match) {
			console.log(`projectId found in URL, making initial GET api call to get project info...`)
			projectRequest
				.getProjectById(projectId)
				.then(res => updateProject(res.data));
			featureRequest
				.getFeaturesByProjectId(projectId)
				.then(res => updateFeatures(res.data));
		}
	}, [projectId, match])

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const id = event.target.id;
		const input = event.target.value;
		switch (id) {
			case 'name':
				updateProject({ ...project, name: input })
				break;
			default:
				break;
		}
	};

	const saveButtonPressed = () => {
		projectRequest.updateProject(projectId, project)
			.then(data => console.log(data))
		updateEditMode(!editMode);
	}

	return (
		<div className="container">
			<div className="row">

				<div className="col-12 col-md-4 col-lg-4 border border-primary d-flex flex-column">
					<div className="py-1 d-flex align-items-center">

						{editMode ?
							<div className="input-group">
								<input type="text"
									className="form-control"
									id="name"
									onChange={event => handleInput(event)}
									placeholder="Project name"
									defaultValue={project.name} />
								<div className="input-group-append">
									<button type="button"
										className="btn btn-outline-dark"
										onClick={() => saveButtonPressed()}
									>
										save
									</button>
								</div>
							</div>
							:
							<h1 className="d-flex">
								<span className="badge badge-primary">{project.name}</span>
								<button className="btn btn-outline-dark btn-sm" onClick={() => updateEditMode(!editMode)}>Edit</button>
							</h1>
						}

					</div>

					<div>
						<hr className="my-2" />
					</div>

					<div className="py-1 d-flex align-items-center flex-wrap">
						{
							project.tags.map(tag => {
								return (<Tag key={tag} name={tag} />)
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

				<div className="col-12 col-md-8 col-lg-8 border border-danger">
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
				<div className="col-12 col-md-4 border border-success rounded">
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


			<button className="btn btn-danger mt-1"
				onClick={() => console.log(features)}
			>
				console.log features state
			</button>

			<button className="btn btn-danger mt-1"
				onClick={() => console.log(project)}
			>
				console.log project state
			</button>

		</div>
	)
};



export default Project