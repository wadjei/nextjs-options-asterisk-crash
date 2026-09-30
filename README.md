This is a [Next.js](https://nextjs.org/) template to use when reporting a [bug in the Next.js repository](https://github.com/vercel/next.js/issues) with the `app/` directory.

## Next,js error in response to OPTIONS *

Out of the box, Next.js responds with an internal server error when it receives
an `OPTIONS *` request. Other OPTIONS requests are handled correctly.

### Reproducing the Issue

Run the dev server first:
```bash
npm run dev -- --port 3001
```

in second terminal, run the following command to reproduce the issue:

```bash
curl -iw"\n" --http1.1 --request OPTIONS --request-target '*' http://127.0.0.1:3001

```

Notice the curl request received a 500 Internal Server Error response.

Also notice that the dev server logs the following Invalid URL error:

```
⨯ TypeError: Invalid URL
    at ignore-listed frames {
  code: 'ERR_INVALID_URL',
  input: '*'
}
TypeError: Invalid URL
    at ignore-listed frames {
  code: 'ERR_INVALID_URL',
  input: '*'
}
 OPTIONS * 500 in 265ms

```
