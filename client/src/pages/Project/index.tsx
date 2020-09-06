import React, { useState, useEffect } from 'react';
import { PathProps, ProjectType, ItemType } from '../../util/dataTypes'
import { countByStatus, camelToNormal } from '../../util/functions';
import { projectRequest, itemRequest } from '../../httpRequests';
import { ChildrenItemsDiv, ConsoleLogButton, DescriptionDiv, NameBadgeDiv, TagsDiv } from '../../components';
import DonutChart from '../../charts/DonutChart';

const Project = ({ match }: PathProps) => {
	console.log('Rendering Project page...');

	const [project, updateProject] = useState<ProjectType | undefined>();
	const [update, toggleUpdate] = useState<boolean>(false);

	const [items, updateItems] = useState<ItemType[]>([]);
	const [children, updateChildren] = useState<ItemType[]>([]);
	const [chartFilter, updateChartFilter] = useState<string>('all');

	useEffect(() => {
		if (match.params.id !== undefined) {
			projectRequest
				.getProjectById(match.params.id)
				.then(res => updateProject(res.data));
			itemRequest
				.getWorkItemsByParentId(match.params.id)
				.then(res => updateItems(res.data));
			itemRequest
				.getWorkItemsByParentId(match.params.id)
				.then((res) => updateChildren(res.data))
				.catch(err => console.error(err))
		}
	}, [match.params])

	useEffect(() => {
		if (project && match.params.id !== undefined && update === true) {
			projectRequest
				.updateProject(match.params.id, project)
				.then(data => console.log(data))
				.catch(err => console.error(err))
			toggleUpdate(!update)
		}

	}, [project, update, match.params.id])

	const saveButtonPressed = (part: string, payload: string | string[]) => {
		if (project) {
			switch (part) {
				case 'name':
					if (typeof payload === 'string') updateProject({ ...project, name: payload });
					break;
				case 'description':
					if (typeof payload === 'string') updateProject({ ...project, description: payload });
					break;
				case 'tags':
					if (payload instanceof Array) updateProject({ ...project, tags: payload });
					break;
				default:
					break;
			}
			toggleUpdate(!update)
		}
	}

	return (
		<div className="container">
			{project !== undefined ?
				<div className="row">
					<div className="col-12 col-md-7 col-lg-7 border border-primary rounded d-flex flex-column">

						<div className="pt-1">
							<NameBadgeDiv type='project'
								name={project.name}
								saveButtonPressed={saveButtonPressed} />
							<hr className="mt-2" />
						</div>

						<div className="pt-1">
							<TagsDiv type="project"
								tags={project.tags}
								saveButtonPressed={saveButtonPressed} />
							<hr className="mt-2" />
						</div>

						<div className="pt-1">
							<DescriptionDiv text={project.description}
								saveButtonPressed={saveButtonPressed} />
							<hr className="mt-2" />
						</div>

					</div>


					<div className="col-12 col-md-5 col-lg-5 border border-danger rounded">
						<div>
							<label className="font-weight-light">Filter items by: </label>
							<select className="custom-select"
								defaultValue='all'
								onChange={(event) => {
									updateChartFilter(event.target.selectedOptions[0].value)
								}}
							>
								<option value='all'>All</option>
								<option value='feature'>Feature</option>
								<option value='workItem'>Work item</option>
								<option value='bug'>Bug</option>
							</select>
						</div>

						<DonutChart title={camelToNormal(chartFilter)} data={countByStatus(chartFilter, children)} />
					</div>
				</div>
				// end of first row
				:
				''
			}


			{/* second row begins */}
			<div className="row mt-1 border border-info rounded">
				{project && match.params.id !== undefined ?
					<ChildrenItemsDiv _id={match.params.id}
						type='project'
						includeFeature={true}
						children={children} />
					:
					'no children item...'
				}
			</div>
			{/* end of second row */}

			<div className="mt-4 col-6">
				<ConsoleLogButton state={project} name="project" />
				<ConsoleLogButton state={items} name="items" />
				<ConsoleLogButton state={chartFilter} name="chart filter" />
			</div>

		</div>
	)
};

export default Project