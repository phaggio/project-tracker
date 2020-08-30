import React, { useEffect, useState } from 'react';
import { PathProps, ProjectType, FeatureType, WorkItemType, ParentPayloadType } from '../../util/dataTypes';
import { projectRequest, featureRequest, userRequest, itemRequest } from '../../httpRequests';
import NameBadge from '../../components/NameBadgeDiv';
import TagsDiv from '../../components/TagsDiv';
import AssigneeDiv from '../../components/AssigneeDiv';
import ParentItemDiv from '../../components/ParentItemDiv';
import StatusDiv from '../../components/StatusDiv';
import DescriptionDiv from '../../components/DescriptionDiv';
import ChildrenItemsDiv from '../../components/ChildrenItemsDiv';
import ConsoleLogButton from '../../components/ConsoleLogButton';

type AssigneeType = {
	assignee: string;
	assigneeId: string | null;
}

const Feature = ({ match }: PathProps) => {
	console.log(`Rendering Feature page... `);
	const currentFeatureId = match.params.id;

	const [feature, updateFeature] = useState<FeatureType | undefined>();
	const [projects, updateProjects] = useState<ProjectType[] | undefined>(undefined)
	const [workItems, updateWorkItems] = useState<WorkItemType[] | undefined>()
	const [users, updateUsers] = useState<[] | undefined>(undefined);

	// init Get to get all projects, users data for selection and current feature data and its children items
	useEffect(() => {
		if (match.params.id) {
			featureRequest
				.getFeatureById(match.params.id)
				.then(res => updateFeature(res.data))
				.catch(err => console.error(err))
			userRequest
				.getUser()
				.then(res => updateUsers(res.data))
				.catch(err => console.error(err))
			projectRequest
				.getAllProjects()
				.then(res => updateProjects(res.data))
				.catch(err => console.error(err))
			itemRequest
				.getWorkItemsByParentId(match.params.id)
				.then(res => updateWorkItems(res.data))
				.catch(err => console.error(err))
		}
	}, []);

	// update feature in database when feature state changes
	useEffect(() => {
		if (feature) {
			featureRequest
				.updateFeatureById(currentFeatureId, feature)
				.then(res => console.log(res.data))
				.catch(err => console.error(err))
		}
	}, [feature])



	// a custom function that checks whether the object is AssigneeType obj
	const isAssigneeType = (arg: any): arg is AssigneeType => {
		return arg.assignee !== undefined;
	};

	const saveButtonPressed = (part: string, payload: string | string[] | AssigneeType) => {
		switch (part) {
			case ('name'):
				if (typeof payload === 'string' && feature) updateFeature({ ...feature, name: payload });
				break;
			case 'tags':
				if (payload instanceof Array && feature) updateFeature({ ...feature, tags: payload });
				break;
			case 'status':
				if (typeof payload === 'string' && feature) updateFeature({ ...feature, status: payload });
				break;
			case 'description':
				if (typeof payload === 'string' && feature) updateFeature({ ...feature, description: payload });
				break;
			case 'assignee':
				if (isAssigneeType(payload) && feature) {
					updateFeature({ ...feature, assignee: payload.assignee, assigneeId: payload.assigneeId })
				}
				break;
			default:
				break;
		}
	}

	const updateParent = (part: string, payload: ParentPayloadType) => {
		if (part === 'parent' && feature) {
			updateFeature({
				...feature,
				parentType: payload.parentType,
				parentName: payload.parentName,
				parentId: payload.parentId
			})
		}
	}

	return (
		<div className="container">

			{feature !== undefined && projects !== undefined && workItems !== undefined ?
				<div>
					{/* start of first row */}
					< div className="row">

						<div className="col-12 col-sm-6 col-md-7 col-lg-8 border border-primary rounded d-flex flex-column">
							<div className="pt-1">
								<NameBadge type='feature'
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

							{users ?
								<div className="pt-1">
									<AssigneeDiv assigneeId={feature.assigneeId}
										assignee={feature.assignee}
										saveButtonPressed={saveButtonPressed}
										users={users} />
									<hr className="mt-2" />
								</div>
								:
								''
							}

							<div>
								<ParentItemDiv type="feature"
									currentParent={{
										parentType: feature.parentType,
										parentName: feature.parentName,
										parentId: feature.parentId
									}}
									parents={projects}
									saveButtonPressed={updateParent} />
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
						<div className="col-12 d-flex flex-column border border-warning rounded">
							<div className="pt-1">
								<DescriptionDiv text={feature.description}
									saveButtonPressed={saveButtonPressed} />
								<hr className="mt-2" />
							</div>

						</div>


						<ChildrenItemsDiv type="feature"
							children={workItems}
							_id={feature._id}
							name={feature.name} />

					</div>
					{/* end of second row */}
				</div>
				: ''
			}


			< div className="col-3" >
				<ConsoleLogButton name="feature" state={feature} />
				<ConsoleLogButton name='users' state={users} />
			</div >


		</div >
	)
}


export default Feature;