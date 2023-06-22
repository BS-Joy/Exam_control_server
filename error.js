node:internal/errors:490
    ErrorCaptureStackTrace(err);
    ^

Error: querySrv ETIMEOUT _mongodb._tcp.cluster0.ac4rtpa.mongodb.net
    at QueryReqWrap.onresolve [as oncomplete] (node:internal/dns/promises:251:17) {
  errno: undefined,
  code: 'ETIMEOUT',
  syscall: 'querySrv',
  hostname: '_mongodb._tcp.cluster0.ac4rtpa.mongodb.net'
}

Node.js v18.15.0
[nodemon] app crashed - waiting for file changes before starting...