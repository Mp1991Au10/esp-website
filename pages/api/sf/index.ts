// import Cors from 'cors';
import jsforce from 'jsforce';
import { NextApiRequest, NextApiResponse } from 'next';

// const cors = Cors({
//   methods: ['HEAD', 'POST'],
//   origin: '*'
// });

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the middleware
  // await runMiddleware(req, res, cors);

  const { body } = req;
  const { first_name, last_name, email, company, recordType } = body;
  const {
    SF_CONNECTION_LOGIN_URL,
    SF_CONNECTION_USERNAME,
    SF_CONNECTION_PASSWORD,
    SF_CONNECTION_SECURITY_TOKEN
  } = process.env;

  const conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: SF_CONNECTION_LOGIN_URL
  });
  conn.login(
    SF_CONNECTION_USERNAME!,
    `${SF_CONNECTION_PASSWORD}${SF_CONNECTION_SECURITY_TOKEN}`,
    (err, userInfo) => {
      if (err) {
        return console.error(err);
      }
      // Now you can get the access token and instance URL information.
      // Save them to establish connection next time.
      console.log(conn.accessToken);
      console.log(conn.instanceUrl);
      // logged in user property
      console.log('User ID: ' + userInfo.id);
      console.log('Org ID: ' + userInfo.organizationId);

      // Single record creation
      conn.sobject('Lead').create(
        {
          LastName: last_name,
          Email: email,
          Company: company,
          RecordTypeId: recordType
        },
        (err, ret) => {
          if (err || !ret.success) {
            console.error({ err });
            res.status(400).json({ status: 'fail' });
          }
          console.log('SUCCESS!');
          res.status(200).json({ status: 'ok' });
        }
      );
    }
  );
}
