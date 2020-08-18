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

	if (match) {
		console.log(`there's project ID in url`)
	}
	// console.log('match params', match.params);
	console.log('rendering...')

	const [projectId] = useState(match ? match.params.id : '');
	const [project, updateProject] = useState<IProject | undefined>(undefined);

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

				<div className="col-12 col-md-7 border border-danger">
					<div className="row d-flex justify-content-end border border-success rounded">
						<NewButton name='New feature'
							url={
								project ?
									`/new/feature/project/${project.name}/${project._id}`
									:
									'/new/feature'
							}
							ariaLabel='add-new-feature'
							small={true}
						/>
					</div>
					<div>WILL NEED TO SHOW THE LIST OF ASSOCIATED FEATURES HERE...</div>
				</div>

			</div>
		</div>
	)
};



export default Project