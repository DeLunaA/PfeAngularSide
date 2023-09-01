import { Component, OnInit } from '@angular/core';
import {CollaborateurService} from '../../service/collaborateur.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {SessionStorageService} from 'ngx-webstorage';
import {LoginService} from '../login.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.css']
})
export class LockscreenComponent implements OnInit {

  collaborateur:any;
  langKey:any;
  constructor(private collaborateurService:CollaborateurService,
              private translate : TranslateService,
              private sessionStorageService:SessionStorageService,
              private loginService:LoginService,
              private messageService:MessageService
              ) { }

  ngOnInit() {
    this.langKey=this.sessionStorageService.retrieve('locale');
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.langKey=event.lang;
    });

    this.collaborateurService.currentCollaborateur().subscribe(x=>{
      this.collaborateur=x.body;
    });
  }

  logout ()
  {
    this.sessionStorageService.store('locale', null);
    this.loginService.logout("Votre session a été verouillée ");
    this.messageService.add({
      severity: 'info',
      summary: 'Message',
      detail: 'Déconnexion avec succés'
    });
  }
}
