import React from 'react';

type PathProps = {
	history: boolean;
	location: string;
	match: MatchObj;
};

type MatchObj = {
	isExact: boolean;
	params: MatchParams;
	path: string;
	url: string;
};

type MatchParams = {
	id: string;
};

const Feature = ({ match }: PathProps) => {
	console.log(match.params);

	return (
		<div className="container">
			feature detail here
			<br />
			{match.params.id}
		</div>
	)
}


export default Feature;