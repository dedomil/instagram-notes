## instagram-notes

### installation

```shell
npm i instagram-notes
```

### importing the package

```js
const Note = require("instagram-notes");
```

```js
import Note from "instagram-notes";
```

### creating a sessionId

```js
const sessionId = await Note.getSessionId("username", "password");
```

### creating a client/instance

```js
const client = new Note(sessionId);
```

### get all notes

```js
await client.getNotes();
```

### create a note

```js
await client.createNote("hello");
```

### delete a note

```js
await client.deleteNote("<note-id>"); // id of *your* note from client.getNotes()
```

### update last seen time

```js
await client.lastSeenUpdateNote();
```
