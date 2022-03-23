import { clientRoot,clientId,idpAuthority,scope } from '../../auth-config.json';

export const environment = {
  production: false,
  auth:{
    clientRoot,
    clientId,
    redirectUri: window.location.origin,
    idpAuthority,
    scope

  },
  idsConfig:{
    imageServerPath:'https://localhost:5005/images/'
  }
  ,
  baseV1Url:"http://localhost:5000/api/v1/",
  baseV2Url:"http://localhost:5000/api/v2/",
  userAPI:"https://localhost:5000/api/gateway/user/",
  menuAPI:"https://localhost:5000/api/gateway/inventory/menu/",
  vendorAPI:"https://localhost:5000/api/gateway/inventory/vendor/",
  basketAPI:"https://localhost:5000/api/gateway/basketservice/",
  orderAPI:"https://localhost:5000/api/gateway/orders/",
  cartInfoAPI:"https://localhost:5000/api/gateway/cart-information/",
  vendorConfigAPI:"https://localhost:5000/api/gateway/cart-configuration/",
  IDSUserAPI:"https://localhost:5005/api/v1/User/"
};


