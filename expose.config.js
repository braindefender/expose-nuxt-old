const local = {
  serverAPI: 'http://10.3.6.27:3333/api',
  redirect_uri: 'http://localhost:3000/auth/callback',
  client_id: '5e1f8950-7cb1-4674-84dc-40e6013fe7da',
}

const external = {
  serverAPI: 'https://expose-server.gpntbsib.ru/api',
  redirect_uri: 'https://expose.gpntbsib.ru/auth/callback',
  client_id: '5e1f8950-7cb1-4674-84dc-40e6013fe7da',
}

conf = { local, external }

module.exports = conf