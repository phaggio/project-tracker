import React, { useState, useEffect } from 'react';
import { PathProps } from '../../util/dataTypes'
import { projectRequest, itemRequest } from '../../httpRequests';
import NameBadgeDiv from '../../components/NameBadgeDiv';
import TagsDiv from '../../components/TagsDiv';
import DescriptionDiv from '../../components/DescriptionDiv';
import ChildrenItemsDiv from '../../components/ChildrenItemsDiv';
import ConsoleLogButton from '../../components/ConsoleLogButton';

type ItemType = {
	_id: string;
	type: string; // feature or work item
	status: string;
	name: string;
	description: string;
	tags: string[];
	parentId: string; // should be same as this project's _id
}

type ProjectType = {
	_id: string;
	name: string,
	description: string;
	type: string;
	tags: string[]
}

const Project = ({ match }: PathProps) => {
	console.log('Rendering Project page...');

	const [projectId] = useState(match.params.id ? match.params.id : '');
	const [project, updateProject] = useState<ProjectType | undefined>();

	const [items, updateItems] = useState<ItemType[]>([]);

	useEffect(() => {
		if (match) {
			console.log(`projectId found in URL, making initial GET api call to get project info...`)
			projectRequest
				.getProjectById(projectId)
				.then(res => updateProject(res.data));
			itemRequest
				.getWorkItemsByParentId(projectId)
				.then(res => updateItems(res.data));
		}
	}, [projectId, match])

	useEffect(() => {
		if (project && projectId) {
			projectRequest
				.updateProject(projectId, project)
				.then(data => console.log(data))
				.catch(err => console.error(err))
		}
	}, [project])

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
		}
	}

	return (
		<div className="container">
			{project !== undefined ?
				<div className="row">
					<div className="col-12 col-sm-6 col-md-7 col-lg-8 border border-primary rounded d-flex flex-column">

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

					<div className="col-12 col-sm-6 col-md-5 col-lg-4 border border-danger rounded">

						<div>
							WILL NEED TO SHOW project status summary here, with graphs and numbers, etc.
						<br />
						WORK IN PROGRESS.........................
					</div>

					</div>
				</div>
				// end of first row
				:
				''
			}


			{/* second row begins */}
			<div className="row mt-1 border border-info rounded">
				{project ?
					<ChildrenItemsDiv _id={projectId}
						type='project'
						name={project.name}
						children={[...items]} />
					:
					'no children item...'
				}
			</div>
			{/* end of second row */}

			<div className="col-3">
				<ConsoleLogButton state={project} name="project" />
				<ConsoleLogButton state={items} name="items" />
			</div>

		</div>
	)
};

export default Project