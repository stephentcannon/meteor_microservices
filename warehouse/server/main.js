const Products = new Mongo.Collection('products');

// seed the products colletion

Meteor.startup(() => {
  if (Products.find().count() > 100) { return }; //don't see the database if products exist

  for (let i =0; i < 10; i++){
    const available = Math.random() > 0.5;
    const title = Math.random().toString().replace('0.', '');
    console.log(title);
    Products.insert({title, available});
  }
});

Meteor.methods({
  available({ token } = {}){
    validateToken(token, 'available');
    return Products.find({available: true}).fetch();
  }
});


const validateToken = (token, methodName) =>  {
  import njwt from 'njwt';

  console.log('************');
  console.log('*** token');
  console.log(token);
  console.log('*** methodName');
  console.log(methodName);
  console.log('************');

  const { key, catalog } = Meteor.settings.jwt;

  if(!token) throw new Meteor.Error(403, 'permissionDenied', 'noToken');

  console.log('*** key');
  console.log(key);
  console.log('************');
  console.log('*** catalog');
  console.log(catalog);
  console.log('************');

  let unsealed;

  //try {
    unsealed = njwt.verify(token, key);
  // } catch (e) {
  //   console.log('************** ERROR *************');
  //   console.log(e);
  //   // throw new Meteor.Error(403, 'permissionDenied', 'invalidToken');
    
  // }

  console.log('*** unsealed');
  console.log(unsealed);
  console.log('************');

  // const { scope, subject, issuer} = unsealed.body;
  // TODO check expiratoin date and timestamp maybe 30 seconds etc...

  // if(scope !== methodName || issuer !== catalog.url subject !== catalog.subject){
  //   throw new Meteor.Error(403, 'permissionDenied', 'invalidTokenScopeIssuerSubject');
  // } 


};