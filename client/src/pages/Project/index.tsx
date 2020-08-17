import React, { useState, useEffect } from 'react';
import { projectRequest } from '../../httpRequests'
import NewButton from '../../components/NewButton';

type pathProps = {
	history: boolean;
	location: string;
	match: matchObj;
};

type matchObj = {
	isExact: boolean;
	params: matchParams;
	path: string;
	url: string;
};

type matchParams = {
	id: string;
};

type IProject = {
	_id: string;
	name: string;
	description: string;
	tags: string[];
};

const Project = ({ match }: pathProps) => {
	console.log('match', match);
	console.log('match params', match.params);

	const [project, updateProject] = useState<IProject | undefined>(undefined);
	const [projectId] = useState(match.params.id);

	useEffect(() => {
		projectRequest
			.getProjectById(projectId)
			.then(res => updateProject(res.data));
	}, [projectId])


	return (
		<div className="container">
			<div className="row">

				<div className="col-12 col-md-5 border border-primary d-flex flex-column">
					<label>id</label>
					<small>{match.params.id}</small>
					<label>path</label>
					<p>{match.path}</p>
					<label>url</label>
					<p>{match.url}</p>
					<label>name</label>
					<h4>{project ? project.name : ``}</h4>
					<label>description</label>
					<h5>{project ? project.description : ``}</h5>
				</div>

				<div className="col-12 col-md-7">
					<div className="row d-flex justify-content-end">
						<NewButton name='New feature'
							url={`/new/feature/${match.params.id}`}
							ariaLabel='add-new-feature'
							small={true} />
					</div>
					<div>Feature 1</div>
					<div>Feature 2</div>
					<div>Feature 3</div>
					<div>Feature 4</div>
					<div>Feature 5</div>
				</div>

			</div>
		</div>
	)
};



export default Project