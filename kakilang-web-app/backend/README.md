<img 
src=https://user-images.githubusercontent.com/60569243/174790428-353a87a6-3844-4ff9-8f43-82dea1767697.png height=300px 
alt="Image of NodeJS Black" />

NodeJS is used to create an asynchronous server environment that is able to handle multiple requests server-side.  
As NodeJS is an active and popular open-source project, it is free and works with multiple other modules.
This gives the server greater functionality and makes code more maintainable.
  
Currently, our project uses these modules to supplement NodeJS server functions:
- Axios (Internal Access Verification)
- Bcrypt (Server-side Password Hashing)
- CORS (Access-Control-Allow-Origin)
- ExpressJS (Manages Server Routes)
- http (Low Latency Connection)
- JsonWebToken (Server-side Token Verification)
- Mongoose (Connection to MongoDB)
- Multer (Image Storing for MongoDB)
- Socket.IO (Web Socket Implementation)

Generally, the server and the modules interact in this way (as of 17/06/2022):
![Server Interactions](https://user-images.githubusercontent.com/55905659/174273680-7b7ce02a-3828-4947-ac6e-8c20c68d7bf3.png)

# Server API

## Authentication
  
<details>
<summary> <h3>Login and create a valid Json Web Token</h3> </summary>
  
<h3><code>POST /auth</code></h3>  

<u>Parameters in Request Body</u>

  |  param   | Description |
  | -------  | ----------- |
  |  ```email```   | The account's email  ```required``` |
  | ```password``` | The account's password ```required``` |
  
<u>Response</u>
```
200 OK  
{
  token: "Bearer2138afadfc9cve9gq0zkfeilakfoakwfo"
  isLoggedIn: true,
  user: userInfo
}
```
</details>

<details>
<summary> <h3>Get an existing login session</h3> </summary>

<h3><code>GET /auth</code></h3> 

<u>Authorization</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | A user's valid Json Web Token |  


<u>Response</u>
```
200 OK  
{
  isLoggedIn: true,
  user: userInfo
}
```
</details>

<details>
<summary> <h3> Refresh a login session and the JWT token </h3> </summary>
<h3><code>PATCH /auth</code></h3> 

<u>Authorization</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | A user's valid Json Web Token |

<u>Response</u>
```
200 OK  
{
  user: userInfo,
  token: "Beareradawidj21314921jkanxcv92134141"
}
```
</details>

<details>
<summary> <h3>Delete an existing login session and JWT token</h3> </summary>
<h3><code>DELETE /auth</code></h3>

<u>Authorization</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | A user's valid Json Web Token |
  
<u>Response</u>

```202 Accepted```
</details>


---

## Users
  
<details>
<summary> <h3>Create a user account </h3></summary>
<h3><code>POST /users</code></h3>

<u>Parameters in Request Body</u>
  
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

<u>Response</u>

```
201 Created  
message: "Success"
isSuccessful: true
```
</details>
  

<details>
<summary> <h3>Get all public users</h3> </summary>
<h3><code>GET /users</code></h3>

<u>Authorization</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | A registered user's valid Json Web Token |
  
<u>Response</summary>

```
200 OK
{
  users: [ infoUser1, infoUser2, ... ]
}
```
</details>
  
<details>
<summary> <h3>Get specific user</h3></summary>
<h3><code>GET /users/:id</code></h3>

<u>Authorization</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | A registered user's valid Json Web Token |
  
<u>Path Parameters</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```id```   | The specific user's ID |
  
<u>Response</u>
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

<details>
<summary> <h3>Create an event</h3></summary>
<h3><code>POST /events</code></h3>

<u>Authorization</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The event creator's valid Json Web Token |

<u>Parameters in Body</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```name```   | The new event's name  ```required``` |
  | ```eventDate``` | The new event's date ```required``` |
  |   ```ownerID```   | The event creator's userID ```required``` |
  |  ```eventImage``` | The new event's banner image |
  |  ```description```   | The new event's description |


<u>Response</u>
```201 Created```
</details>

<details>
<summary> <h3> Retrieve all Events </h3> </summary>
<h3><code>GET /events</code></h3>

<u>Response</u>
```
200 OK
{
  events: [ eventInfo1, eventInfo2, ... ]
}
```
</details>

<details>
<summary> <h3>Update an event</h3></summary>
<h3><code>PATCH /events/:id</code></h3>

<u>Authorization</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The event owner's valid Json Web Token |


<u>Path Parameters</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```id```   | The event's ID |

<u>Parameters in Body</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```name```   | The new name of the event  |
  | ```eventDate``` | The new date of the event  |
  |  ```eventImage``` | The new event image of the event |
  |  ```description```   | The new event description of the event |


<u>Response</u>

```200 OK```
</details>

<details>
<summary> <h3> Delete an event </h3> </summary>
<h3><code>DELETE /events/:id</code></h3>

<u>Authorization</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The event owner's valid Json Web Token |

<u>Path Parameters</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```id```   | The event's ID |

<u>Response</u>

```200 OK```
</details>

<details>
<summary> <h3>Get a user's registered/owned events</h3> </summary>
<h3><code>GET /events/user/:id</code></h3>

<u>Authorization</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The query user's valid Json Web Token |

<u>Path Parameters</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```id```   | The user's ID |

<u>Response</u>

```
200 OK
{
  events: [ eventInfo1, eventInfo2, ...]
}
```
</details>

<details>
<summary> <h3> Register a user for an event </h3> </summary>
<h3><code>POST /events/:eventID/:userID</code></h3>

<u>Authorization</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The registering user's valid Json Web Token |

<u>Path Parameters</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```eventID```   | The event's ID |
  |  ```userID```    | The user's ID  |

<u>Response</u>

```200 OK```
</details>

<details>
<summary> <h3> Unregistering a user for an event </h3></summary>
<h3><code>DELETE /events/:eventID/:userID</code></h3>

<u>Authorization</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The unregistering user's valid Json Web Token |

<u>Path Parameters</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```eventID```   | The event's ID |
  |   ```userID```   | The user's ID |

<u>Response</u>

```200 OK```
</details>

---

## Chatbox

<details>
<summary> <h3> Creates a new message in a new conversation </h3> </summary>
<h3><code>POST /chatbox/convo</code></h3>

<u>Authorization</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The message sending user's valid Json Web Token |

<u>Parameters in Body</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```senderID```   | The user id of the message sender ```required``` |
  | ```targetID``` | The user id of the person receiving the message ```required``` |
  |  ```message``` | The message content ```required``` |

<u>Response</u>

```
201 Created
{
  convoID: "12312dad24255asda"
}
```
</details>

<details>
<summary> <h3> Creates a new message in an existing conversation </h3></summary>
<h3><code>POST /chatbox/convo/:convoID</code></h3>

<u>Authorization</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The message sending user's valid Json Web Token |

<u>Path Parameters</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```convoID```   | The convo's ID |

<u>Parameters in Body</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```senderID```   | The user id of the message sender ```required``` |
  | ```targetID``` | The user id of the person receiving the message ```required``` |
  |  ```message``` | The message content ```required``` |

<u>Response</u>

```201 Created```
</details>

<details>
<summary> <h3> Get a user's convos </h3> </summary>
<h3><code>POST /chatbox/user/:userID</code></h3>

<u>Authorization</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The query user's valid Json Web Token |

<u>Path Parameters</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```userID```   | The query user's ID |


<u>Response</u>
```
200 OK
{
  convos: [ convo1, convo2, ...]
}
```
</details>

<details>
<summary> <h3> Retrieve two user's convo </h3></summary>
<h3><code>GET /chatbox/user/:user1ID/:user2ID</code></h3>

<u>Authorization</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```x-access-token```   | The one of the query user's valid Json Web Token |

<u>Path Parameters</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```user1ID```   | The query user's ID |
  |  ```user2ID```   | The other query user's ID |

<u>Response</u>

```
200 OK
convoID: "123134adfaf4424"

// This will appear if the two users do not have a convo
err: "No Convo found"
```
</details>

<details>
<summary> <h3> Retrieve an event's convo </h3> </summary>
<h3><code>GET /chatbox/event/:eventID</code></h3>

<u>Path Parameters</u>
  
  |  param   | Description |
  | -------  | ----------- |
  |  ```eventID```   | The query event ID |

<u>Response</u>

```
200 OK
convoID: "123134adfaf4424"
```
</details>