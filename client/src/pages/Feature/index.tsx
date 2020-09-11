import React, { useEffect, useState } from 'react';
import { PathPropsType, ItemType, UserType } from '../../util/dataTypes';
import { projectRequest, userRequest, itemRequest } from '../../httpRequests';
import {
	AssigneeDiv, ChildrenItemsDiv, DescriptionDiv, NameBadgeDiv, StatusDiv, TagsDiv, ConsoleLogButton
} from '../../components';

import { AxiosResponse } from 'axios';

const Feature = ({ match }: PathPropsType) => {
	const [feature, updateFeature] = useState<ItemType | undefined>();
	const [parentName, updateParentName] = useState<string>('(open)');

	const [users, updateUsers] = useState<UserType[]>([]); // potential assignee

	const [children, updateChildren] = useState<ItemType[]>([]); // children of this feature

	const [update, toggleUpdate] = useState<boolean>(false);

	// type guard
	const checkItemType = (target: any): target is ItemType => {
		if ((target as ItemType).type) return true;
		return false;
	}

	// INIT GET to get all projects, users data for selection and current feature data and its children items
	useEffect(() => {
		if (match.params.id !== undefined) {
			itemRequest
				.getItemById(match.params.id)
				.then((response: AxiosResponse) => { if (checkItemType(response.data)) updateFeature((response.data)) })
				.catch(err => console.error(err));
			itemRequest
				.getItemsByParentId(match.params.id)
				.then((response: AxiosResponse) => {
					if (Array.isArray(response.data)) updateChildren(response.data)
				})
				.catch(err => console.error(err))
			userRequest
				.getAllUsers()
				.then((response: AxiosResponse) => {
					if (Array.isArray(response.data)) updateUsers(response.data)
				})
				.catch(err => console.error(err));
		}
	}, [match.params.id]);

	useEffect(() => {
		if (feature && feature.parentId !== null) {
			projectRequest
				.getProjectById(feature.parentId)
				.then(response => { if (typeof response.data.name === 'string') updateParentName(response.data.name) })
				.catch(err => console.error(err))
		}
	}, [feature])

	useEffect(() => {
		if (feature && update === true) {
			itemRequest
				.updateItemById(feature._id, feature)
				.then(data => console.log(data))
				.catch(err => console.error(err))
			toggleUpdate(!update)
		}
	}, [feature, update])

	const saveButtonPressed = (part: string, payload: string | string[]) => {
		if (feature) {
			switch (part) {
				case 'name':
					if (typeof payload === 'string') updateFeature({ ...feature, name: payload });
					break;
				case 'tags':
					if (payload instanceof Array) updateFeature({ ...feature, tags: payload });
					break;
				case 'assigneeId':
					if (typeof payload === 'string' || payload === null) updateFeature({ ...feature, assigneeId: payload });
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

			{feature !== undefined ?
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

							<div className="pt-1">
								<div className="d-flex justify-content-between align-items-baseline">
									<label className="font-weight-light">Parent</label>
								</div>
								<div>
									<h5 className="mb-0">
										{parentName}
									</h5>
									<small className="">{`Parent ID: (${feature.parentId ? feature.parentId : 'n/a'})`}</small>
								</div>
								<hr className="mt-2" />
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
						<div className="col-12">

							<div className="pt-1">
								<DescriptionDiv text={feature.description}
									saveButtonPressed={saveButtonPressed} />
								<hr className="mt-2" />
							</div>

							<ChildrenItemsDiv type="feature"
								_id={feature._id}
								projectId={feature.projectId}
								includeFeature={false}
								children={children}
							/>
						</div>


					</div>
					{/* end of second row */}
				</div>
				:
				'feature is not found'
			}

			<ConsoleLogButton name="feature" state={feature} />
		</div >
	)
}


export default Feature;