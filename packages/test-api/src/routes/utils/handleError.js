export const handleError = (error) => {
  let errMsg = error;
  if (error.code === 11000) {
    errMsg = `${Object.keys(error.keyValue)[0]} already exists.`;
  }
  return errMsg;
} 