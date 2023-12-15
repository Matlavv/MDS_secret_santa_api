# How to exploit the code ?

Download zip the repository **OR**
```
git clone git@github.com:Matlavv/MDS_secret_santa_api.git
```

```
cd MDS_secret_santa_api
cd backend
```

### Install all the dependencies 
```
yarn install / npm install
```

## Start the server and use the API
```
node app.js
```

Rename the *.env.sample* file into *.env* and insert your KEY into it
```
JWT_KEY=
JWT_KEY_INVITATION=
```
Test are done with **Jest**
```
yarn add --dev Jest or npm install --dev Jest
yarn test / npm test
```

### To access the API documentation go on the navigator and go to : [localhost:3000/api-docs](http://localhost:3000/api-docs/)







