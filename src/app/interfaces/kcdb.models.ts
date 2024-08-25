export interface Domains {
  domains: Domain[];
}

export interface Domain {
  code: string;
  name: string;
}


export interface MetrologyArea {
  referenceData: ReferenceDatum[];
}

export interface ReferenceDatum {
  id:    number;
  label: string;
  value: string;
}


export interface Branchs {
  referenceData: ReferenceDatum[];
}

export interface ReferenceDatum {
  id:    number;
  label: string;
  value: string;
}


export interface ServiceA {
  referenceData: ReferenceDatum[];
}

export interface ReferenceDatum {
  id:    number;
  label: string;
  value: string;
}



export interface Servicio {
  versionApiKcdb:   string;
  pageNumber:       number;
  pageSize:         number;
  numberOfElements: number;
  totalElements:    number;
  totalPages:       number;
  data:             Datum[];
}

export interface Datum {
  id:                     number;
  status:                 string;
  statusDate:             Date;
  kcdbCode:               string;
  domainCode:             string;
  metrologyAreaLabel:     string;
  rmo:                    string;
  countryValue:           string;
  nmiCode:                string;
  nmiName:                string;
  nmiServiceCode:         string;
  nmiServiceLink:         null;
  quantityValue:          string;
  cmc:                    Cmc;
  cmcUncertainty:         Cmc;
  cmcBaseUnit:            Cmc;
  cmcUncertaintyBaseUnit: Cmc;
  confidenceLevel:        number;
  coverageFactor:         number;
  uncertaintyEquation:    UncertaintyEquation;
  uncertaintyTable:       UncertaintyTable;
  uncertaintyMode:        string;
  traceabilitySource:     null;
  comments:               string;
  groupIdentifier:        null;
  publicationDate:        Date;
  approvalDate:           Date;
  internationalStandard:  null;
  branchValue:            string;
  serviceValue:           string;
  subServiceValue:        string;
  individualServiceValue: string;
  instrument:             string;
  instrumentMethod:       string;
  parameters:             Parameter[];
}

export interface Cmc {
  lowerLimit: number | null;
  upperLimit: number | null;
  unit:       string;
}

export interface Parameter {
  parameterName:  string;
  parameterValue: string;
}

export interface UncertaintyEquation {
  equation:        string;
  equationComment: string;
}

export interface UncertaintyTable {
  tableName:     string;
  tableRows:     number;
  tableCols:     number;
  tableComment:  string;
  tableContents: string;
}



export interface QuickSearch {
  versionApiKcdb:   string;
  pageNumber:       number;
  pageSize:         number;
  numberOfElements: number;
  totalElements:    number;
  totalPages:       number;
  data:             any[];
  filtersList:      FiltersList[];
  aggregations:     Aggregation[];
}

export interface Aggregation {
  name:   string;
  values: string[];
}

export interface FiltersList {
  code:     string;
  name:     string;
  count:    number;
  order:    number;
  children: FiltersList[];
}
