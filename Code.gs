function doPost(e) {
  try {
    var calendar = CalendarApp.getDefaultCalendar();
    var dados = JSON.parse(e.postData.contents);

    var diaEscolhido = dados.dia;
    var horaEscolhida = dados.hora;
    var localEscolhido = dados.local;

    var nomesLocais = {
      jantar: 'Jantar',
      cafe: 'Café',
      cinema: 'Cinema',
      lanche: 'Lanche',
      surpresa: 'Pode me surpreender'
    };
    var nomeLocal = nomesLocais[localEscolhido] || localEscolhido;

    var partesHora = horaEscolhida.split(':');
    var horas = parseInt(partesHora[0], 10);
    var minutos = parseInt(partesHora[1], 10);

    var hoje = new Date();
    var diaSemanaAtual = hoje.getDay();
    var diaDaSemanaAlvo = diaEscolhido === 'sabado' ? 6 : 0;

    var diasAteEncontro = diaDaSemanaAlvo - diaSemanaAtual;
    if (diasAteEncontro <= 0) {
      diasAteEncontro += 7;
    }

    var dataEncontro = new Date(
      hoje.getTime() + diasAteEncontro * 24 * 60 * 60 * 1000
    );
    dataEncontro.setHours(horas, minutos, 0, 0);

    var dataFim = new Date(dataEncontro.getTime() + 2 * 60 * 60 * 1000);
    var nomeDia = diaEscolhido === 'sabado' ? 'Sábado' : 'Domingo';

    calendar.createEvent('Encontro Confirmado! 😍', dataEncontro, dataFim, {
      description:
        'Opção escolhida pela pessoa no site!\n' +
        'Dia: ' + nomeDia + '\n' +
        'Horário: ' + horaEscolhida + '\n' +
        'Tipo de encontro: ' + nomeLocal,
      location: nomeLocal
    });

    var meuEmail = Session.getActiveUser().getEmail();
    MailApp.sendEmail(
      meuEmail,
      'ENCONTRO CONFIRMADO! 😍',
      'Ela aceitou o convite! ❤️\n\n' +
        'Dia: ' + nomeDia + '\n' +
        'Horário: ' + horaEscolhida + '\n' +
        'Tipo de encontro: ' + nomeLocal
    );

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (erro) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: erro.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
