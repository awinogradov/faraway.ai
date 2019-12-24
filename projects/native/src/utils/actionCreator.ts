function inferLiteral<T extends string>(arg: T): T {
  return arg;
}

export function createAction<T extends string, P>(type: T, payload: P) {
  return {
    type: inferLiteral(type),
    payload,
  };
}

export function createEmptyAction<T extends string>(type: T) {
  return {
    type: inferLiteral(type),
  };
}
