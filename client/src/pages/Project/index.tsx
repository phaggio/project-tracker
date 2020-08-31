import React, { useState, useEffect } from 'react';
import { PathProps, ProjectType, ItemType } from '../../util/dataTypes'
import { projectRequest, itemRequest } from '../../httpRequests';
import NameBadgeDiv from '../../components/NameBadgeDiv';
import TagsDiv from '../../components/TagsDiv';
import DescriptionDiv from '../../components/DescriptionDiv';
import ChildrenItemsDiv from '../../components/ChildrenItemsDiv';
import ConsoleLogButton from '../../components/ConsoleLogButton';

const Project = ({ match }: PathProps) => {
	console.log('Rendering Project page...');

	const [project, updateProject] = useState<ProjectType | undefined>();
	const [update, toggleUpdate] = useState<boolean>(false);

	const [items, updateItems] = useState<ItemType[]>([]);
	const [children, updateChildren] = useState<ItemType[]>([])

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

	}, [project, update])

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
				{project && match.params.id !== undefined ?
					<ChildrenItemsDiv _id={match.params.id}
						type='project'
						name={project.name}
						children={children} />
					:
					'no children item...'
				}
			</div>
			{/* end of second row */}

			<div className="mt-4 col-6">
				<ConsoleLogButton state={project} name="project" />
				<ConsoleLogButton state={items} name="items" />
			</div>

		</div>
	)
};

export default Project