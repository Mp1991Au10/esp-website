export interface RequestBody {
  last_name: string;
  email: string;
  company: string;
  recordTypeFlag: RecordTypeFlag;
}

export interface RecordTypeMap {
  alpha: string;
  beta: string;
}

export type RecordTypeFlag = keyof RecordTypeMap;
