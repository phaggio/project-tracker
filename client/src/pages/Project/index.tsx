import React, { useState, useEffect } from 'react';
import { isProjectType, isItemTypeArray } from '../../util/typecheck';
import { PathPropsType, ProjectType, ItemType } from '../../util/dataTypes'
import { countByStatus, countItemsByType, findChildrenByParentId, camelToNormal } from '../../util/functions';
import { projectRequest, itemRequest } from '../../httpRequests';
import {
	NameBadgeDiv, StatusDiv, TagsDiv, SmallCountCard, FilterItemsDiv, DescriptionDiv, ChildrenItemsDiv, ConsoleLogButton
} from '../../components';
import DonutChart from '../../charts/DonutChart';
import { AxiosError, AxiosResponse } from 'axios';
import DebugModeContext from '../../util/DebugModeContext';

const Project = ({ match }: PathPropsType) => {
	const [project, updateProject] = useState<ProjectType>({
		_id: '',
		projectId: '',
		status: 'Open',
		name: '',
		description: '',
		type: 'project',
		tags: []
	});

	const [loading, updateLoading] = useState<boolean>(true);

	const [children, updateChildren] = useState<ItemType[]>([]); // children with that projectId
	const [immediateChildren, updateImmediateChildren] = useState<ItemType[]>([]);
	const [chartFilter, updateChartFilter] = useState<string>('all');

	const [update, toggleUpdate] = useState<boolean>(false);

	useEffect(() => {
		if (match.params.id !== undefined) {
			projectRequest
				.getProjectById(match.params.id)
				.then((response: AxiosResponse) => {
					if (isProjectType(response.data)) updateProject(response.data);
					updateLoading(false);
				})
				.catch((err: AxiosError) => {
					console.error(err);
					// if (err.response) console.error(err.response);
					updateLoading(false);
				})
		}
	}, [match.params.id])

	useEffect(() => {
		if (project._id) {
			itemRequest
				.getItemsWithProjectIdByQuery({ projectId: project._id })
				.then((response: AxiosResponse) => {
					if (isItemTypeArray(response.data)) {
						updateChildren(response.data);
						updateImmediateChildren(findChildrenByParentId(project._id, response.data));
					}
				})
				.catch(err => console.error(err))
		}
	}, [project._id])

	useEffect(() => {
		if (project._id && update === true) {
			projectRequest
				.updateProject(project._id, project)
				.then(data => console.log(data))
				.catch(err => console.error(err))
			toggleUpdate(previous => { return !previous })
		}
	}, [project, update])

	const saveButtonPressed = (part: string, payload: string | string[]) => {
		if (project) {
			switch (part) {
				case 'name':
					if (typeof payload === 'string') updateProject(prev => { return { ...prev, name: payload } });
					break;
				case 'tags':
					if (payload instanceof Array) updateProject(prev => { return { ...prev, tags: payload } });
					break;
				case 'status':
					if (typeof payload === 'string') updateProject(prev => { return { ...prev, status: payload } });
					break;
				case 'description':
					if (typeof payload === 'string') updateProject(prev => { return { ...prev, description: payload } });
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
				!project._id && !loading ?
					<small>No project found.</small>
					:
					null
			}

			{
				project._id && !loading ?
					<div className="row">
						<div className="col-12 col-md-6 col-lg-7">
							<div className="shadow rounded p-2 mt-2">

								<NameBadgeDiv type='project'
									name={project.name}
									saveButtonPressed={saveButtonPressed} />
								<hr className="mt-2" />

								<StatusDiv type='project'
									status={project.status}
									saveButtonPressed={saveButtonPressed} />
								<hr className="mt-2" />

								<TagsDiv type="project"
									tags={project.tags}
									saveButtonPressed={saveButtonPressed} />

							</div>
						</div>

						<div className="col-12 col-md-6 col-lg-5">
							<div className="shadow rounded p-2 mt-2">

								<label className="font-weight-light">Snapshot</label>
								<div>
									<SmallCountCard type="feature"
										count={countItemsByType('feature', children)}
										to={`/search/feature/${project.projectId}`} />
									<SmallCountCard type="work"
										count={countItemsByType('work', children)}
										to={`/search/work/${project.projectId}`} />
									<SmallCountCard type="bug"
										count={countItemsByType('bug', children)}
										to={`/search/bug/${project.projectId}`} />
								</div>
								<hr className="mt-2" />

								<label className="font-weight-light">Overall progress</label>
								<FilterItemsDiv onChange={updateChartFilter} />
								<DonutChart title={camelToNormal(chartFilter)}
									type={chartFilter} data={countByStatus(chartFilter, children)} position="right" />

							</div>
						</div>

					</div>
					// end of first row
					:
					null
			}

			{/* second row */}
			{
				project._id && !loading ?
					<div className="row mt-1">
						<div className="col-12">
							<div className="shadow rounded p-2 mt-2">
								<DescriptionDiv text={project.description}
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
				project._id && !loading ?
					<div className="row mt-1">
						<div className="col-12">
							<div className="shadow rounded p-2 mt-2">
								<ChildrenItemsDiv type='project'
									_id={project._id}
									projectId={project._id}
									includeFeature={true}
									children={immediateChildren} />
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
							<ConsoleLogButton name="project" state={project} />
							<ConsoleLogButton name="children" state={children} />
							<ConsoleLogButton name="immediate children" state={immediateChildren} />
						</div>
					)
				}}
			</DebugModeContext.Consumer>
		</div>
	)
};

export default Project