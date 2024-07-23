import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const client_id = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET;
const redirectURI = encodeURIComponent(
  `${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}`
);

const naverAuthHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const code = req.query.code;
  const state = req.query.state;

  if (!code || !state) {
    return res.status(400).json({ error: 'Code or state is missing' });
  }

  const api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirectURI}&code=${code}&state=${state}`;

  try {
    const response = await axios.post(api_url, null, {
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret,
      },
    });
    // console.log(response);

    const userData = await axios.get(`https://openapi.naver.com/v1/nid/me`, {
      headers: {
        Authorization: `Bearer ${response.data.access_token}`,
      },
    });

    // console.log('success get userData: ', userData);
    res.status(200).json(userData.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

export default naverAuthHandler;
