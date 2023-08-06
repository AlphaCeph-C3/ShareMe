import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import jwt_decode from 'jwt-decode';
import { client } from '../client.js';

export const Login = () => {
  const navigate = useNavigate();

  const loginSuccess = (obj) => {
    const userInfo = jwt_decode(obj.credential);
    localStorage.setItem('user', JSON.stringify(userInfo));
    const { name, sub, picture } = userInfo;

    // creating the sanity document so that it can be stored in the database in sanity
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => navigate('/', { replace: true }));
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo" width="130px" />
          </div>
          <GoogleLogin
            size="large"
            shape="pill"
            onSuccess={(CR) => loginSuccess(CR)}
            onError={(CR) => console.log(CR)}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
