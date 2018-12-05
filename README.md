## xara-test-1

start the microservice with: **npm start**
run the test suite with: **npm test**

### Mongo DB Configuration
* For production environment:
  Database: **Business**
  Collection: **companies**
* For testing environment:
   Database: **BusinessTest**
  Collection: **companies**

### Endpoints

#### POST /api/company
Create a new company. Example post request body:
```javascript
{
  "displayName": "Xara",
  "workspaces": [
    {
      "displayName": "XaraLondon",
      "users": [
        {"email": "harris.jedakis@gmail.com", "role": "admin"},
        {"email": "har_manis@hotmail.com", "role": "basic"}
      ]
    },
    {
      "displayName": "XaraBerlin",
      "users": [
        {"email": "harris.jedakis@gmail.com", "role": "admin"},
        {"email": "har_manis@hotmail.com", "role": "basic"}
      ]
    }
  ]
}
```

##### PATCH /api/company/:companyId
Update an existing company. Example patch request body:
```javascript
{
  "displayName": "Xara",
  "workspaces": [
    {
      "displayName": "XaraLondonNew",
      "users": [
        {"email": "harris.jedakis@gmail.com", "role": "admin"},
      ]
    },
    {
      "displayName": "XaraBerlinOld",
      "users": [
        {"email": "harris.jedakis@gmail.com", "role": "admin"},
        {"email": "har_manis@hotmail.com", "role": "basic"},
        {"email": "john.doe@yahoo.com", "role": "basic"}
      ]
    }
  ]
}
```

##### POST /api/workspace/:companyName
Create a workspace within a specific company. Example post request body:
```javascript
{
  "displayName": "XaraAthens",
  "users": [
	{"email": "john.doe@hotmail.com", "role": "admin"},
	{"email": "har_manis@hotmail.com", "role": "basic"}
  ]
}
```

##### PATCH /api/workspace/:companyName
Update a specific workspace within a specific company. Example patch request body:
```javascript
{
  "id": "b8e6b760-f75c-11e8-a201-93dd10335524",
  "displayName": "XaraAthensNew",
  "users": [
	{"email": "john.doe@hotmail.com", "role": "admin"},
  ]
}
```

##### POST /api/user/:companyName
Create a new user to a specific workspace in a company. Example post request body:
```javascript
{
  "workspaceName": "xaraathens",
  "user": 
  {
	"email": "charidimos.tzedakis@gmail.com", 
	"role": "admin"
  }
}
```

##### DELETE /api/user/:companyName
Remove a user from a specific workspace within a company. Example delete reqest body:
```javascript
{
  "workspaceName": "xaraathens",
  "userEmail": "charidimos.tzedakis@gmail.com"
}
```