export enum AuthenticationExceptionCode {
  NOT_AUTHENTICATED = "ATN-001",
  METHOD_NOT_ALLOWED = "ATN-002",
  HANDLE_ACCESS_DENIED = "ATN-003",
  RESTRICTED_RESOURCE = "ATN-004",
  NOT_AUTHORIZED = "ATN-005",
  BAD_CREDENTIALS = "ATN-006",
  INACTIVE_USER = "ATN-007",
}

export enum ResourceNotFoundExceptionCode {
  RESOURCE_NOT_FOUND = "RNF-001",
}

export type ExceptionCode =
  | AuthenticationExceptionCode
  | ResourceNotFoundExceptionCode;
