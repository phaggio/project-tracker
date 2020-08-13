import React from 'react';
import { Link, Route } from 'react-router-dom';

interface pathObj {
	history: boolean;
	location: string;
	match: matchObj;
};

interface matchObj {
	isExact: boolean;
	params: object;
	path: string;
	url: string;
}

const Project = (path: pathObj) => {
	const match = path.match;
	console.log(match)
	return (
		<div className="container">
			Project page

			<li>
				<Link to={`${match.url}/first`}>First</Link>
			</li>
			<li>
				<Link to={`${match.url}/second`}>Second</Link>
			</li>

			<Route
				exact={true}
				path={`${match.path}/:name`}
				render={(path) => (
					<div>
						{path.match.params.name}
						<h4>something</h4>
						<p>something</p>
					</div>
				)}
			/>


			<Route
				exact={true}
				path='/project/test'
				render={() => (
					<div>
						<h4>TEST</h4>
						<p>something</p>
					</div>
				)}
			/>
			
		</div>
	)
}

export default Project