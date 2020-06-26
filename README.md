
# Picturen Backend
> A simple API for integration Google Cloud Search API (Images)
##### Rota de busca de imagem: 
A api recebe um termo, busca no google images esse termo, retorna uma lista com 10 items

`app.get('/images', GoogleSearch.find)`

##### Rota de criação de palavra do dicionário
A api recebe link, word, username e salva essa infos em uma tabela de dicionário
  
`app.post('/words', Dictonary.create)`

##### Rota de listagem de dicionário
A api recebe o username do usuário e lista todos as palavras associodas

`app.get('/words/:username', Dictonary.list)`
