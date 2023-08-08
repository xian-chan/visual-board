export interface Root {
  chinaTotal: ChinaTotal;
  chinaDayList: ChinaDayList[];
  lastUpdateTime: string;
  overseaLastUpdateTime: string;
  areaTree: AreaTree[];
}

export interface ChinaTotal {
  today: Today;
  total: Total;
  extData: ExtData;
}

export interface Today {
  confirm: number;
  suspect: any;
  heal: number;
  dead: number;
  severe: any;
  storeConfirm: number;
  input: number;
}

export interface Total {
  confirm: number;
  suspect: number;
  heal: number;
  dead: number;
  severe: number;
  input: number;
}

export interface ExtData {
  noSymptom: number;
  incrNoSymptom: number;
}

export interface ChinaDayList {
  date: string;
  today: Today2;
  total: Total2;
  extData: any;
  lastUpdateTime: any;
}

export interface Today2 {
  confirm: number;
  suspect: number;
  heal: number;
  dead: number;
  severe: number;
  storeConfirm: any;
  input?: number;
}

export interface Total2 {
  confirm: number;
  suspect: number;
  heal: number;
  dead: number;
  severe: number;
  input: number;
}

export interface AreaTree {
  today: Today3;
  total: Total3;
  extData: ExtData2;
  name: string;
  id: string;
  lastUpdateTime: string;
  children: Children[];
}

export interface Today3 {
  confirm?: number;
  suspect?: number;
  heal?: number;
  dead?: number;
  severe?: number;
  storeConfirm?: number;
  input?: number;
}

export interface Total3 {
  confirm: number;
  suspect: number;
  heal: number;
  dead: number;
  severe: number;
  input?: number;
}

export interface ExtData2 {
  noSymptom?: number;
  incrNoSymptom?: number;
}

export interface Children {
  today: Today4;
  total: Total4;
  extData: ExtData3;
  name: string;
  id: string;
  lastUpdateTime: string;
  children: Children2[];
}

export interface Today4 {
  confirm: number;
  suspect?: number;
  heal: number;
  dead: number;
  severe?: number;
  storeConfirm?: number;
  input?: number;
}

export interface Total4 {
  confirm: number;
  suspect: number;
  heal: number;
  dead: number;
  severe: number;
  input: number;
  newConfirm?: number;
  newDead?: number;
  newHeal?: number;
}

export interface ExtData3 {}

export interface Children2 {
  today: Today5;
  total: Total5;
  extData: ExtData4;
  name: string;
  id: string;
  lastUpdateTime: string;
  children: any[];
}

export interface Today5 {
  confirm: number;
  suspect?: number;
  heal?: number;
  dead?: number;
  severe?: number;
  storeConfirm: any;
}

export interface Total5 {
  confirm: number;
  suspect: number;
  heal: number;
  dead: number;
  severe: number;
  newConfirm?: number;
  newDead?: number;
  newHeal?: number;
}

export interface ExtData4 {}
