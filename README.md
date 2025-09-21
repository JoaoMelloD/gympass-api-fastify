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
