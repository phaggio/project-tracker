import React, { useState, useEffect } from 'react';
import TagsInput from '../../components/TagsInput';
import ConsoleLogButton from '../../components/ConsoleLogButton';
import { AxiosResponse } from 'axios';
import { projectRequest } from '../../httpRequests';

type NewProjectType = {
	name: string;
	description: string;
	tags: string[];
}

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
		console.log(event);
		projectRequest.addNewProject(projectInput)
			.then((response: AxiosResponse) => console.log(response))
			.catch(err => console.error(err));
	};

	const handleKeyEvent = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const id = event.target.id;
		const input = event.target.value.trim();
		console.log(id, input)
		if (id === 'name') {
			updateProjectInput({
				...projectInput, name: input
			})
		} else if (id === 'description') {
			updateProjectInput({
				...projectInput, description: input
			})
		}
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-12">

					<form
						method="POST"
						onSubmit={submitButtonPressed} // this also works when user press enter key on keyboard
					>
						<div className="form-group">
							<div className="d-flex justify-content-between align-items-baseline">
								<label className="font-weight-light">Project name</label>
								<small>Required</small>
							</div>
							<input type="text"
								className="form-control"
								id="name"
								onChange={event => handleKeyEvent(event)}
								placeholder="enter project name ..." />
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

							<textarea
								className="form-control"
								id="description"
								style={projectInput.description.length > 150 ? { height: '140px', whiteSpace: 'pre-wrap' } : { height: '80px', whiteSpace: 'pre-wrap' }}
								onChange={(event) => {
									handleKeyEvent(event)
								}}
								placeholder="Description"
							/>
						</div>

						<button className="btn btn-success"
							type="submit"
							disabled={disableCreateButton}
						>
							Create project
        		</button>

					</form>
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