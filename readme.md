## instagram-notes

### installation

```shell
npm i instagram-notes
```

### importing the package

```js
const Notes = require("instagram-notes");
```

### creating a client/instance

```js
const client = new Notes("<insert-cookie-here>");
```

### get all notes

```js
(async () => {
  let response = await client.getNotes();
  console.log(response);
})();
```

### create a note

```js
(async () => {
  let response = await client.createNote("hello");
  console.log(response);
})();
```