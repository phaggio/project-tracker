import React from 'react';
// import { Link, Route } from 'react-router-dom';

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

const Project = ({ match }: pathProps) => {
	console.log(match);
	console.log(match.params);
	console.log(match.params.id);

	return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-5 border border-primary">
					<h4>{match.params.id}</h4>
					<p>{match.path}</p>
					<p>{match.url}</p>
					<p>description</p>
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit, quod commodi obcaecati natus, corporis minima atque neque architecto porro libero possimus unde dignissimos consequatur saepe dolorum quia debitis fugiat illum.</p>
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