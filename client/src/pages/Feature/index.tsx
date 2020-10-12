import React, { useEffect, useState } from 'react';
import { isItemType } from '../../util/typecheck';
import { findParentByParentId, countByStatus, countItemsByType, camelToNormal } from '../../util/functions';
import { PathPropsType, ItemType, UserType, ProjectType } from '../../util/dataTypes';
import { projectRequest, userRequest, itemRequest } from '../../httpRequests';
import {
	NameBadgeDiv, TagsDiv, AssigneeDiv, ParentItemDiv, StatusDiv, SmallCountCard, FilterItemsDiv, DescriptionDiv, ChildrenItemsDiv, ConsoleLogButton
} from '../../components';
import DonutChart from '../../charts/DonutChart';
import { AxiosError, AxiosResponse } from 'axios';
import DebugModeContext from '../../util/DebugModeContext';

const Feature = ({ match }: PathPropsType) => {
	const [projects, updateProjects] = useState<ProjectType[]>([]);
	const [users, updateUsers] = useState<UserType[]>([]); // potential assignee
	const [children, updateChildren] = useState<ItemType[]>([]);
	const [loading, updateLoading] = useState(true);

	const [feature, updateFeature] = useState<ItemType>({
		_id: '',
		parentId: null,
		parentType: null,
		projectId: null,
		status: '(open)',
		name: '',
		description: '',
		type: 'feature',
		tags: [],
		assigneeId: null
	});
	const [chartFilter, updateChartFilter] = useState<string>('all');
	const [update, toggleUpdate] = useState<boolean>(false);

	// INIT get to get feature data from match.params.id
	useEffect(() => {
		if (match.params.id !== undefined)
			itemRequest
				.getItemById(match.params.id)
				.then((response: AxiosResponse) => {
					if (isItemType(response.data)) updateFeature((response.data));
					updateLoading(false);
				})
				.catch((err: AxiosError) => {
					console.error(err);
					updateLoading(false);
				});
	}, [match.params.id]);

	// INIT if feature is found, find users as assignees
	useEffect(() => {
		if (feature._id) {
			userRequest
				.getAllUsers()
				.then((response: AxiosResponse) => updateUsers(response.data))
				.catch(err => console.error(err))
		}
	}, [feature._id])

	// INIT find parents and children depending on whether projectId is found in the feature item
	useEffect(() => {
		if (feature.projectId && feature._id) {
			projectRequest
				.getProjectById(feature.projectId)
				.then((response: AxiosResponse) => updateProjects([response.data]))
				.catch(err => console.error(err))
			itemRequest
				.getItemsByParentId(feature._id)
				.then((response: AxiosResponse) => updateChildren(response.data))
				.catch(err => console.error(err))
		} else {
			projectRequest
				.getAllProjects()
				.then((response: AxiosResponse) => updateProjects(response.data))
				.catch(err => console.error(err))
		}
	}, [feature.projectId, feature._id])

	// effect to update feature
	useEffect(() => {
		if (feature._id && update === true) {
			itemRequest
				.updateItemById(feature._id, feature)
				.then(data => console.log(data))
				.catch(err => console.error(err))
			toggleUpdate(!update)
		}
	}, [feature, update])

	const saveButtonPressed = (part: string, payload: string | string[] | null) => {
		if (feature !== undefined) {
			switch (part) {
				case 'name':
					if (typeof payload === 'string') updateFeature(prev => { return { ...prev, name: payload } });
					break;
				case 'tags':
					if (payload instanceof Array) updateFeature(prev => { return { ...prev, tags: payload } });
					break;
				case 'assigneeId':
					if (typeof payload === 'string' || payload === null) updateFeature(prev => { return { ...prev, assigneeId: payload } });
					break;
				case 'parentId':
					if ((typeof payload === 'string' || payload === null)) {
						const parent = findParentByParentId(payload, projects)
						if (parent === null) {
							updateFeature(prev => { return { ...prev, parentId: null, parentType: null } })
						} else {
							updateFeature(prev => { return { ...prev, parentId: parent._id, parentType: parent.type, projectId: parent.projectId } })
						}
					}
					break;
				case 'status':
					if (typeof payload === 'string') updateFeature(prev => { return { ...prev, status: payload } });
					break;
				case 'description':
					if (typeof payload === 'string') updateFeature(prev => { return { ...prev, description: payload } });
					break;
				default:
					break;
			}
			toggleUpdate(!update)
		}
	}

	return (
		<div className="container">
			{
				loading ?
					<small>loading...</small>
					:
					null
			}

			{
				!feature._id && !loading ?
					<p>No feature found...</p>
					:
					null
			}

			{
				feature._id && !loading ?
					<div>
						< div className="row">
							<div className="col-12 col-md-6 col-lg-7">
								<div className="shadow rounded p-2 mt-2">

									<NameBadgeDiv type='feature'
										name={feature.name}
										saveButtonPressed={saveButtonPressed} />
									<hr className="mt-2" />

									<TagsDiv type="feature"
										tags={feature.tags}
										saveButtonPressed={saveButtonPressed} />
									<hr className="mt-2" />

									<AssigneeDiv assigneeId={feature.assigneeId}
										saveButtonPressed={saveButtonPressed}
										users={users} />
									<hr className="mt-2" />
									{
										feature.projectId ?
											<div className="">
												<div className="d-flex justify-content-between align-items-baseline">
													<label className="font-weight-light">Project</label>
												</div>
												<div>
													<h5 className="mb-0">
														{projects[0] ? projects[0].name : '(open)'}
													</h5>
													<small className="">{`Parent ID: (${feature.parentId ? feature.parentId : 'n/a'})`}</small>
												</div>
												<hr className="mt-2" />
											</div>
											:
											<div>
												<ParentItemDiv type="feature"
													currentParentId={feature.parentId}
													parents={projects}
													saveButtonPressed={saveButtonPressed} />
												<hr className="mt-2" />
											</div>
									}
									<StatusDiv type="feature"
										status={feature.status}
										saveButtonPressed={saveButtonPressed} />

								</div>
							</div>

							<div className="col-12 col-md-6 col-lg-5">
								<div className="shadow rounded p-2 mt-2">
									<label className="font-weight-light">Snapshot</label>
									<div>
										<SmallCountCard type="work"
											count={countItemsByType('work', children)}
											to={`/search/work/${feature.projectId}/${feature._id}`} />
										<SmallCountCard type="bug"
											count={countItemsByType('bug', children)}
											to={`/search/bug/${feature.projectId}/${feature._id}`} />
									</div>
									<hr className="mt-2" />

									<label className="font-weight-light">Progress</label>
									{
										children.length > 0 ?
											<div>
												<FilterItemsDiv onChange={updateChartFilter} includeFeature={false} />
												<DonutChart title={camelToNormal(chartFilter)}
													type={chartFilter} data={countByStatus(chartFilter, children)} position="right" />
											</div>
											:
											<div className="d-flex justify-content-center">
												<small>no data available</small>
											</div>
									}
								</div>
							</div>

						</div>
						{/* end of first row */}

					</div>
					:
					null
			}

			{/* start of second row */}
			{
				feature._id ?
					<div className="row">
						<div className="col-12">
							<div className="shadow rounded p-2 mt-2">
								<DescriptionDiv text={feature.description}
									saveButtonPressed={saveButtonPressed} />
							</div>
						</div>
					</div>
					:
					null
			}
			{/* end of second row */}

			{/* third row */}
			{
				feature.projectId ?
					<div className="row">
						<div className="col-12">
							<div className="shadow rounded p-2 mt-2">
								<ChildrenItemsDiv type="feature"
									_id={feature._id}
									projectId={feature.projectId}
									includeFeature={false}
									children={children}
								/>
							</div>
						</div>
					</div>
					:
					null
			}
			{/* end of third row */}



			<DebugModeContext.Consumer>
				{({ debugMode }) => {
					if (debugMode) return (
						<div className="col-4">
							<ConsoleLogButton name="feature" state={feature} />
							<ConsoleLogButton name="projects" state={projects} />
						</div>
					)
				}}
			</DebugModeContext.Consumer>
		</div >
	)
}
export default Feature;