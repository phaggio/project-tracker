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
		projectRequest
			.getProjectById(match.params.id)
			.then(res => updateProject(res.data));
	}, [])


	return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-5 border border-primary">
					<h4>{match.params.id}</h4>
					<p>{match.path}</p>
					<p>{match.url}</p>
					<label>description</label>
					<p>{project ? project.description : ``}</p>
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