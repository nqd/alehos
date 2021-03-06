module.exports = {
  // namespaces
  NAMESPACE_CONTROL: 'Alexa.ConnectedHome.Control',
  NAMESPACE_QUERY: 'Alexa.ConnectedHome.Query',
  NAMESPACE_DISCOVERY: 'Alexa.ConnectedHome.Discovery',
  NAMESPACE_SYSTEM: 'Alexa.ConnectedHome.System',

  // discovery
  REQUEST_DISCOVER: 'DiscoverAppliancesRequest',
  RESPONSE_DISCOVER: 'DiscoverAppliancesResponse',

  // control on/off
  REQUEST_TURN_ON: 'TurnOnRequest',
  RESPONSE_TURN_ON: 'TurnOnConfirmation',
  REQUEST_TURN_OFF: 'TurnOffRequest',
  RESPONSE_TURN_OFF: 'TurnOffConfirmation',

  // control percentage
  REQUEST_SET_PERCENTAGE: 'SetPercentageRequest',
  RESPONSE_SET_PERCENTAGE: 'SetPercentageConfirmation',
  REQUEST_INC_PERCENTAGE: 'IncrementPercentageRequest',
  RESPONSE_INC_PERCENTAGE: 'IncrementPercentageConfirmation',
  REQUEST_DEC_PERCENTAGE: 'DecrementPercentageRequest',
  RESPONSE_DEC_PERCENTAGE: 'DecrementPercentageConfirmation',

  // control thermostat
  REQUEST_SET_TEMPERATURE: 'SetTargetTemperatureRequest',
  RESPONSE_SET_TEMPERATURE: 'SetTargetTemperatureConfirmation',
  REQUEST_INC_TEMPERATURE: 'IncrementTargetTemperatureRequest',
  RESPONSE_INC_TEMPERATURE: 'IncrementTargetTemperatureConfirmation',
  REQUEST_DEC_TEMPERATURE: 'DecrementTargetTemperatureRequest',
  RESPONSE_DEC_TEMPERATURE: 'DecrementTargetTemperatureConfirmation',
  REQUEST_GET_TEMPERATURE_READING: 'GetTemperatureReadingRequest',
  RESPONSE_GET_TEMPERATURE_READING: 'GetTemperatureReadingResponse',
  REQUEST_GET_TARGET_TEMPERATURE: 'GetTargetTemperatureRequest',
  RESPONSE_GET_TARGET_TEMPERATURE: 'GetTargetTemperatureResponse',

  // door lock
  REQUEST_GET_LOCK_STATE: 'GetLockStateRequest',
  RESPONSE_GET_LOCK_STATE: 'GetLockStateResponse',
  REQUEST_SET_LOCK_STATE: 'SetLockStateRequest',
  RESPONSE_SET_LOCK_STATE: 'SetLockStateConfirmation',

  // healthcheck
  REQUEST_HEALTHCHECK: 'HealthCheckRequest',
  RESPONSE_HEALTHCHECK: 'HealthCheckResponse',

  // color
  REQUEST_SET_COLOR: 'SetColorRequest',
  RESPONSE_SET_COLOR: 'SetColorConfirmation',
  REQUEST_SET_COLOR_TEMPERATURE: 'SetColorTemperatureRequest',
  RESPONSE_SET_COLOR_TEMPERATURE: 'SetColorTemperatureConfirmation',
  REQUEST_INC_COLOR_TEMPERATURE: 'IncrementColorTemperatureRequest',
  RESPONSE_INC_COLOR_TEMPERATURE: 'IncrementColorTemperatureConfirmation',
  REQUEST_DEC_COLOR_TEMPERATURE: 'DecrementColorTemperatureRequest',
  RESPONSE_DEC_COLOR_TEMPERATURE: 'DecrementColorTemperatureConfirmation',

  // camera
  REQUEST_RETRIEVE_CAMERA_STREAM_URI: 'RetrieveCameraStreamUriRequest',
  RESPONSE_RETRIEVE_CAMERA_STREAM_URI: 'RetrieveCameraStreamUriResponse',

  // errors
  ERROR_UNSUPPORTED_OPERATION: 'UnsupportedOperationError',
  ERROR_UNEXPECTED_INFO: 'UnexpectedInformationReceivedError',
  ERROR_TARGET_OFFLINE: 'TargetOfflineError',
  ERROR_VALUE_OUT_OF_RANGE: 'ValueOutOfRangeError',
  ERROR_DRIVER_INTERNAL: 'DriverInternalError',
  ERROR_BATTERY_LEVEL_TOO_LOW: 'BatteryLevelTooLowError',
  ERROR_OPERATION_NOT_ALLOWED: 'OperationNotAllowedForUserError',
  ERROR_TARGET_NOT_PROVISIONED: 'TargetNotProvisionedError'
}
