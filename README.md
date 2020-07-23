
# Picturen Backend
> A simple API for integration Google Cloud Search API (Images)

##### TODO
- [ ] Utilizar crypto para password
- [ ] Ordenar palavras pela última adicionada

##### Rota de busca de imagem: 
A api recebe um termo, busca no google images esse termo, retorna uma lista com 10 items

`app.get('/images', GoogleSearch.find)`

##### Rota de criação de palavra do dicionário
A api recebe link, word, username e salva essa infos em uma tabela de dicionário
  
`app.post('/words', Dictonary.create)`

##### Rota de listagem de dicionário
A api recebe o username do usuário e lista todos as palavras associodas

`app.get('/words/:username', Dictonary.list)`

## Env for deploy

> process deploy with https://medium.com/@molp/deploy-node-js-server-to-aws-lightsail-vps-fd7e67f07b14
> generate key with https://stackoverflow.com/questions/2643502/how-to-solve-permission-denied-publickey-error-when-using-git
> add key with https://adamdehaven.com/blog/how-to-generate-an-ssh-key-and-add-your-public-key-to-the-server-for-authentication/
> 
