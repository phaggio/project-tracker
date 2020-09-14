import React, { useState, useEffect } from 'react';
import { NewProjectType } from '../../util/dataTypes';
import { NameInput, TagsInput, DescriptionTextarea, AddNewButton } from '../../components';
import ConsoleLogButton from '../../components/ConsoleLogButton';
import { AxiosResponse } from 'axios';
import { projectRequest } from '../../httpRequests';

const NewProject = () => {
	const [disableCreateButton, updateDisableCreateButton] = useState(true);
	const [projectInput, updateProjectInput] = useState<NewProjectType>(
		{ name: '', description: '', tags: [] }
	);
	const [tags, updateTags] = useState<string[]>([]);

	useEffect(() => {
		projectInput.name.trim() ?
			updateDisableCreateButton(false) : updateDisableCreateButton(true);
	}, [projectInput.name]);

	useEffect(() => {
		updateProjectInput(previous => { return { ...previous, tags: tags } })
	}, [tags]);

	const submitButtonPressed = (event: React.FormEvent) => {
		event.preventDefault();
		projectRequest.addNewProject(projectInput)
			.then((response: AxiosResponse) => {
				if (response.status === 200 && response.data._id !== undefined) {
					window.location.replace(`#/project/${response.data._id}`)
				}
			})
			.catch(err => console.error(err));
	};

	const updateName = (str: string) => updateProjectInput(prev => { return { ...prev, name: str } });
	const updateDescription = (str: string) => updateProjectInput(prev => { return { ...prev, description: str } });

	return (
		<div className="container">
			<div className="row">
				<div className="col-12">

					<div className="shadow rounded p-2 mt-2">
						<div className="form-group">
							<div className="d-flex justify-content-between align-items-baseline">
								<label className="font-weight-light">Project name</label>
								<small>Required</small>
							</div>
							<NameInput placeholder="enter project name ..." onChange={updateName} />
						</div>

						<div className="form-group">
							<div className="d-flex justify-content-between align-items-baseline">
								<label className="font-weight-light">Tags</label>
								<small>Optional</small>
							</div>
							<TagsInput tags={tags} onChange={updateTags} />
						</div>

						<div className="form-group">
							<div className="d-flex justify-content-between align-items-baseline">
								<label className="font-weight-light">Description</label>
								<small>Optional</small>
							</div>
							<DescriptionTextarea text={projectInput.description}
								placeholder="enter project description ..."
								onChange={updateDescription} />
						</div>

						<AddNewButton actionName="Create" itemName="project" disabled={disableCreateButton} onClick={submitButtonPressed} />

					</div>
				</div>
			</div>


			{/* debug console.log */}
			<div className="col-5">
				<ConsoleLogButton name="project input" state={projectInput} />
			</div>

		</div>
	)
};


export default NewProject;