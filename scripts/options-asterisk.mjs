import net from 'node:net';

const port = Number(process.argv[2] ?? process.env.PORT ?? 3000);
const chunks = [];
const socket = net.createConnection({ host: '127.0.0.1', port });

socket.setTimeout(5000, () => socket.destroy(new Error('Timed out waiting for the response')));
socket.on('connect', () => {
    socket.write(`OPTIONS * HTTP/1.1\r\nHost: localhost:${port}\r\nConnection: close\r\n\r\n`);
});
socket.on('data', (chunk) => chunks.push(chunk));
socket.on('end', () => {
    const response = Buffer.concat(chunks).toString('utf8');
    const status = response.match(/^HTTP\/\d(?:\.\d)?\s+(\d{3})/m)?.[1];

    process.stdout.write(response);
    if (!response.endsWith('\n')) {
        process.stdout.write('\n');
    }

    if (status !== '500') {
        console.error(`Expected HTTP 500, received ${status ?? 'no HTTP status'}.`);
        process.exitCode = 1;
        return;
    }

    console.log('Reproduced HTTP 500. Check the Next.js server terminal for ERR_INVALID_URL.');
});
socket.on('error', (error) => {
    console.error(`Could not test localhost:${port}: ${error.message}`);
    process.exitCode = 1;
});
