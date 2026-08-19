# Convite

Convite interativo com escolha de dia, horário e tipo de encontro. A confirmação
é enviada para um Web App do Google Apps Script, que cria o evento na Agenda e
manda a notificação por e-mail.

## Atualizar o Google Apps Script

1. Abra o projeto que já está publicado no Google Apps Script.
2. Substitua o conteúdo da função `doPost` pela versão de `Code.gs` deste repositório.
3. Salve e implante uma nova versão do Web App mantendo o acesso necessário para
   o convite público.
4. Se a implantação gerar outra URL, atualize `WEB_APP_URL` em `script.js`.

O site envia este formato:

```json
{
  "dia": "sabado",
  "hora": "20:00",
  "local": "jantar"
}
```

