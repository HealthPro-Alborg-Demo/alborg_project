import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { UserServiceProxy, CreateUserDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

import * as _ from "lodash";
import { Router } from '@angular/router';

@Component({
  selector: 'create-consumer-modal',
  templateUrl: './create-consumer.component.html'
})
export class CreateConsumerComponent extends AppComponentBase implements OnInit {

    @ViewChild('createConsumerModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active: boolean = false;
    saving: boolean = false;
    user: any = {};
    roles: RoleDto[] = null;

    constructor(
        injector: Injector,
        private router:Router,
        private _userService: UserServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._userService.getRoles()
        .subscribe((result) => {
            this.roles = result.items;
        });
    }

    show(): void {
        this.active = true;
        this.modal.show();
        this.user={}; //= new CreateUserDto();
        this.user.init({ isActive: true });
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {
        //TODO: Refactor this, don't use jQuery style code
        var roles = [];
        $(this.modalContent.nativeElement).find("[name=role]").each((ind:number, elem:Element) => {
            if($(elem).is(":checked") == true){
                roles.push(elem.getAttribute("value").valueOf());
            }
        });

        this.user.roleNames = roles;
        this.saving = true;
        this._userService.create(this.user,"/api/services/app/Lims/CreatePatient")
            .finally(() => { this.saving = false; })
            .subscribe(() => {
                this.router.navigateByUrl('/app/consumers');
                this.notify.info(this.l('Saved Successfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
