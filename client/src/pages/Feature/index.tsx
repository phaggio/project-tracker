import React, { useEffect, useState } from 'react';
import { PathProps, ProjectType, FeatureType, WorkItemType } from '../../util/dataTypes';
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
	const [feature, updateFeature] = useState<FeatureType | undefined>();

	const [projects, updateProjects] = useState<ProjectType[] | undefined>(undefined) // potential parents
	const [items, updateItems] = useState<WorkItemType[] | undefined>() // potential parnets
	const [users, updateUsers] = useState<[]>([]); // potential assignee

	const [loading, updateLoading] = useState<boolean>(true);
	const [update, toggleUpdate] = useState<boolean>(false);

	// INIT GET to get all projects, users data for selection and current feature data and its children items
	useEffect(() => {
		if (match.params.id !== undefined) {
			projectRequest
				.getAllProjects()
				.then((response: AxiosResponse) => updateProjects(response.data))
				.catch(err => console.error(err))
			itemRequest
				.getAllWorkItems()
				.then((response: AxiosResponse) => updateItems(response.data))
				.catch(err => console.error(err))
			userRequest
				.getAllUsers()
				.then((response: AxiosResponse) => updateUsers(response.data))
				.catch(err => console.error(err))
			itemRequest
				.getWorkItemById(match.params.id)
				.then((response: AxiosResponse) => {
					updateLoading(!loading);
					updateFeature(response.data);
				})
				.catch(err => console.error(err))
		}
	}, []);

	useEffect(() => {
		if (feature && update === true) {
			itemRequest
				.updateWorkItemById(feature._id, feature)
				.then(data => console.log(data))
				.catch(err => console.error(err))
			toggleUpdate(!update)
		}
	}, [feature, update])

	const saveButtonPressed = (part: string, payload: string | string[] | AssigneeType) => {
		if (feature) {
			switch (part) {
				case ('name'):
					if (typeof payload === 'string') updateFeature({ ...feature, name: payload });
					break;
				case 'tags':
					if (payload instanceof Array) updateFeature({ ...feature, tags: payload });
					break;
				case 'assigneeId':
					if (typeof payload === 'string' || payload === null) updateFeature({ ...feature, assigneeId: payload });
					break;
				case 'parentId':
					if (typeof payload === 'string' || payload === null) updateFeature({ ...feature, parentId: payload });
					break;
				case 'status':
					if (typeof payload === 'string') updateFeature({ ...feature, status: payload });
					break;
				case 'description':
					if (typeof payload === 'string') updateFeature({ ...feature, description: payload });
					break;
				default:
					break;
			}
			toggleUpdate(!update)
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


							<div className="pt-1">
								<AssigneeDiv assigneeId={feature.assigneeId}
									saveButtonPressed={saveButtonPressed}
									users={users} />
								<hr className="mt-2" />
							</div>

							<div>
								<ParentItemDiv type="feature"
									currentParentId={feature.parentId}
									parents={projects}
									saveButtonPressed={saveButtonPressed} />
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
				<ConsoleLogButton name="param id" state={match.params.id} />
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