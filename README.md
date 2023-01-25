## Description

This is a simple endpoint for creating and retrieving forms.


## Getting Started

- Make sure you have [docker](https://docs.docker.com/get-docker/) and [nodejs](https://nodejs.org/en/download/) installed on your machine.
- copy the file `.env.dist` to `.env` in the same root directory

## Setup

### Local Environment setup
``` 
npm run local:db
npm run migrations:run
```

#### Running the app
``` 
npm run start:local
```

### Testing environment setup
``` 
npm run test:db
npm run test:migrations:run
```

#### Running the tests
``` 
npm run test
```

### Generate a migration
```
npm run migrations:generate
```

## Usage

### Endpoints

#### POST `/forms`
Example request: `http://127.0.0.1:3000/v1/forms/`

Payload 
```
{
    "name": "myn name",
    "email": "example@example.com",
    "phone": "123-456-789",
    "address": "random address"
}
```
Response
```
{
    "formId": "FORM-2023-451516",
    "name": "myn name",
    "email": "example@example.com",
    "phone": "123-456-789",
    "address": "random address"
}
```

#### GET `/forms/{formId}`
Example: `http://127.0.0.1:3000/v1/forms/FORM-2023-451516`
