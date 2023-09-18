const sdk = require('api')('@elai/v1.0#dddfvdilmgi4g14');

sdk.auth('Bearer ELAI_SECRET_KEY');
sdk.listVideos({page: '1', limit: '50'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));.