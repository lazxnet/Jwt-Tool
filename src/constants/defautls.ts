export const DEFAULT_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export const DEFAULT_HEADER = {
  alg: 'HS256',
  typ: 'JWT',
};

export const DEFAULT_PAYLOAD = {
  sub: '1234567890',
  name: 'John Doe',
  admin: true,
};

export const DEFAULT_SECRET = 'secret';