# Server API

## Authentication
  
### Login and create a valid Json Web Token 
`POST /auth` 

<details>
  <summary>Parameters in Request Body</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```email```   | The account's email  ```required``` |
  | ```password``` | The account's password ```required``` |
</details>

<details>
<summary>Response</summary>

```
200 OK  
{
  token: "Bearer2138afadfc9cve9gq0zkfeilakfoakwfo"
  isLoggedIn: true,
  user: userInfo
}
```
</details>

### Get an existing login session
`GET /auth` 

<details>
  <summary>Authorization</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | A user's valid Json Web Token |
</details>

<details>
<summary>Response</summary>

```
200 OK  
{
  isLoggedIn: true,
  user: userInfo
}
```
</details>

### Refresh a login session and the JWT token
`PATCH /auth` 

<details>
  <summary>Authorization</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | A user's valid Json Web Token |
</details>

<details>
<summary>Response</summary>

```
200 OK  
{
  user: userInfo,
  token: "Beareradawidj21314921jkanxcv92134141"
}
```
</details>

### Delete an existing login session and JWT token
`DELETE /auth` 

<details>
  <summary>Authorization</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | A user's valid Json Web Token |
</details>

<details>
<summary>Response</summary>

```202 Accepted```
</details>

---

## Users
  
### Create a user account  
`POST /users` 

<details>
  <summary>Parameters in Request Body</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```email```   | The new account's email  ```required``` |
  | ```password``` | The new account's password ```required``` |
  |   ```name```   | The new account's name ```required``` |
  |  ```myImage``` | The new account's profile image |
  |  ```major```   | The new account's major |
  |  ```house```   | The new account's house |
  |  ```floor```   | The new account's floor |
  |  ```cca``` | The new account's cca |
</details>

<details>
<summary>Response</summary>

```
201 Created  
message: "Success"
isSuccessful: true
```
</details>
  

### Get all public users
`GET /users`

<details>
  <summary>Authorization</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | A registered user's valid Json Web Token |
</details>

<details>
<summary>Response</summary>

```
200 OK
{
  users: [ infoUser1, infoUser2, ... ]
}
```
</details>
  
### Get specific user
`GET /users/:id`

<details>
  <summary>Authorization</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | A registered user's valid Json Web Token |
</details>
<details>
  <summary>Path Parameters</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```id```   | The specific user's ID |
</details>

<details>
<summary>Response</summary>

```
200 OK
{
  user: {
    _id: "1232ad5r251sda",
    name: "Specific User",
    img: "profilepic.png",
    // only public information is given
    profile: { 
      major: 
      house:
      floor:
      cca:
      year:
      bio:
      interest:
    }
  }
}
```
</details>

---

## Events

### Create an event
`POST /events`

<details>
  <summary>Authorization</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The event creator's valid Json Web Token |
</details>
<details>
  <summary>Parameters in Body</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```name```   | The new event's name  ```required``` |
  | ```eventDate``` | The new event's date ```required``` |
  |   ```ownerID```   | The event creator's userID ```required``` |
  |  ```eventImage``` | The new event's banner image |
  |  ```description```   | The new event's description |
</details>

<details>
<summary>Response</summary>

```201 Created```
</details>

### Retrieve all Events
`GET /events`

<details>
<summary>Response</summary>

```
200 OK
{
  events: [ eventInfo1, eventInfo2, ... ]
}
```
</details>

### Update an event
`PATCH /events/:id`

<details>
  <summary>Authorization</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The event owner's valid Json Web Token |
</details>
<details>
  <summary>Path Parameters</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```id```   | The event's ID |
</details>
<details>
  <summary>Parameters in Body</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```name```   | The new name of the event  |
  | ```eventDate``` | The new date of the event  |
  |  ```eventImage``` | The new event image of the event |
  |  ```description```   | The new event description of the event |
</details>

<details>
<summary>Response</summary>

```200 OK```
</details>

### Delete an event
`DELETE /events/:id`

<details>
  <summary>Authorization</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The event owner's valid Json Web Token |
</details>
<details>
  <summary>Path Parameters</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```id```   | The event's ID |
</details>

<details>
<summary>Response</summary>

```200 OK```
</details>

### Get a user's registered/owned events
`GET /events/user/:id`

<details>
  <summary>Authorization</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The query user's valid Json Web Token |
</details>
<details>
  <summary>Path Parameters</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```id```   | The user's ID |
</details>

<details>
<summary>Response</summary>

```
200 OK
{
  events: [ eventInfo1, eventInfo2, ...]
}
```
</details>

### Register a user for an event
`POST /events/:eventID/:userID`

<details>
  <summary>Authorization</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The registering user's valid Json Web Token |
</details>
<details>
  <summary>Path Parameters</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```eventID```   | The event's ID |
  |  ```userID```    | The user's ID  |
</details>

<details>
<summary>Response</summary>

```200 OK```
</details>

### Unregistering a user for an event
`DELETE /events/:eventID/:userID`

<details>
  <summary>Authorization</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The unregistering user's valid Json Web Token |
</details>
<details>
  <summary>Path Parameters</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```eventID```   | The event's ID |
  |   ```userID```   | The user's ID |
</details>

<details>
<summary>Response</summary>

```200 OK```
</details>

---

## Chatbox

### Creates a new message in a new conversation
`POST /chatbox/convo`

<details>
  <summary>Authorization</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The message sending user's valid Json Web Token |
</details>
<details>
  <summary>Parameters in Body</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```senderID```   | The user id of the message sender ```required``` |
  | ```targetID``` | The user id of the person receiving the message ```required``` |
  |  ```message``` | The message content ```required``` |
</details>

<details>
<summary>Response</summary>

```
201 Created
{
  convoID: "12312dad24255asda"
}
```
</details>

### Creates a new message in an existing conversation
`POST /chatbox/convo/:convoID`

<details>
  <summary>Authorization</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The message sending user's valid Json Web Token |
</details>
<details>
  <summary>Path Parameters</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```convoID```   | The convo's ID |
</details>
<details>
  <summary>Parameters in Body</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```senderID```   | The user id of the message sender ```required``` |
  | ```targetID``` | The user id of the person receiving the message ```required``` |
  |  ```message``` | The message content ```required``` |
</details>

<details>
<summary>Response</summary>

```201 Created```
</details>

### Get a user's convos
`POST /chatbox/user/:userID`

<details>
  <summary>Authorization</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The query user's valid Json Web Token |
</details>
<details>
  <summary>Path Parameters</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```userID```   | The query user's ID |
</details>

<details>
<summary>Response</summary>

```
200 OK
{
  convos: [ convo1, convo2, ...]
}
```
</details>

### Retrieve two user's convo
`GET /chatbox/user/:user1ID/:user2ID`

<details>
  <summary>Authorization</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The one of the query user's valid Json Web Token |
</details>
<details>
  <summary>Path Parameters</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```user1ID```   | The query user's ID |
  |  ```user2ID```   | The other query user's ID |
</details>

<details>
<summary>Response</summary>

```
200 OK
convoID: "123134adfaf4424"

// This will appear if the two users do not have a convo
err: "No Convo found"
```
</details>

### Retrieve an event's convo
`GET /chatbox/event/:eventID`

<details>
  <summary>Path Parameters</summary>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```eventID```   | The query event ID |
</details>

<details>
<summary>Response</summary>

```
200 OK
convoID: "123134adfaf4424"
```
</details>