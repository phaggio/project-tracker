import React, { useState, useEffect } from 'react';
import { projectRequest, featureRequest, workItemRequest } from '../../httpRequests';
import NameBadgeDiv from '../../components/NameBadgeDiv';
import TagsDiv from '../../components/TagsDiv';
import DescriptionDiv from '../../components/DescriptionDiv';
import ChildrenItemsDiv from '../../components/ChildrenItemsDiv';
import ConsoleLogButton from '../../components/ConsoleLogButton';

type PathProps = {
	history: boolean;
	location: string;
	match: MatchObj;
};

type MatchObj = {
	isExact: boolean;
	params: MatchParams;
	path: string;
	url: string;
};

type MatchParams = {
	id: string;
};

type FeatureObj = {
	_id: string;
	type: string;
	status: string;
	name: string;
	description: string;
	tags: string[];
	projectId: string;
	assigneeId: string;
}

type FeatureArray = FeatureObj[];

type WorkItemObj = {
	_id: string;
	type: string;
	status: string;
	name: string;
	description: string;
	tags: string[];
	parentId: string;
}

type WorkItemArray = WorkItemObj[];

type ProjectObj = {
	_id: string;
	name: string,
	description: string;
	type: string;
	tags: string[]
}

const Project = ({ match }: PathProps) => {
	console.log('Rendering Project page...');

	const [projectId] = useState(match ? match.params.id : '');
	const [project, updateProject] = useState<ProjectObj | undefined>();

	const [features, updateFeatures] = useState<FeatureArray>([]);
	const [workItems, updateWorkItems] = useState<WorkItemArray>([]);


	useEffect(() => {
		if (match) {
			console.log(`projectId found in URL, making initial GET api call to get project info...`)
			projectRequest
				.getProjectById(projectId)
				.then(res => updateProject(res.data));
			featureRequest
				.getFeaturesByProjectId(projectId)
				.then(res => updateFeatures(res.data));
			workItemRequest
				.getWorkItemsByParentId(projectId)
				.then(res => updateWorkItems(res.data));
		}
	}, [projectId, match])

	useEffect(() => {
		if (project) {
			projectRequest
				.updateProject(project._id, project)
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
						children={[...features, ...workItems]} />
					:
					''
				}
			</div>
			{/* end of second row */}

			<div className="col-3">
				<ConsoleLogButton state={project} name="project" />
				<ConsoleLogButton state={features} name="features" />
				<ConsoleLogButton state={workItems} name="work item" />
			</div>

		</div>
	)
};



export default Project