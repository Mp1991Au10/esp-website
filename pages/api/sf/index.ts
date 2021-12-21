import jsforce from 'jsforce';
import { NextApiRequest, NextApiResponse } from 'next';
import { RecordTypeMap, RequestBody } from '../../../types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const { last_name: LastName, email: Email, company: Company, recordTypeFlag }: RequestBody = body;
  const {
    SF_CLIENT_ID,
    SF_CLIENT_SECRET,
    SF_REDIRECT_URL,
    SF_INSTANCE_URL,
    SF_ACCESS_TOKEN,
    SF_REFRESH_TOKEN,
    SF_RECORD_TYPE_ALPHA,
    SF_RECORD_TYPE_BETA
  } = process.env;

  const recordTypeMap: RecordTypeMap = {
    alpha: SF_RECORD_TYPE_ALPHA!,
    beta: SF_RECORD_TYPE_BETA!
  };
  const RecordTypeId = recordTypeMap[recordTypeFlag];

  const conn = new jsforce.Connection({
    oauth2: {
      clientId: SF_CLIENT_ID,
      clientSecret: SF_CLIENT_SECRET,
      redirectUri: SF_REDIRECT_URL
    },
    instanceUrl: SF_INSTANCE_URL,
    accessToken: SF_ACCESS_TOKEN,
    // if refresh token is provided, the connection will automatically refresh the access token when it has expired
    refreshToken: SF_REFRESH_TOKEN
  });

  conn.on('refresh', function (accessToken, res) {
    console.log('Access token refreshed');
    console.log({ accessToken });
    // Refresh event will be fired when renewed access token
    // to store it in your storage for next request
  });

  // Single Lead record creation
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
        return res.status(400).json({ status: 'fail' });
      }
      console.log('SUCCESS!');
      return res.status(200).json({ status: 'ok' });
    }
  );
}
