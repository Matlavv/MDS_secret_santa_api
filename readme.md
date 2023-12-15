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
yarn install 
```
or if you use **npm**
```
npm install
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
yarn add --dev Jest 
```
or if you use **npm**
```
npm install --dev Jest
```

To run tests 

```
yarn test 
```
or if you use **npm**
```
npm test
```

### To access the API documentation go on the navigator and go to : [localhost:3000/api-docs](http://localhost:3000/api-docs/)


# How to exploit frontend ?

## Install the dependencies

```
cd frontend
```

```
yarn install 
```
or if you use **npm**
```
npm install
```

Then start the server 
```
yarn run dev 
```
or if you use **npm**
```
npm run dev
```




