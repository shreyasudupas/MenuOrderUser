import { domain,clientId,audience } from '../../auth-config.json';

export const environment = {
  production: false,
  auth:{
    domain,
    clientId,
    redirectUri: window.location.origin,
    audience

  }
};


