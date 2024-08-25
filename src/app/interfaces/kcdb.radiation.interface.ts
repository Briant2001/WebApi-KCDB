export interface ServiciosRadiation {
  versionApiKcdb:   string;
  pageNumber:       number;
  pageSize:         number;
  numberOfElements: number;
  totalElements:    number;
  totalPages:       number;
  data:             Datum[];
  filtersList:      FiltersList[];
  aggregations:     Aggregation[];
}

export interface Aggregation {
  name:   string;
  values: string[];
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
  traceabilitySource:     string;
  comments:               null;
  groupIdentifier:        null;
  publicationDate:        Date;
  approvalDate:           Date;
  branchValue:            string;
  instrument:             string;
  instrumentMethod:       string;
  sourceValue:            string;
  mediumValue:            string;
  nuclideValue:           string;
  radiationSpecification: string;
  internationalStandard:  null;
  referenceStandard:      string;
  radiationCode:          string;
}

export interface Cmc {
  lowerLimit: number;
  upperLimit: number;
  unit:       string;
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

export interface FiltersList {
  code:     string;
  name:     string;
  count:    number;
  order:    number;
  children: FiltersList[];
}
