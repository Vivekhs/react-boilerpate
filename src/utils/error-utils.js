export class CustomError extends Error {
  constructor (error) {
    super()
    this.message = error.message
    this.description = error.description
  }
}

export const getError = (error) => {
  return {
    message: error.message,
    description: error.description
  }
}
