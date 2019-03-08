import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import { CreateUserComponent } from "app/users/create-user/create-user.component";
import { EditUserComponent } from "app/users/edit-user/edit-user.component";
import { ConsumersComponent } from '@app/consumers/consumers.component';


@Component({
    templateUrl: './searchuser.component.html',
    selector: 'search-consumer-component',
    animations: [appModuleAnimation()]
})
export class SearchConsumerComponent implements OnInit {
    @ViewChild('consumerComponent') consumerComponent: ConsumersComponent;

    active: boolean = false;
    batchList: any = [];
    isConsumerSelected:boolean=false;
    constructor(
        injector: Injector,
        private _userService: UserServiceProxy
    ) {
        //super(injector);
    }
    ngOnInit(): void {
        // this._userService.getAll(20, 1, "/api/services/app/Lims/GetBatchList?")
        //     .finally(() => {
        //         //finishedCallback();
        //     })
        //     .subscribe((result: any) => {
        //         this.batchList = result.items;
        //         //this.showPaging(result, pageNumber);
        //     });

    }
    protected searchConsumerByContactNumber(){

    }
    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._userService.getAll(request.skipCount, request.maxResultCount, "/api/services/app/User/GetAll?")
            .finally(() => {
                finishedCallback();
            })
            .subscribe((result: PagedResultDtoOfUserDto) => {
                this.batchList = result.items;
               // this.showPaging(result, pageNumber);
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
                           // this.refresh();
                        });
                }
            }
        );
    }
}
