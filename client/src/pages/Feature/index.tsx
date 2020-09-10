import React, { useEffect, useState } from 'react';
import { PathPropsType, ProjectType, ItemType } from '../../util/dataTypes';
import { projectRequest, userRequest, itemRequest } from '../../httpRequests';
import {
	AssigneeDiv, ChildrenItemsDiv, DescriptionDiv, NameBadgeDiv,
	ParentItemDiv, StatusDiv, TagsDiv
} from '../../components';

import { AxiosResponse } from 'axios';

const Feature = ({ match }: PathPropsType) => {
	console.log(`Rendering Feature page... `);
	const [feature, updateFeature] = useState<ItemType | undefined>();

	const [projects, updateProjects] = useState<ProjectType[]>([]) // potential parents
	const [users, updateUsers] = useState<[]>([]); // potential assignee
	const [children, updateChildren] = useState<ItemType[]>([]); // children of this feature

	const [loading, updateLoading] = useState<boolean>(true);
	const [update, toggleUpdate] = useState<boolean>(false);

	// INIT GET to get all projects, users data for selection and current feature data and its children items
	useEffect(() => {
		if (match.params.id !== undefined) {
			projectRequest
				.getAllProjects()
				.then((response: AxiosResponse) => updateProjects(response.data))
				.catch(err => console.error(err))
			userRequest
				.getAllUsers()
				.then((response: AxiosResponse) => updateUsers(response.data))
				.catch(err => console.error(err));
			itemRequest
				.getWorkItemById(match.params.id)
				.then((response: AxiosResponse) => {
					updateLoading(previous => { return !previous });
					updateFeature(response.data);
				})
				.catch(err => console.error(err));
			itemRequest
				.getWorkItemsByParentId(match.params.id)
				.then((response: AxiosResponse) => updateChildren(response.data))
				.catch(err => console.error(err))
		}
	}, [match.params.id]);

	useEffect(() => {
		if (feature && update === true) {
			itemRequest
				.updateWorkItemById(feature._id, feature)
				.then(data => console.log(data))
				.catch(err => console.error(err))
			toggleUpdate(!update)
		}
	}, [feature, update])

	const saveButtonPressed = (part: string, payload: string | string[]) => {
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

			{!loading && feature !== undefined && projects !== undefined ?
				<div>
					{/* start of first row */}
					< div className="row">

						<div className="col-12 col-md-7 col-lg-8 border border-primary rounded d-flex flex-column">

							<div className="pt-1">
								<NameBadgeDiv type='feature'
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

						{/* <div className="col-12 col-md-5 col-lg-4 d-flex justify-content-center">
							<DoubleDonutChart title="feature" data={countByStatus('workItem', children)} />
						</div> */}

					</div>
					{/* end of first row */}


					{/* start of second row */}
					<div className="row">
						<div className="col-12">

							<div className="pt-1">
								<DescriptionDiv text={feature.description}
									saveButtonPressed={saveButtonPressed} />
								<hr className="mt-2" />
							</div>

							<ChildrenItemsDiv type="feature"
								includeFeature={false}
								children={children}
								_id={feature._id} />
						</div>


					</div>
					{/* end of second row */}
				</div>
				:
				'feature is not found'
			}


		</div >
	)
}


export default Feature;