import {
  api,
  CreateEntity,
  DelereEntityById,
  GetAllTableEntities,
  TableInfo,
  UpdateEntityById,
} from ".";
import { Entity, responseToApiResponse } from "../utils";

export interface ApiResponse<T> {
  data: T;
  meta: {
    status: number;
  };
}

interface ApiClient {
  findAllTablesInfo: () => Promise<ApiResponse<TableInfo[]>>;
  getAll: (
    params: GetAllTableEntities,
  ) => Promise<ApiResponse<Entity>>;
  create: (params: CreateEntity) => Promise<ApiResponse<any>>;
  update: (params: UpdateEntityById) => Promise<ApiResponse<any>>;
  delete: (params: DelereEntityById) => Promise<ApiResponse<any>>;
}

const get = { method: "GET" };

const post = (body?: any) => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const apiClient: ApiClient = {
  findAllTablesInfo: async () =>
    fetch(api.urlForAllTablesInfo(), get)
      .then(responseToApiResponse),
  getAll: async (params) =>
    fetch(api.urlForTableContent(params), get)
      .then(responseToApiResponse),
  create: async (params) =>
    fetch(api.urlForCreateEntity(params), post(params.entity))
      .then(responseToApiResponse),
  update: async (params) =>
    fetch(api.urlForUpdateEntity(params), post(params.entity))
      .then(responseToApiResponse),
  delete: async (params) =>
    fetch(api.urlForDeleteEntity(params), post())
      .then(responseToApiResponse),
};
