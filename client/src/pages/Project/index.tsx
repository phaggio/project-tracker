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
	type: string;
	name: string;
	description: string;
	tags: string[];
};


const Project = ({ match }: pathProps) => {
	console.log('match', match);

	if (match) {
		console.log(`Found project ID in URL...`)
	}

	console.log('rendering Project page...')

	const [projectId] = useState(match ? match.params.id : '');
	const [project, updateProject] = useState<IProject>({
		_id: '',
		type: '',
		name: '',
		description: '',
		tags: []
	});


	useEffect(() => {
		console.log(`making initial GET api call to get project info...`)
		projectRequest
			.getProjectById(projectId)
			.then(res => updateProject(res.data));
	}, [projectId])


	return (
		<div className="container">
			<div className="row">

				<div className="col-12 col-md-5 col-lg-4 border border-primary d-flex flex-column">
					<div className="py-1 d-flex align-items-center">
						<h1><span className="badge badge-primary">{project.name}</span></h1>
						{/* <small className="">{project._id}</small> */}
					</div>

					<div>
						<hr className="my-2" />
					</div>

					<div className="py-1 d-flex align-items-center flex-wrap">
						{
							project.tags.map(tag => {
								return (<span className="badge badge-info mr-1 my-1" key={tag}>{tag}</span>)
							})
						}
					</div>

					<div>
						<hr className="my-2" />
					</div>

					<div className="py-1">
						<h5>Description</h5>
						<p>{project.description}</p>
					</div>

				</div>

				<div className="col-12 col-md-7 col-lg-8 border border-danger">
					<div className="row py-1 d-flex justify-content-end border border-success rounded">
						<NewButton name='New feature'
							url={
								project._id ?
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