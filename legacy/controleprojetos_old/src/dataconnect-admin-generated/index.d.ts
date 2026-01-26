import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface Comment_Key {
  id: UUIDString;
  __typename?: 'Comment_Key';
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface ListProjectsData {
  projects: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & Project_Key)[];
}

export interface ListPublicProjectsData {
  projects: ({
    id: UUIDString;
    name: string;
  } & Project_Key)[];
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface Task_Key {
  id: UUIDString;
  __typename?: 'Task_Key';
}

export interface UpdateTaskStatusData {
  task_update?: Task_Key | null;
}

export interface UpdateTaskStatusVariables {
  id: UUIDString;
  status: string;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

/** Generated Node Admin SDK operation action function for the 'CreateUser' Mutation. Allow users to execute without passing in DataConnect. */
export function createUser(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateUserData>>;
/** Generated Node Admin SDK operation action function for the 'CreateUser' Mutation. Allow users to pass in custom DataConnect instances. */
export function createUser(options?: OperationOptions): Promise<ExecuteOperationResponse<CreateUserData>>;

/** Generated Node Admin SDK operation action function for the 'ListProjects' Query. Allow users to execute without passing in DataConnect. */
export function listProjects(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectsData>>;
/** Generated Node Admin SDK operation action function for the 'ListProjects' Query. Allow users to pass in custom DataConnect instances. */
export function listProjects(options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectsData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateTaskStatus' Mutation. Allow users to execute without passing in DataConnect. */
export function updateTaskStatus(dc: DataConnect, vars: UpdateTaskStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTaskStatusData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateTaskStatus' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateTaskStatus(vars: UpdateTaskStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTaskStatusData>>;

/** Generated Node Admin SDK operation action function for the 'ListPublicProjects' Query. Allow users to execute without passing in DataConnect. */
export function listPublicProjects(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListPublicProjectsData>>;
/** Generated Node Admin SDK operation action function for the 'ListPublicProjects' Query. Allow users to pass in custom DataConnect instances. */
export function listPublicProjects(options?: OperationOptions): Promise<ExecuteOperationResponse<ListPublicProjectsData>>;

