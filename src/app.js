import {WebAPI} from './web-api';

export class App {
  static inject() { return [WebAPI]; }

  constructor(api) {
    this.api = api;
  }
  
  configureRouter(config, router){
    config.title = 'Agenda de Contatos';
    // route: Parametros a serem passados
    // moduleId: Nome ou caminho do modulo
    // name: Nome  do modulo à ser referenciado no projeto
    // title: Sub-titulo da pagina a ser mostrado
    config.map([
      { route: '',              moduleId: 'no-selection',   title: 'Selecione'},
      { route: 'contacts/:chave',  moduleId: 'contact-detail-pagina', name:'detalhe-do-contato' }
    ]);

    this.router = router;
  }
}
