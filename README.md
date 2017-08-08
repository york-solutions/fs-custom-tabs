# fs-custom-tabs

## Install

Run `npm install && npm run build` before loading in Chrome as an [unpacked extension](https://developer.chrome.com/extensions/getstarted#unpacked).

## Manifest Format

```js
{
  "id": "echo",
  "icon": "http://www.iconsdb.com/icons/preview/black/speaker-xxl.png",
  "title": "Echo",
  "description": "HTTP Echo, for testing because Google won't let us iframe",
  "url": "https://httpbin.org/get?pid={pid}&token={token}",
  "company": "ACME",
  "phone": "888-123-4567",
  "email": "dev@acme.com"
}
```

Notice the url contains placeholders. I thought that would be better to let the dev specify
how the data is passed as opposed to forcing a specific query param name. `{pid}` and `{token}`
 are the only placeholders available.