Meteor Webservices
==================

https://meetups.meteor.com/meetings/virtual/zeuSbiNPdDv2rSF8u


1.  Create project with meteor create --bare mymicroservice

2.  Go to .meteor/packages and remove unnecssary packages.  This is what it should look like.

meteor-base@1.5.1             # Packages every Meteor app needs to have
mongo@1.14.6                   # The database Meteor supports right now
standard-minifier-js@2.8.0    # JS minifier run for production mode
ecmascript@0.16.2              # Enable ECMAScript2015+ syntax in app code


Don't need typescript unless writing it in typescript

3.  Add JWT - Java Web Token library
meteor npm install --save njwt

4.  Create a folder /server in the project and add main.js to the directory.

5.  In package.json at a meteor entry point.

"meteor": {
    "mainModule": {
      "server": "server/main.js"
    }
  }

6.  In the /catalog directory create a file settings.json for the url, port, jwt.key, 

TODO: seperate port from url maybe.

TODO: What would be the best JWT encryption?

{
  "warehouse": {
    "url": "localhost:4000"
  },
  "jwt": {
    "key": "0123456789",
    "sub": "services/catalog"
  }
}

and in the /server directory create a file settings.json 


{
  "jwt": {
    "key": "0123456789",
    "catalog": {
      "url": "http://localhost:3000",
      "sub": "services/catalog"
    }
  }
}


The keys must match.

7.  Start the services

/catalog$ meteor --settings=settings.json

/warehouse$ meteor --port=4000 --settings=settings.json

8.  Connect the catalog to the warehouse from the catalog/server/main.js

See file for source code.

When connected need to do method calls.

See warehouse/server/main.js



