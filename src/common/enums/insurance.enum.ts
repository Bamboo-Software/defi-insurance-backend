export enum InsuredRiskTypeEnum {
  RAINFALL = 'rainfall',
  DROUGHT = 'drought',
  FLOOD = 'flood',
  STORM = 'storm',
}

export enum TriggerConditionEnum {
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  GREATER_THAN_OR_EQUAL = 'greater_than_or_equal',
  LESS_THAN_OR_EQUAL = 'less_than_or_equal',
  EQUAL = 'equal',
  NOT_EQUAL = 'not_equal',
}

export enum TriggerMetricEnum {
  RAIN_INTENSITY = 'rainIntensity',
  TEMPERATURE = 'temperature',
  HUMIDITY = 'humidity',
  WIND_SPEED = 'windSpeed',
  WATER_LEVEL = 'waterLevel',
}
