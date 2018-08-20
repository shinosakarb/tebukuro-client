// @flow
export default (windowObject: Object) => {
  // eslint-disable-next-line no-undef
  const searchParam = new URLSearchParams(windowObject.location.search)
  const queryStringObject =
    [...searchParam].reduce((result, query) => Object.assign(result, { [query[0]]: query[1] }), {})

  return queryStringObject
}
