import React, { useEffect, useState } from 'react';
import { PathProps, ProjectType, FeatureType, WorkItemType, ParentPayloadType } from '../../util/dataTypes';
import { projectRequest, userRequest, itemRequest } from '../../httpRequests';
import NameBadge from '../../components/NameBadgeDiv';
import TagsDiv from '../../components/TagsDiv';
import AssigneeDiv from '../../components/AssigneeDiv';
import ParentItemDiv from '../../components/ParentItemDiv';
import StatusDiv from '../../components/StatusDiv';
import DescriptionDiv from '../../components/DescriptionDiv';
import ChildrenItemsDiv from '../../components/ChildrenItemsDiv';
import ConsoleLogButton from '../../components/ConsoleLogButton';
import { AxiosResponse } from 'axios';

type AssigneeType = {
	assignee: string;
	assigneeId: string | null;
}

const Feature = ({ match }: PathProps) => {
	console.log(`Rendering Feature page... `);
	const currentFeatureId = match.params.id;

	const [feature, updateFeature] = useState<FeatureType | undefined>();
	const [projects, updateProjects] = useState<ProjectType[] | undefined>(undefined)
	const [items, updateItems] = useState<WorkItemType[] | undefined>()
	const [users, updateUsers] = useState<[] | undefined>(undefined);

	const [loading, updateLoading] = useState(true);

	// init Get to get all projects, users data for selection and current feature data and its children items
	useEffect(() => {
		if (match.params.id) {
			console.log('getting all items...')
			userRequest
				.getAllUsers()
				.then((response: AxiosResponse) => updateUsers(response.data))
				.catch(err => console.error(err))
			projectRequest
				.getAllProjects()
				.then((response: AxiosResponse) => updateProjects(response.data))
				.catch(err => console.error(err))
			itemRequest
				.getAllWorkItems()
				.then((response: AxiosResponse) => updateItems(response.data))
				.catch(err => console.error(err))
		}
	}, []);

	useEffect(() => {
		console.log(`param id is ${currentFeatureId} `);
		if (match.params.id) {
			itemRequest
				.getWorkItemById(match.params.id)
				.then(response => {
					updateLoading(!loading);
					updateFeature(response.data);
				})
				.catch(err => console.error(err))
		}

	}, [currentFeatureId])

	// will use it to update feature.
	useEffect(() => {
		console.log('feature updated...')
	}, [feature])

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
				break;
			default:
				break;
		}
	}

	const updateParent = (part: string, payload: ParentPayloadType) => {
		if (part === 'parent' && feature) {
			updateFeature({
				...feature,
				parentType: payload.parentType,
				parentName: payload.parentName,
				parentId: payload.parentId
			})
		}
	}

	return (
		<div className="container">

			{!loading && feature !== undefined && projects !== undefined && items !== undefined ?
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
								'users is not found...'
							}

							<div>
								<ParentItemDiv type="feature"
									currentParent={{
										parentType: feature.parentType,
										parentName: feature.parentName,
										parentId: feature.parentId
									}}
									currentParentId={feature.parentId}
									parents={projects}
									saveButtonPressed={updateParent} />
							</div>

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
							children={items}
							_id={feature._id}
							name={feature.name} />

					</div>
					{/* end of second row */}
				</div>
				:
				'feature is not found'
			}


			< div className="col-6" >
				<ConsoleLogButton name="param id" state={currentFeatureId} />
				<ConsoleLogButton name="match param" state={match.params} />
				<ConsoleLogButton name="feature" state={feature} />
				<ConsoleLogButton name="projects" state={projects} />
				<ConsoleLogButton name="items" state={items} />
				<ConsoleLogButton name='users' state={users} />
			</div >


		</div >
	)
}


export default Feature;