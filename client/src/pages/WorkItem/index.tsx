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


const WorkItem = () => {

  return(
    <div>work item page</div>
  )
}

export default WorkItem