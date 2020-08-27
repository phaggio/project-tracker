import React, { useState, useEffect } from 'react';
import { projectRequest, featureRequest, workItemRequest } from '../../httpRequests';
import NameBadgeDiv from '../../components/NameBadgeDiv';
import TagsDiv from '../../components/TagsDiv';
import DescriptionDiv from '../../components/DescriptionDiv';
import AddNewDropDownButton from '../../components/AddNewDropDownButton';
import FeatureLink from '../../components/FeatureLink';
import WorkItemLink from '../../components/WorkItemLink';
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

	const buttons = [
		{
			name: 'Feature',
			url: `/new/feature/project/${project?.name}/${project?._id}`,
			ariaLabel: 'add-new-feature',
			title: 'add new feature'
		},
		{
			name: 'Work item',
			url: `/new/workitem/project/${project?.name}/${project?._id}`,
			ariaLabel: 'add-new-work-item',
			title: 'add new work item'
		},
		{
			name: 'Bug',
			url: `/new/bug/project/${project?.name}/${project?._id}`,
			ariaLabel: 'add-new-bug',
			title: 'add new bug'
		}
	]

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
					if (payload instanceof Array) updateProject({ ...project, tags: payload })
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

						<div className="pt-2">
							<NameBadgeDiv type='project' name={project.name} saveButtonPressed={saveButtonPressed} />
							<hr className="mt-3" />
						</div>

						<div className="pt-2">
							<TagsDiv
								type="project" tags={project.tags} saveButtonPressed={saveButtonPressed} />
							<hr className="mt-3" />
						</div>

						<div className="pt-2">
							<DescriptionDiv text={project.description} saveButtonPressed={saveButtonPressed} />
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
				<div className="col-12 d-flex justify-content-between align-items-baseline">
					<label className="font-weight-light">Items</label>
					<AddNewDropDownButton buttons={buttons} small={true} />
				</div>

				{features ? features.map(feature => {
					return (
						<div className="col-12 col-sm-6 col-md-4 col-lg-3 my-1"
							key={feature._id}>
							<FeatureLink key={feature._id} featureData={feature} />
						</div>
					)
				})
					:
					''
				}
				{workItems ? workItems.map(workItem => {
					return (
						<div className="col-12 col-sm-6 col-md-4 col-lg-3 my-1"
							key={workItem._id}>
							<WorkItemLink key={workItem._id} workItemData={workItem} />
						</div>
					)
				})
					:
					''
				}


			</div>
			{/* end of second row */}


			<ConsoleLogButton state={project} name="project" />
			<ConsoleLogButton state={features} name="features" />
			<ConsoleLogButton state={workItems} name="work item" />
		</div>
	)
};



export default Project