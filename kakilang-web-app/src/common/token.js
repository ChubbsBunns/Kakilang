/**
 * Set Authentication Token
 *
 * @param token Optional parameter to type in token manually,
 * retrives the locastorage token automatically otherwise.
 * @returns the headers with the token set for authorization
 */
function setAuthToken(token = false) {
  return {
    headers: {
      "x-access-token": token || localStorage.getItem("token"),
    },
  };
}

export default setAuthToken;
