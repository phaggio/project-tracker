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

type ProjectObj = {
	_id: string;
	name: string,
	description: string;
	type: string;
	tags: string[]
}


const Project = ({ match }: PathProps) => {
	console.log('Rendering Project page...');

	const [projectId] = useState(match ? match.params.id : '');
	const [project, updateProject] = useState<ProjectObj>({
		_id: '',
		type: '',
		name: '',
		description: '',
		tags: []
	});

	const [features, updateFeatures] = useState<FeatureArray>([]);

	const [editNameMode, updateEditNameMode] = useState(false);
	const [editTagsMode, updateEditTagsMode] = useState(false);

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
			case 'tags':
				parseTags(input);
			default:
				break;
		}
	};

	const parseTags = (str: string) => {
		let tagArr: string[] = []
		// check for empty/space str between commas
		str.split(',').forEach((item: string) => {
			if (item.trim().length > 0) {
				tagArr.push(item.trim());
			}
		});
		updateProject({ ...project, tags: tagArr });
	}

	const saveButtonPressed = () => {
		projectRequest.updateProject(projectId, project)
			.then(data => console.log(data))
	}

	return (
		<div className="container">
			<div className="row">

				<div className="col-12 col-md-4 col-lg-4 border border-primary d-flex flex-column">
					<div className="py-1 d-flex align-items-center">

						{editNameMode ?
							<div className="input-group">
								<input type="text"
									className="form-control"
									id="name"
									onChange={event => handleInput(event)}
									placeholder="Project name"
									defaultValue={project.name} />
								<div className="input-group-append">
									<button type="button"
										className="btn btn-outline-success btn-sm"
										onClick={() => {
											saveButtonPressed();
											updateEditNameMode(!editNameMode);
										}}
									>
										<i className="fas fa-check" />
									</button>
									<button type="button"
										className="btn btn-outline-danger btn-sm"
										onClick={() => updateEditNameMode(!editNameMode)}
									>
										<i className="fas fa-times" />
									</button>
								</div>
							</div>
							:
							<div className="d-flex align-items-start">
								<span className="badge badge-primary d-flex justify-content-between align-items-start">
									<h4 className="py-1 px-2 m-0 text-left text-wrap">{project.name}</h4>
								</span>
								<button className="btn btn-sm p-0 d-flex align-items-start"
									title="edit"
									onClick={() => updateEditNameMode(!editNameMode)}>
									<i className="far fa-edit" />
								</button>
							</div>
						}

					</div>



					<div>
						<hr className="my-2" />
					</div>




					{editTagsMode ?

						<div className="form-group">
							<label className="mr-1">{`Tags: {`}</label>
							{
								project.tags ? project.tags.map(tag => {
									return (<span className="badge badge-info mr-1 my-1" key={tag}>{tag}</span>)
								}) : ``
							}
							<label>{`}`}</label>
							<div className="input-group">
								<input type="text"
									className="form-control text-wrap"
									id="tags"
									onChange={event => {
										handleInput(event)
									}}
									placeholder="Separate tags by comma"
									defaultValue={`${[...project.tags]}`}
								/>
								<div className="input-group-append">
									<button type="button"
										className="btn btn-outline-success btn-sm"
										onClick={() => {
											saveButtonPressed();
											updateEditTagsMode(!editTagsMode);
										}}
									>
										<i className="fas fa-check" />
									</button>
									<button type="button"
										className="btn btn-outline-danger btn-sm"
										onClick={() => updateEditTagsMode(!editTagsMode)}
									>
										<i className="fas fa-times" />
									</button>
								</div>
							</div>
							<small>Separate tags by comma</small>

						</div>
						:
						<div className="d-flex align-items-start">

							<div className="d-flex align-items-start flex-wrap">
								<label className="my-0 mr-1 p-0">{`Tags: {`}</label>
								{
									project.tags.map(tag => {
										return (<Tag key={tag} name={tag} />)
									})
								}
								<label className="my-0 p-0">{`}`}</label>
							</div>

							<button className="btn btn-sm p-0 d-flex align-items-start"
								title="edit"
								onClick={() => updateEditTagsMode(!editTagsMode)}>
								<i className="far fa-edit" />
							</button>
						</div>
					}




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


			<button className="btn btn-danger btn-sm mt-1"
				onClick={() => console.log(features)}
			>
				console.log features state
			</button>

			<button className="btn btn-danger btn-sm mt-1"
				onClick={() => console.log(project)}
			>
				console.log project state
			</button>

		</div>
	)
};



export default Project