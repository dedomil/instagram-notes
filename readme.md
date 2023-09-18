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

### set a note

```js
(async () => {
  let response = await client.setNote("hello");
  console.log(response);
})();
```