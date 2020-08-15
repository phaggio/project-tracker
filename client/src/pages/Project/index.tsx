import React, { useState, useEffect } from 'react';
import { projectRequest } from '../../httpRequests'

interface pathProps {
	history: boolean;
	location: string;
	match: matchObj;
};

interface matchObj {
	isExact: boolean;
	params: matchParams;
	path: string;
	url: string;
}

interface matchParams {
	id: string;
}

interface IProject {
	_id: string;
	name: string;
	description: string;
	tags: string[];
}

const Project = ({ match }: pathProps) => {
	console.log(match);
	console.log(match.params);
	console.log(match.params.id);

	const [project, updateProject] = useState<IProject | undefined>(undefined);

	useEffect(() => {
		if (match.params) {
			projectRequest
				.getProjectById(match.params.id)
				.then(res => updateProject(res.data));
		}
	}, [])


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
						<button className="btn btn-success btn-sm">New feature</button>
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