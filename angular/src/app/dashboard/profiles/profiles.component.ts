import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import { CreateUserComponent } from "app/users/create-user/create-user.component";
import { EditUserComponent } from "app/users/edit-user/edit-user.component";

@Component({
    templateUrl: './profiles.component.html',
    selector: 'profile-component',
    animations: [appModuleAnimation()]
})
export class ProfilesComponent implements OnInit {

    active: boolean = false;
    profiles: any = [];
    totalSelectedProfile: any = {
        Count: 0,
        TotalPrice: 0
    }
    constructor(
        injector: Injector,
        private _userService: UserServiceProxy
    ) {
       // super(injector);
    }
    ngOnInit(): void {
        let profileObj = {
            "GroupEntityId": "523",
            "LabTestName": "",
            "LabTestCategory": 1,
            "LabTestCode": "",
            "IsActive": true,
            "MinPrice": 0,
            "MaxPrice": 10000,
            "AgeGroup": 0,
            "Gender": 0,
            "Ordering": [],
            "Page": 1,
            "Rows": 5
           }
        {
            this._userService.create(profileObj, "http://54.84.255.41:8104/api/DiagnosticCentre/GetLabProfiles", true)
                .finally(() => {
                    //finishedCallback();
                })
                .subscribe((result: any) => {
                    this.profiles = result.Items;
                    this.profiles.forEach(element => {
                        element["Selected"] = false;
                    });
                    //this.showPaging(result, pageNumber);
                });

        }

    }
    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._userService.getAll(request.skipCount, request.maxResultCount, "/api/services/app/User/GetAll?")
            .finally(() => {
                finishedCallback();
            })
            .subscribe((result: PagedResultDtoOfUserDto) => {
               // this.batchList = result.items;
              //  this.showPaging(result, pageNumber);
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
                        //    this.refresh();
                        });
                }
            }
        );
    }
    onSelectProfile(item){
        let count = 0;
        this.totalSelectedProfile.TotalPrice = 0;
        this.totalSelectedProfile.Count = 0;
        item.Selected = !item.Selected;
        this.profiles.forEach(element => {
            if (element.Selected) {
                count++;
                this.totalSelectedProfile.Count = count;
                this.totalSelectedProfile.TotalPrice += Number(element.PriceAfterDiscount);
            }
        });
        if (count == 0) {
            this.totalSelectedProfile.Count = 0;
            this.totalSelectedProfile.TotalPrice = 0;
        }
    }

}
