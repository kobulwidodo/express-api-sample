const apiResponse = (status, code, message, data) => {
  let response = {
    meta: {
      message: message,
      code: code,
      status: status
    },
    data: data ?? null,
  }
  return response
}

module.exports = apiResponse
