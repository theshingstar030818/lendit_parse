export type TableName = string;
export type TableNameList = TableName[];
export type TableStatus = "CREATING"|"UPDATING"|"DELETING"|"ACTIVE"|string;
export type PutItemInputAttributeMap = {[key: string]: AttributeValue};
export type Long = number;
export type MapAttributeValue = {[key: string]: AttributeValue};
export type NextTokenString = string;
export type NonKeyAttributeName = string;
export type NonKeyAttributeNameList = NonKeyAttributeName[];
export type NullAttributeValue = boolean;
export type NumberAttributeValue = string;
export type NumberSetAttributeValue = NumberAttributeValue[];
export type PositiveIntegerObject = number;
export type PositiveLongObject = number;
export type String = string;
export type StringAttributeValue = string;
export type StringSetAttributeValue = StringAttributeValue[];


export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface PutPointInput {
  RangeKeyValue: AttributeValue;
  GeoPoint: GeoPoint;
  TableName: TableName;
  Item: PutItemInputAttributeMap;
}

export interface QueryRadiusInput {
  RadiusInMeter: number;
  CenterPoint: GeoPoint;
}

export interface QueryRectangleInput {
  MinPoint: GeoPoint;
  MaxPoint: GeoPoint;
}

export interface AttributeValue {
    S?: StringAttributeValue;
    N?: NumberAttributeValue;
    SS?: StringSetAttributeValue;
    NS?: NumberSetAttributeValue;
    M?: MapAttributeValue;
    NULL?: NullAttributeValue;
  }