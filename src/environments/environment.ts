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
  baseV2Url:"http://localhost:5000/api/v2/",
  userAPI:"https://localhost:44326/api/gateway/user/",
  menuAPI:"https://localhost:44326/api/gateway/inventory/menu/",
  vendorAPI:"https://localhost:44326/api/gateway/inventory/vendor/",
  basketAPI:"https://localhost:44326/api/gateway/basketservice/"
};


