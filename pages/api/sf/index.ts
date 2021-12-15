import jsforce from 'jsforce';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const { last_name: LastName, email: Email, company: Company, recordType: RecordTypeId } = body;
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
          // LastName is the only required field by SF
          LastName,
          Email,
          Company,
          RecordTypeId
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
