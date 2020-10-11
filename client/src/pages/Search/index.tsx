import React, { useState, useEffect } from 'react';
import { projectRequest, itemRequest, userRequest } from '../../httpRequests';
import { ProjectType, ItemType, UserType, PathPropsType } from '../../util/dataTypes';
import { findAssigneeNameByAssigneeId } from '../../util/functions';
import { SearchInput, ProjectFilter, TypeFilter, StatusSelection, SearchItem, Pagination, ConsoleLogButton } from '../../components';
import { AxiosResponse } from 'axios';
import DebugModeContext from '../../util/DebugModeContext';


const Search = ({ match }: PathPropsType) => {
  const [projects, updateProjects] = useState<ProjectType[]>([]);
  const [items, updateItems] = useState<ItemType[]>([]);
  const [users, updateUsers] = useState<UserType[]>([]);

  // search input and filtered items for display
  const [input, updateInput] = useState<string>('');
  const [filteredItems, updateFilteredItems] = useState<ItemType[]>([]);

  // drop down filter options
  const [projectId, updateProjectId] = useState<string | undefined>();
  const [type, updateType] = useState<string | undefined>(match.params.type);
  const [status, updateStatus] = useState<string>('');

  const [disableFindButton, updateDisableFindButton] = useState(false);
  const [page, updatePage] = useState<number>(0)

  // INIT call
  useEffect(() => {
    if (match.params.type) {
      itemRequest
        .getItemsBySearchFilter({ type: match.params.type })
        .then((response: AxiosResponse) => updateItems(response.data))
        .catch(err => console.error(err))
    } else {
      itemRequest
        .getAllItems()
        .then((response: AxiosResponse) => updateItems(response.data))
        .catch(err => console.error(err))
    }
    projectRequest
      .getAllProjects()
      .then((response: AxiosResponse) => updateProjects(response.data))
      .catch(err => console.error(err))
    userRequest
      .getAllUsers()
      .then((response: AxiosResponse) => updateUsers(response.data))
      .catch(err => console.error(err))
    updateType(match.params.type)
  }, [match.params.type]);


  // load filteredItems array
  useEffect(() => {
    updateFilteredItems(items)
  }, [items]);

  // update filterItems and display it
  useEffect(() => {
    updateFilteredItems(
      items.filter(item => {
        const words = item.name.split(' ');
        let isMatch = false;
        words.forEach(word => {
          if (word.toLowerCase().startsWith(input.trim().toLowerCase())) {
            isMatch = word.toLowerCase().startsWith(input.trim().toLowerCase());
          }
        });
        return isMatch;
      })
    );
    updatePage(0)
  }, [input, items])

  const findButtonPressed = () => {
    updateDisableFindButton(true);
    updateInput('');
    itemRequest
      .getItemsBySearchFilter({
        projectId: projectId,
        type: type,
        status: status ? status : undefined
      })
      .then((response: AxiosResponse) => {
        updateItems(response.data);
        updateDisableFindButton(false);
      })
      .catch(err => console.error(err))
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-4">

          <div className="shadow rounded p-2 mt-2">

            <div className="pb-3">
              <SearchInput label="Item name" input={input} onChange={updateInput} />
            </div>

            <div className="pb-3">
              <ProjectFilter projects={projects} onChange={updateProjectId} />
            </div>

            <div className="pb-3">
              <TypeFilter defaultType={match.params.type} onChange={updateType} />
            </div>

            <div className="pb-3">
              <label className="font-weight-light">Status</label>
              <StatusSelection all={true} onChange={updateStatus} defaultStatus={"all"} />
            </div>

            <div>
              <button className="btn btn-primary"
                type="submit"
                onClick={findButtonPressed}
                disabled={disableFindButton}>Find</button>
            </div>

          </div>


          <DebugModeContext.Consumer>
            {({ debugMode }) => {
              if (debugMode) return (
                <div>
                  <ConsoleLogButton name="match.params" state={match.params} />
                  <ConsoleLogButton name="projects" state={projects} />
                  <ConsoleLogButton name="items" state={items} />
                  <ConsoleLogButton name="users" state={users} />
                  <ConsoleLogButton name="input" state={input} />
                  <ConsoleLogButton name="projectId" state={projectId} />
                  <ConsoleLogButton name="type" state={type} />
                  <ConsoleLogButton name="status" state={status} />
                  <ConsoleLogButton name="page" state={page} />
                </div>
              )
            }}
          </DebugModeContext.Consumer>

        </div>

        <div className="col-12 col-md-8">
          <div className="shadow rounded p-2 mt-2">

            <h3>Items</h3>

            {
              filteredItems.slice(page * 10, page * 10 + 10).map(item => {
                return <SearchItem key={item._id}
                  type={item.type}
                  name={item.name}
                  assignee={findAssigneeNameByAssigneeId(item.assigneeId, users)}
                  status={item.status}
                  to={`/${item.type}/${item._id}`} />
              })
            }
            <div className="py-2 d-flex justify-content-center">
              <Pagination currentPage={page}
                itemCount={filteredItems.length}
                itemsPerPage={10}
                onClick={updatePage} />
            </div>
          </div>
        </div>



      </div>
    </div>
  )
}

export default Search;