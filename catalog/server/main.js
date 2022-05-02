import { DDP } from 'meteor/ddp-client';

const { warehouse } = Meteor.settings;

Meteor.startup(() => {
  const connection = DDP.connect(warehouse.url, {
    onConnected: async () => {
      console.log('connected to ', warehouse.url);
      const token = '123';
      connection.call('available', { token }, (err, res) => {
        if (err) console.error(err);
        console.log('available', res);
      });
    }
  });
});
