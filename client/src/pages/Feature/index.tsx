import React, { useEffect, useState } from 'react';
import { PathProps, FeatureType, WorkItemType } from '../../util/dataTypes';
import { projectRequest, featureRequest, userRequest, workItemRequest } from '../../httpRequests';
import NameBadge from '../../components/NameBadgeDiv';
import TagsDiv from '../../components/TagsDiv';
import AssigneeDiv from '../../components/AssigneeDiv'
import StatusDiv from '../../components/StatusDiv';
import DescriptionDiv from '../../components/DescriptionDiv';
import ChildrenItemsDiv from '../../components/ChildrenItemsDiv';
import ConsoleLogButton from '../../components/ConsoleLogButton';

type AssigneeType = {
	assignee: string;
	assigneeId: string | null;
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
	const [feature, updateFeature] = useState<FeatureType | undefined>();
	const [projectId, updateProjectId] = useState<string | undefined>(undefined);
	const [project, updateProject] = useState<ProjectObj | undefined>(undefined);
	const [workItems, updateWorkItems] = useState<WorkItemType[] | undefined>()
	const [users, updateUsers] = useState<[] | undefined>(undefined);

	useEffect(() => {
		console.log('making GET api call to get feature data...');
		if (featureId !== undefined) {
			featureRequest
				.getFeatureById(featureId)
				.then(res => {
					console.log('Received feature data, updating feature state...')
					updateFeature(res.data)
				})
				.catch(err => console.error(err));
			workItemRequest
				.getWorkItemsByParentId(featureId)
				.then(res => updateWorkItems(res.data))
				.catch(err => console.error(err))
		}
	}, [featureId])

	useEffect(() => {
		if (feature && feature.parentId !== projectId && projectId !== undefined) {
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

	// init Get to get all users data
	useEffect(() => {
		userRequest.getUser()
			.then(res => updateUsers(res.data));
	}, []);

	// a custom function that checks whether the object is AssigneeType obj
	const isAssigneeType = (arg: any): arg is AssigneeType => {
		return arg.assignee !== undefined;
	};

	const saveButtonPressed = (part: string, payload: string | string[] | AssigneeType) => {
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
				if (typeof payload === 'string' && feature) updateFeature({ ...feature, description: payload });
				break;
			case 'assignee':
				if (isAssigneeType(payload) && feature) {
					updateFeature({ ...feature, assignee: payload.assignee, assigneeId: payload.assigneeId })
				}
			default:
				break;
		}
	}

	return (
		<div className="container">

			{feature !== undefined && workItems !== undefined ?
				<div>
					{/* start of first row */}
					< div className="row">

						<div className="col-12 col-sm-6 col-md-7 col-lg-8 border border-primary rounded d-flex flex-column">
							<div className="pt-1">
								<NameBadge type='feature'
									name={feature.name}
									saveButtonPressed={saveButtonPressed} />
								<hr className="mt-2" />
							</div>

							<div className="pt-1">
								<TagsDiv type="feature"
									tags={feature.tags}
									saveButtonPressed={saveButtonPressed} />
								<hr className="mt-2" />
							</div>

							{users ?
								<div className="pt-1">
									<AssigneeDiv assigneeId={feature.assigneeId}
										assignee={feature.assignee}
										saveButtonPressed={saveButtonPressed}
										users={users} />
									<hr className="mt-2" />
								</div>
								:
								''
							}

							<div className="pt-1">
								<StatusDiv type="feature"
									status={feature.status}
									saveButtonPressed={saveButtonPressed} />
								<hr className="mt-2" />
							</div>
						</div>

					</div>
					{/* end of first row */}


					{/* start of second row */}
					<div className="row">
						<div className="col-12 d-flex flex-column border border-warning rounded">
							<div className="pt-1">
								<DescriptionDiv text={feature.description}
									saveButtonPressed={saveButtonPressed} />
								<hr className="mt-2" />
							</div>

						</div>


						<ChildrenItemsDiv type="feature"
							children={workItems}
							_id={feature._id}
							name={feature.name} />

					</div>
					{/* end of second row */}
				</div>
				: ''
			}




			< div className="col-3" >
				<ConsoleLogButton name="feature" state={feature} />
				<ConsoleLogButton name="feature Id" state={featureId} />
				<ConsoleLogButton name='users' state={users} />
			</div >


		</div >
	)
}


export default Feature;