import { Entity } from "../utils";

export interface TableInfo {
  name: string;
  resourceTable: string;
  tablePathName: string;
}

export interface GetAllTableEntities {
  table: TableInfo
}

export interface CreateEntity {
  entity: Entity;
  table: TableInfo;
}

export interface UpdateEntityById {
  id: number
  entity: Entity;
  table: TableInfo;
}

export interface DelereEntityById {
  id: number
  table: TableInfo;
}