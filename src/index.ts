require('dotenv').config();
// this require is necessary for server HMR to recover from error
// tslint:disable-next-line:no-var-requires
let server: any = {};

if (module.hot) {
  module.hot.accept('./server', async () => {
    console.log('🔁  HMR Reloading `./server`...');
    try {
      server.stop();
      server = await require('./server').serve();
    } catch (error) {
      console.error(error);
    }
  });
  console.info('server HMR enabled');
}

(async () => {
  server = await require('./server').serve();
})();

export default server.http;
