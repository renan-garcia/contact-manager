import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {ContactUpdated,ContactViewed} from './messages';
import {areEqual} from './utility';

export class ContactDetail {
  static inject = [WebAPI, EventAggregator];

  setTitle(name){
    this.routeConfig.navModel.setTitle(name);
  }

  setContact(contact){
    this.contact = contact;
    this.originalContact = JSON.parse(JSON.stringify(contact));
  }

  constructor(api, ea){
    this.api = api;
    this.ea = ea;
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    return this.api.getContactDetails(params.chave).then(contact => {
      this.setContact(contact);
      this.setTitle(contact.firstName);
      this.ea.publish(new ContactViewed(this.contact));
    });
  }

  get canSave() {
    return this.contact.firstName && this.contact.lastName && (this.contact.email || this.contact.phoneNumber) && !this.api.isRequesting;
  }

  save() {
    this.api.saveContact(this.contact).then(contact => {
      this.setContact(contact);
      this.setTitle(contact.firstName);
      this.ea.publish(new ContactUpdated(this.contact));
    });
  }

  canDeactivate() {
    if (!areEqual(this.originalContact, this.contact)){
      let result = confirm('Você não salvou suas alterações.Você tem certeza que deseja sair?');

      if(!result){
        this.ea.publish(new ContactViewed(this.contact));
      }

      return result;
    }

    return true;
  }
}
