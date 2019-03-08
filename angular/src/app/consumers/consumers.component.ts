import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import { CreateUserComponent } from "app/users/create-user/create-user.component";
import { EditUserComponent } from "app/users/edit-user/edit-user.component";
import { EditConsumerComponent } from './edit-consumer/edit-consumer.component';
import { CreateConsumerComponent } from './create-consumer/create-consumer.component';

@Component({
    templateUrl: './consumers.component.html',
    selector: 'consumer-component',
    animations: [appModuleAnimation()]
})
export class ConsumersComponent extends PagedListingComponentBase<UserDto> implements OnInit {

    @ViewChild('createConsumerModal') createConsumerModal: CreateConsumerComponent;
    @ViewChild('editConsumerModal') editConsumerModal: EditConsumerComponent;

    active: boolean = false;
    users: any = [];
    selectedPatient: any = {};
    isConsumerSelected:boolean=false;
    constructor(
        injector: Injector,
        private _userService: UserServiceProxy
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this._userService.getAll(20, 1, "/api/services/app/Lims/GetPatientList?")
            .finally(() => {
                //finishedCallback();
            })
            .subscribe((result: any) => {
                this.users = result.items;
                this.users.forEach(element => {
                    element["Selected"] = false;
                });
                //this.showPaging(result, pageNumber);
            });

    }
    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._userService.getAll(request.skipCount, request.maxResultCount, "/api/services/app/User/GetAll?")
            .finally(() => {
                finishedCallback();
            })
            .subscribe((result: PagedResultDtoOfUserDto) => {
                this.users = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(user: UserDto): void {
        abp.message.confirm(
            "Delete user '" + user.fullName + "'?",
            (result: boolean) => {
                if (result) {
                    this._userService.delete(user.id)
                        .subscribe(() => {
                            abp.notify.info("Deleted User: " + user.fullName);
                            this.refresh();
                        });
                }
            }
        );
    }
    protected onSearch() {

    }
    // Show Modals
    createUser(): void {
        this.createConsumerModal.show();
    }

    editUser(user: UserDto): void {
        this.editConsumerModal.show(user.id);
    }

    onSelectPatient(item) {
        this.selectedPatient = item;
        this.isConsumerSelected = true;
    }
    //Get active consumer list


}
