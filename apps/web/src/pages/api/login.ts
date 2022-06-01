// ./pages/api/login
import { NextApiHandler } from 'next';
import { setAuthCookies } from 'next-firebase-auth';
import { initAuth } from '../../config/auth'; // the module you created above

initAuth();

const handler: NextApiHandler = async (req, res) => {
  try {
    await setAuthCookies(req, res);
  } catch (e) {
    return res.status(500).json({ error: 'Unexpected error.' });
  }
  return res.status(200).json({ success: true });
};

export default handler;
