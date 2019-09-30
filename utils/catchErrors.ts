export default (error: any) => {
  let errorMsg
  if (error.response) {
    errorMsg = error.response.data
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message
    }
  } else if (error.request) {
    errorMsg = error.request
  } else {
    errorMsg = error.message
  }

  return errorMsg
}
