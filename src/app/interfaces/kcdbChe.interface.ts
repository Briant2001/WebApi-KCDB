export interface Chembio {
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
  status:                 Status;
  statusDate:             Date;
  kcdbCode:               string;
  domainCode:             DomainCode;
  metrologyAreaLabel:     MetrologyAreaLabel;
  rmo:                    Rmo;
  countryValue:           CountryValue;
  nmiCode:                NMICode;
  nmiName:                NMIName;
  nmiServiceCode:         string;
  nmiServiceLink:         null;
  quantityValue:          QuantityValue;
  cmc:                    Cmc;
  cmcUncertainty:         Cmc;
  cmcBaseUnit:            Cmc;
  cmcUncertaintyBaseUnit: Cmc;
  confidenceLevel:        number;
  coverageFactor:         number;
  uncertaintyEquation:    UncertaintyEquation;
  uncertaintyTable:       UncertaintyTable;
  uncertaintyMode:        UncertaintyMode;
  traceabilitySource:     null;
  comments:               string;
  groupIdentifier:        null;
  publicationDate:        Date;
  approvalDate:           Date;
  uncertaintyConvention:  UncertaintyConvention;
  categoryValue:          string;
  subCategoryValue:       string;
  analyteMatrix:          string;
  analyteValue:           null | string;
  crm:                    Cmc;
  crmUncertainty:         Cmc;
  mechanism:              string;
  crmConfidenceLevel:     number | null;
  crmCoverageFactor:      number | null;
  crmUncertaintyEquation: UncertaintyEquation;
  crmUncertaintyTable:    UncertaintyTable;
  crmUncertaintyMode:     UncertaintyMode;
  measurmentTechnique:    null;
}

export interface Cmc {
  lowerLimit: number | null;
  upperLimit: number | null;
  unit:       string ;
}

export enum CountryValue {
  Mexico = "Mexico",
}

export interface UncertaintyEquation {
  equation:        string;
  equationComment: string;
}

export enum UncertaintyMode {
  Absolute = "Absolute",
  Relative = "Relative",
}

export interface UncertaintyTable {
  tableName:     string;
  tableRows:     number;
  tableCols:     number;
  tableComment:  string;
  tableContents: TableContents;
}

export enum TableContents {
  Masked = "<masked>",
}

export enum DomainCode {
  ChemBio = "CHEM-BIO",
}

export enum MetrologyAreaLabel {
  Qm = "QM",
}

export enum NMICode {
  Cenam = "CENAM",
}

export enum NMIName {
  CentroNacionalDeMetrologia = "Centro Nacional de Metrologia",
}

export enum QuantityValue {
  AmountOfSubstanceContent = "Amount-of-substance content",
  MassConcentration = "Mass concentration",
  MassFraction = "Mass fraction",
  PH = "pH",
}

export enum Rmo {
  Sim = "SIM",
}

export enum Status {
  Published = "Published",
}

export enum UncertaintyConvention {
  One = "One",
  Two = "Two",
}


export interface CategoriasChemBio {
  referenceData: ReferenceDatum[];
}

export interface ReferenceDatum {
  id:    number;
  label: string;
  value: string;
}


export interface DataAnalitos {
  referenceData: ReferenceDatum[];
}

export interface ReferenceDatum {
  id:    number;
  label: string;
  value: string;
}




