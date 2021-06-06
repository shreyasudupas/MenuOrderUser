import { domain,clientId,audience } from '../../auth-config.json';

export const environment = {
  production: false,
  auth:{
    domain,
    clientId,
    redirectUri: window.location.origin,
    audience

  },
  baseV1Url:"http://localhost:5000/api/v1/",
  baseV2Url:"http://localhost:5000/api/v2/"
};


