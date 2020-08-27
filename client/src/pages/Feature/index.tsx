import React, { useEffect, useState } from 'react';
import { projectRequest, featureRequest, userRequest } from '../../httpRequests';
import NameBadge from '../../components/NameBadgeDiv';
import TagsDiv from '../../components/TagsDiv';
import AssigneeDiv from '../../components/AssigneeDiv'
import StatusDropDown from '../../components/StatusDropDown';
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
	assignee: string;
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
	const [feature, updateFeature] = useState<FeatureObj | undefined>();
	const [projectId, updateProjectId] = useState<string | undefined>(undefined);
	const [project, updateProject] = useState<ProjectObj | undefined>(undefined);
	const [users, updateUsers] = useState([]);

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
		if (featureId && feature) {
			featureRequest.updateFeatureById(featureId, feature)
				.then(res => console.log(res.data))
				.catch(err => console.error(err))
		}
	}, [feature])

	useEffect(() => {
		userRequest.getUser()
			.then(res => updateUsers(res.data))
	}, [])

	const saveButtonPressed = (part: string, payload: string | string[]) => {
		switch (part) {
			case ('name'):
				if (typeof payload === 'string' && feature) updateFeature({ ...feature, name: payload });
				break;
			case 'tags':
				if (payload instanceof Array && feature) updateFeature({ ...feature, tags: payload });
				break;
			case 'status':
				if (typeof payload === 'string' && feature) updateFeature({ ...feature, status: payload });
				break;
			case 'description':
				console.log('update desc')
				break;
			case 'assignee':
				console.log('need to update assignee!!!')
			default:
				break;
		}
	}

	return (
		<div className="container">

			{feature !== undefined ?
				<div>
					{/* start of first row */}
					< div className="row">

						<div className="col-12 col-sm-6 col-md-7 col-lg-8 border border-primary rounded d-flex flex-column">
							<div className="pt-2">
								<NameBadge type='feature'
									name={feature.name}
									saveButtonPressed={saveButtonPressed} />
								<hr className="mt-3" />
							</div>

							<div className="pt-2">
								<TagsDiv type="feature"
									tags={feature.tags}
									saveButtonPressed={saveButtonPressed} />
								<hr className="mt-3" />
							</div>

							{users.length > 0 ?
								<div className="pt-2">
									<AssigneeDiv type="feature"
										assignee={feature.assignee}
										saveButtonPressed={saveButtonPressed}
										users={users} />
								</div>
								:
								''
							}

							<div className="pt-2">
								<StatusDropDown type="feature"
									status={feature.status}
									saveButtonPressed={saveButtonPressed} />
							</div>
						</div>

					</div>
					{/* end of first row */}


					{/* start of second row */}
					<div className="row">
						<div>
							<div className="col-12 col-sm-6 col-md-12">
								<h4>Description</h4>
								<p>{feature.description}</p>
							</div>
						</div>
					</div>
					{/* end of second row */}
				</div>
				: ''
			}

			< div className="col-3" >
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

				<ConsoleLogButton name='users' state={users} />
			</div >


		</div >
	)
}


export default Feature;