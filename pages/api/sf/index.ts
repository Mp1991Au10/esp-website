import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const cors = Cors({
  methods: ['HEAD', 'POST'],
  origin: '*'
});

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
  await runMiddleware(req, res, cors);

  // Rest of the API logic
  const { body } = req;
  const { oid, retURL, first_name, email, company, description, _00N5J000000QWsP } =
    JSON.parse(body);

  const QUERY_PARAMS = `&oid=${oid}&retURL=${retURL}&first_name=${first_name}&email=${email}&company=${company}&00N5J000000QWsP=${_00N5J000000QWsP}&description=${description}`;

  console.log({ QUERY_PARAMS });

  return fetch(`${process.env.WEB_TO_LEAD_BASE_URL}${QUERY_PARAMS}`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    mode: 'no-cors',
    body
  })
    .then(_ => {
      res.status(200).json({ status: 'ok' });
    })
    .catch(console.error);
}
