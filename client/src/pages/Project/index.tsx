import React, { useState, useEffect } from 'react';
import { PathProps, ProjectType, ItemType } from '../../util/dataTypes'
import { countByStatus, camelToNormal } from '../../util/functions';
import { projectRequest, itemRequest } from '../../httpRequests';
import { ChildrenItemsDiv, DescriptionDiv, FilterItemsDiv, NameBadgeDiv, TagsDiv } from '../../components';
import DonutChart from '../../charts/DonutChart';

const Project = ({ match }: PathProps) => {
	console.log('Rendering Project page...');

	const [project, updateProject] = useState<ProjectType | undefined>();
	const [update, toggleUpdate] = useState<boolean>(false);

	const [children, updateChildren] = useState<ItemType[]>([]);
	const [chartFilter, updateChartFilter] = useState<string>('all');

	useEffect(() => {
		if (match.params.id !== undefined) {
			projectRequest
				.getProjectById(match.params.id)
				.then(res => updateProject(res.data))
			itemRequest
				.getWorkItemsByParentId(match.params.id)
				.then((res) => updateChildren(Array.from(res.data)))
				.catch(err => console.error(err))
		}
	}, [match.params])

	useEffect(() => {
		if (project && match.params.id !== undefined && update === true) {
			projectRequest
				.updateProject(match.params.id, project)
				.then(data => console.log(data))
				.catch(err => console.error(err))
			toggleUpdate(previous => { return !previous })
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
					<div className="col-12 col-md-6 col-lg-7 d-flex flex-column">

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

					</div>

					<div className="col-12 col-md-6 col-lg-5">
						<FilterItemsDiv onChange={updateChartFilter} />
						<DonutChart title={camelToNormal(chartFilter)} data={countByStatus(chartFilter, children)} />
					</div>
				</div>
				// end of first row
				:
				''
			}


			{/* second row begins */}
			{project && match.params.id !== undefined ?
				<div className="row mt-1">
					<div className="col-12">
						<DescriptionDiv text={project.description}
							saveButtonPressed={saveButtonPressed} />
						<hr className="mt-2" />
						<ChildrenItemsDiv _id={match.params.id}
							type='project'
							includeFeature={true}
							children={children} />
					</div>
				</div>
				:
				'no children item...'
			}
			{/* end of second row */}

		</div>
	)
};

export default Project