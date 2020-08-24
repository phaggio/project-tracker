import React, { useState, useEffect } from 'react';
import { projectRequest, featureRequest, workItemRequest } from '../../httpRequests';
import { parseTags } from '../../util';
import NameBadge from '../../components/NameBadge';
import AddNewButton from '../../components/AddNewButton';
import Tag from '../../components/Tag';
import FeatureLink from '../../components/FeatureLink';
import WorkItemLink from '../../components/WorkItemLink';
import ConsoleLogButton from '../../components/ConsoleLogButton';

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

type WorkItemObj = {
	_id: string;
	type: string;
	status: string;
	name: string;
	description: string;
	tags: string[];
	parentId: string;
}

type WorkItemArray = WorkItemObj[];

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
	const [workItems, updateWorkItems] = useState<WorkItemArray>([]);

	const [editNameMode, updateEditNameMode] = useState(false);
	const [editTagsMode, updateEditTagsMode] = useState(false);
	const [editDescriptionMode, updateEditDescriptionMode] = useState(false);

	const buttons = [
		{
			name: 'Feature',
			url: `/new/feature/project/${project.name}/${project._id}`,
			ariaLabel: 'add-new-feature'
		},
		{
			name: 'Work item',
			url: `/new/workitem/project/${project.name}/${project._id}`,
			ariaLabel: 'add-new-work-item'
		},
		{
			name: 'Bug',
			url: `/new/bug/project/${project.name}/${project._id}`,
			ariaLabel: 'add-new-bug'
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
			workItemRequest
				.getWorkItemsByParentId(projectId)
				.then(res => updateWorkItems(res.data));
		}
	}, [projectId, match])

	const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const id = event.target.id;
		const input = event.target.value;
		switch (id) {
			case 'name':
				updateProject({ ...project, name: input })
				break;
			case 'description':
				updateProject({ ...project, description: input })
				break;
			case 'tags':
				updateProject({ ...project, tags: parseTags(input) })
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		projectRequest.updateProject(projectId, project)
			.then(data => console.log(data))
	}, [project])

	const saveButtonPressed = (type: string, part: string, payload: string) => {
		console.log(type);
		console.log(part);
		console.log(payload)
		switch (part) {
			case 'name':
				updateProject({ ...project, name: payload });
				break;
			case 'description':
				console.log('update desc')
				break;
			default:
				break;
		}
	}

	return (
		<div className="container">
			<div className="row">

				<div className="col-12 col-md-6 col-lg-8 border border-primary rounded d-flex flex-column">
					<div className="py-1">

						<NameBadge type='project'
							name={project.name}
							onChangeFunc={handleInput}
							saveButtonPressed={saveButtonPressed} />

						{/* {editNameMode ?
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
						} */}

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
											// saveButtonPressed();
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
						{
							editDescriptionMode ?
								<div className="form-group">
									<div className="d-flex justify-content-between">
										<label>Description <small>(Optional)</small></label>
										<div className="d-flex align-items-start">
											<button className="btn btn-outline-success btn-sm py-0" onClick={() => {
												// saveButtonPressed();
												updateEditDescriptionMode(!editDescriptionMode);
											}}>
												<i className="fas fa-check" />
											</button>
											<button className="btn btn-outline-danger btn-sm py-0" onClick={() => {
												updateEditDescriptionMode(!editDescriptionMode)
											}}>
												<i className="fas fa-times" />
											</button>
										</div>
									</div>
									<textarea
										className="form-control"
										id="description"
										style={{ whiteSpace: 'pre-wrap', height: '150px' }}
										defaultValue={project.description}
										// style={project.description.length > 60 ? { height: '140px' } : { height: '90px' }}
										onChange={event => handleInput(event)}
										placeholder="Description" />

								</div>
								:
								<div>
									<div className="d-flex">
										<h5 className="mr-1">Description</h5>
										<button className="btn btn-sm p-0 d-flex align-items-start"
											title="edit"
											onClick={() => updateEditDescriptionMode(!editDescriptionMode)}>
											<i className="far fa-edit" />
										</button>
									</div>
									<p>{project.description}</p>
								</div>
						}
					</div>

				</div>

				<div className="col-12 col-md-6 col-lg-4 border border-danger rounded">

					<div>
						WILL NEED TO SHOW project status summary here, with graphs and numbers, etc.
						<br />
						WORK IN PROGRESS.........................
					</div>

				</div>
			</div>
			{/* end of first row */}



			{/* second row begins */}
			<div className="row mt-1 border border-info rounded">
				<div className="col-12 d-flex justify-content-between align-items-center">
					<h4>Items</h4>
					<AddNewButton buttons={buttons} small={true} />
				</div>

				{/* <div className="row border border-dark rounded"> */}

				{features ? features.map(feature => {
					return (
						<div className="col-12 col-sm-6 col-md-4 col-lg-3 my-1"
							key={feature._id}>
							<FeatureLink key={feature._id} featureData={feature} />
						</div>
					)
				})
					:
					''
				}
				{workItems ? workItems.map(workItem => {
					return (
						<div className="col-12 col-sm-6 col-md-4 col-lg-3 my-1"
							key={workItem._id}>
							<WorkItemLink key={workItem._id} workItemData={workItem} />
						</div>
					)
				})
					:
					''
				}
				{/* </div> */}

			</div>
			{/* end of second row */}


			<ConsoleLogButton state={project} name="project" />
			<ConsoleLogButton state={features} name="features" />
			<ConsoleLogButton state={workItems} name="work item" />
		</div>
	)
};



export default Project