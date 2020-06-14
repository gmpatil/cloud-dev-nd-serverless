// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'vw9tbls8yj'
//export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`
//export const apiEndpoint = `http://localhost:3000/test`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-529-qpik.auth0.com',            // Auth0 domain
  clientId: 'S4IXPjfO56QjSXpEOkUVg9ICqFIvsUY0',          // Auth0 client id
  callbackUrl: 'http://localhost:5000/callback'
}
