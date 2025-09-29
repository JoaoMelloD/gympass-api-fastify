# App

- Geolocalização no Back-End
  Exemplo: Pessoa só poderá fazer check-in em academias proximas a ela.
- Verificação com data
  Exemplo: Só pode entrar na academia 20 após o check-in

Gympass Style App

## RFs(Requisitos Funcionais)

Funcionalidades Dentro dos sistema.

- [ ] Deve ser possível se cadastrar.
- [ ] Deve ser possível se autenticar.
- [ ] Deve ser possível obter o perfil de um usuario logado.
- [ ] Deve ser possível possível obter o número de check-ins realizados pelo usuario logado.
- [ ] Deve ser possível o usuario obter seu histórico de check-ins.
- [ ] Deve ser possível o usuario buscar academias próximas.
- [ ] Deve ser possível o usuario buscar academias pelo nome.
- [ ] Deve ser possível o usuario realizar check-in em uma academia.
- [ ] Deve ser possível validar o check-in de um usuario.
- [ ] Deve ser possível cadastrar uma academia.

## RNs(Regras de Negócio)

Condicioes aplicadas as funcionalidades baseando-se em regras de domínio, sempre vai estar associada a um requisito funcional.

- [ ] O usuario não deve poder se cadastrar com um email duplicado.
- [ ] O usuario não pode fazer dois check-ins no mesmo dia.
- [ ] O usuario não pode fazer o check-ins a não ser que esteja perto (100 m da academia)
- [ ] O check-in só pode ser validado até 20 minutos após criado.
- [ ] O check-in só pode ser validado por administradores.
- [ ] A academia só pode ser cadastrada por administradores.

## RNFs(Requisitos Não Funcionais)

Requisitos aos quais são mais técnicos, coisas que o usuario não tem decisão.

- [ ] A senha do usuario precisa estar criptografada.
- [ ] Os dados da aplicação precisam estar persisitidos em um banco postgreSQL.
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página.
- [ ] O Usuario deve ser identificado por um JWT(Json Web Token).

# Documentação Estudos

## Prisma ORM

- Object Relational Mapper
- O objetivo é mapear as tabelas do meu banco de dados em entidades(objetos) da minha aplicação.
- O que muda de cada ORM é sua sintaxe, o objetivo final é o mesmo.
- Por que usar o prisma?
  - Diminui o trabalho e auxilia com a parte de duplicidade, além de possuir uma integração com o typescript
  - Trabalha com migrations de maneira automatizada.

### Passo 01 - Instalar CLI do prisma no projeto

`npm install prisma -D`

Para utilizar o cli basta usar com o prefixo `npx prisma -h` irá mostrar todos os comandos.

### Passo 02 - Iniciar o prisma no projeto

`npx prisma init` -> Irá criar uma pasta prisma no projeto, contendo os schemas do projeto.

**Dica:** Instalar a extensão do prisma para facilitar o uso.

Obervação: Dentro do meu schema, nos referenciamos as tabelas usando _model_ dentro delas temos métodos do prisma usando @ para colunas do banco e @@ para a tabela inteira.

**Dica:** Quando vamos expor o id para o usuario final, devemos obrigatóriamente utilizar de **uuid()** porém quando o usuario não tiver o acesso a esse parâmetro, é recomendado o uso de **id auto-incremental**

`npx prisma generate` -> Cria de forma automatizada a tipagem do nosso schema ou seja a integração do código typescript com os nossos schemas. Isso vai facilitar na hora do desenvolvimento, pois nosso código saberá as tabelas que exisstem no banco de dados, nos fornecendo _auto complete_

### Passo 03 - Instalar o Client

`npm install @prisma/client` -> Vai nos permitir acessar o banco de dados.
**Observação:** Tive algumas implicações na hora de usar os atributos tipados pois estavam sendo gerados em um diretório a parte dentro de src/generate, para resolver apenas abri o arquivo do _schema.prisma_ e removi a linha de output, assim ela passou a gerar a tipagem corretamente dentro de _node_modules_

## Fundamentos do Docker

- Como rodar o postgreSQL na nossa maquina. Passos

### Passo 01

`docker run --name api-solid-pg -e POSTGRESQL_USENAME=docker -e POSGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql:latest`

- Para exibir os containers que estão rodando basta utilizar o comando `docker ps` e `docker ps -a` mostra todos os containers que eu ja criei.

Após isso basta verificar o nome do banco, e para subir novamente basta dar um `docker start [nomeDoContainer]` e para parar basta dar um `docker stop [nomeDoContainer]`

- Para remover um container basta usar `docker rm [nomeDoContainer]`

Para criar criar novamente o container basta dar o comando `docker run` ali em cima.

Verificação de logs do meu container é feita através de `docker logs [nomeDoContainer] -f`

### Passo 02

`npx prisma migrate dev`
As migrations no prisma diferentemente de outros orm por exemplo como o eloquent do laravel você não precisa definir um arquivo de migration, ao tentar rodar a migração ele verifica se foi feito alterações do meu schema desde a ultima vez e caso tenha sido feito ele realiza uma alteração.
Após definir o nome da migração, ele gera automaticamente, no formato igual o eloquent.

### Passo 03

Para visualizar as tabelas, podemos utilizar ainda o prisma, usando o comando `npx prisma studio` => Irá abrir uma interface no navegador para a visualização das tabelas do banco.

### Utilizando o Docker Compose

- Criamos um docker compose para que outros desenvolvedores possam usar para para que eles saibam quais containers precisam ser criados. para que a aplicação funcione.

- Após nosso `docker-compose.yml` ter sido criado, basta algora quem for usar o projeto, dar um `docker compoe up` com a opção de usar `-d` depois do up para não ficar mostrando os logs
- Para derrubar e deletar os dados dos containers da aplicação basta dar um `docker compose down`
- Para pausar basta usar `docker compose stop

### Observações

Tomar cuidado com as variaveis esperadas no arquivo **.env** para que os documentos do docker compose estejam iguais, assim como as credenciais.

## Criando Schema no Prisma

- Academia
- Check-in
- Usuario

Algums fatores que foram decididos, nosso check-in precessa necessáriamente ser validado, ao invés de criar um boolean de true or false para esse campo, foi optado pela criação de um campo opcional chamado 'validated_at' do tipo Data. Ou seja, agora além de saber se foi validado ou não, ele armazena a data de quando foi validado.
Outra decisão de requisito funcional, é salvar a senha como Hash para que não seja possível descriptografa-la.

**Observação:** Quando for colocar a aplicação para produção é necessário rodar as migrações usando ` npx migrate deploy`

## Criando o relacionamento entre as tabelas

- 1-1
- N-1
- N-N

Basicamente usando a extensão do prisma, uma maneira eficiênte de criarmos relacionamentos dentro dos schemas é da seguinte forma:
`nomeDaTabelaEmMinusculo` seguido de `nomeDaTabela`, ao salvar ele irá criar o relacioanmento automaticamente com aquela tabela

## Criação de um Usuario

- Criação de rotas para a criação de um usuario no banco de dados.
  No arquivo app.ts é criado nossa primeira rota apenas para teste, com fins de verificar se a partir de uma requisição via insomnia é possível criar um usuario no nosso banco de dados no docker.

### Controller de registro

- Vamos modularizar em mais partes para que fique mais simples de dar manutenção.
  Controller é a função que lida com a entrada de dados de uma requisição http e trabalha com a resposta.
- Criamos uma pasta de http dentro de `src` que será usada para organizar a lógica que esta relacionada com requisições e respostas.
- Seguido de uma pasta de controladores que será responsável por executar uma ação quando o usuario acessar determinada rota.
- Vamos abstrair partes do nosso código que não são mutaveis, ou seja que a lógica permanece a mesma, como por exemplo nossa função que chama o método de criação do prisma, isso nos possibilita modularizar e trabalhar em camadas dentro da nossa aplicação.

### Hash da senha e validação

- Para a criação de hashes dentro desse projeto vamos utilizar a biblioteca `npm i bcryptjs`
- Para que ele seja compátivel com o typescript é necessário instalar `npm install -D @types/bcryptjs`
- Com isso chamamos a função de hash passando a variavel que queremos que seja hashada, e o numero de rounds que ela será hashada, ou seja vai ser o tanto de vez que a iteração de hash irá sobrescrever. **Exemplo retornado:** `$2b$06$C7W.L4q9RizTjy98qP/y5ubTC0in0Mg4ITT4p0zfKW1wk3qwECKIO`
  _Como funciona para verificar as credenciais?_ Basicamente quando o usuario for tentar acessar a função de login passando as credenciais, ele vai hashar a senha novamente e verificar se coincidiu com a senha que esta hashada no banco.
- Outro detalhe também é que criamos uma constante que retorna se o email utilizado pelo usuario ja existe na hora da criação utilizando `findUnique` do prisma passando como where o email.
  ![EXEMPLO](/images-docs/image.png)
  - Um trecho muito interessante que foi comentado, é o trecho acima, que anteriormente ele esta recebendo esses dados para criação a partir de uma requisição http, mas caso eu queira integrar em outra forma para criação, se eu modularizar posso criar usuarios de outras maneiras sem depender de ser através de requisições.
    Ou seja, o trecho acima sempre será igual para toda vez que for criar um usuario. Ou seja, removemos do controller, aquela parte que nunca muda. Independente da forma que eu chegar na parte de criação.

### Caso de uso de registro

- Abstraimos o espaço de código mencionado a cima que se repete independente do meio, que no caso é a criação de um usuario e o hash da senha para um service.
- Como tinhamos uma validação dentro que verificava se já havia um email criado com o email enviado que retornava um reply com código de error, abstraimos usando `throw new Error("E-mail Already exists");` e aonde chamamos o service de registro usamos um try catch para capturar esse error e exibir na tela usando o reply que era usado antes.
- Ou seja, separamos a parte lógica, da funcionalidade da parte que é específica da camada de http que lida com requisição e resposta.
- Agora em qualquer lugar da aplicação que eu precisar criar um usuario, basta chamar meu service de register passando os parâmetros exigidos.

### Repository Pattern

- Serve especificamente para abstraimos a parte de conexão de requisições para o banco, toda a comunicação com o banco extraido para um arquivo separado.
- A motivação que tivemos anteriormente para separar o caso de uso/service de registro anteriormente, era de que conseguissemos reaproveitar a lógica de criação de usuario, para que diferentes formas de criar um usuario na nossa aplicação chamem um método em comúm.
- A camada de repositório específicamente será destinada a somente partes que envolvam queries ao banco, que vão modularizar a interação com o ORM.
- Dentro do prisma, ele cria tipagens para cada método que desejamos dentro de um crud, e para acessar essa tipagem para definirmos nossos dados basta utilizarmos o objeto _Prisma_, um exemplo que utilizamos é o `UserCreateInput` que tipa nosso `data` para receber os dados necessários para criação de um usuario.
- Trabalhar com o repository pattern dentro da nossa aplicação faz com que comecemos ter vantagens como: Desacoplamento do nosso orm para um drive nativo, isolando isso a um repository, fica mil vezes mais simples de realizarmos a manutenção, já que teoricamente não terá em nenhum outro lugar código que interaja diretamente com o banco.
  ![EXEMPLOREPOSITORY](/images-docs/pick-02.png)
  Como pode ver a cima, isolei minha lógica com o banco de dados para uma classe de repository, aonde quando eu for querer trabalhar com a criação de usuarios, basta eu chamar o método create de um objeto da classe `PrismaUsersRepository`

### Inversão de Dependencias

- Uma das principais vantagens de utilizarmos repositorios é a possibilidade de migrar de ferramentas/bancos da nossa aplicação mais facilmente.
  _SOLID: 5 Princípios_
  - D - Dependencie Inversion Principle
    Vou inverter a ordem de como a dependencia chega nesse caso de uso. Ao invés do caso de uso instanciar as dependências que ele precisa, eu vou receber essas dependências como parâmetro.
    Exemplo: Meu caso de uso **depende** do repositório do prisma por exemplo.
    Com a inversão de dependencias, ele muda a forma como meu caso de uso interage com outro arquivo da aplicação tem acesso as suas dependências.
- Cada classe de caso de uso irá ter sempre um método.
- O princípio da inversão de dependências faz com que o arquivo que precisar do caso de uso, é esse arquivo que deve enviar as dependências para o meu caso de uso.

### Interface do Repositório

- Um ponto que devemos seguir na hora de implementarmos inversão de dependências, é fazer com que nosso _use-case_ ou regra de negócio, não conheça independênte a implementação, do contéudo do nosso prisma user repository. Ele precisa somente saber os métodos que existem, e quais dados ele pode enviar e receber desses métodos.

### Lidando com erros de Use Cases.

- Realizamos uma tratativa de erros dentro do nosso controller para identificarmos o error que determinada ocasião pode ocorrer no nosso caso de uso. Além de ter um erro só para tudo.
- Criamos uma pasta de errors contendo um arquivo para cada tipo de erro da nossa aplicação.
- Exemplo: "Error de Usuario com aquele email existente"
- Basicamente criamos uma classe que extende a classe _Error_ do próprio javascript. com isso criamos um construtor contendo o método super de error, ou seja, usamos todos os atributos e métodos da classe _Error_ Já existente, Com isso definimos uma mensagem, no caso definindo que aquele email ja está sendo usado.
  Exemplo de como devemos chamar isso dentro do controlador:

```typescript
if (error instanceof UserAlreadyExistsError) {
  reply.status(409).send({
    message: error.message,
  });
}
```

### Handler de erros global

- Se acontecer algum erro dentro de caso de uso que não é um erro conhecido
- Erros não tratados
  Quando não for um erro conhecido, ou seja que não cair em nenhuma validação
  Ou seja, ao invés de utilizarmos apenas:

```javascript
return reply.status(500).send();
```

Podemos utilizar apenas um

```javascript
throw error;
```

Que o nosso querido fastify da conta de resolver e nos exibir oque deu de errado. Pois ele possui uma tratativa de erro interna dele.
Porém para formatarmos e deixarmos ainda mais claro as mensagens de error desconhecidas da nossa aplicação, podemos criar um _handler global_ para efetuar esse papél.

### Configurando Vitest
- É recomendado criar testes no decorrer da criação de regras de negócio da nossa aplicação.
- QUando estamos trabalhando na regra em si, através dos testes conseguimos ver se estamos cumprindo a tarefa daquele requisito em si.
- Se podemos usar uma métodologia como TDD 
- É essencial o uso de testes.
- Instalar o vitest
- Criação do arquivo *register.test.ts* 
### Criação do primeiro teste unitario da aplicação.
- Teste para testar o requisito funcional de criação de usuario.
- "Cada requisito da nossa aplicação vai exigir ao menos um teste"
- Dica, sempre que formos retornar algo no nosso caso de uso, é recomendado retornarmos um objeto para caso precisemos retornar mais coisas futuramente, exemplo paginação.
- Testes unitarios nunca vão tocar em bancos de dados ou haver dependências ou em camadas externas da nossa aplicação.
- Vamos usar a principal vantagém de se usar inversão de dependências no nosso projeto na hora da criação de testes.
- Quando criamos testes unitarios, geralmente temos muitos testes unitarios, então seria extremamente lento ter o teste unitario ligado ao banco de dados, evitando lentidão e conflitos. Então nosso teste não pode ter ligação com camadas externas. 
- O ponto é ter testes proprios para o banco, testes de integração e testes end-to-end que vão sim integrar recursos externos
### In Memory Database
- Patern que nos possibilita executar testes com a representação do nosso banco de dados em memória ou seja, os dados sendo salvos em variáveis, focando somente em funcionalidades do caso de uso.