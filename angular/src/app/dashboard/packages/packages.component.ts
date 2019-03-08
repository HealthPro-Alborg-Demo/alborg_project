import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import { CreateUserComponent } from "app/users/create-user/create-user.component";
import { EditUserComponent } from "app/users/edit-user/edit-user.component";

@Component({
    templateUrl: './packages.component.html',
    selector: 'package-component',
    animations: [appModuleAnimation()]
})
export class PackagesComponent implements OnInit {

    active: boolean = false;
    packages: any = [];
    selectedPackage: any = [];
    totalSelectedPackage: any = {
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
        let packageObj = {
            "GroupEntityId": "523",
            "LabPackageName": "",
            "LabPackageCategory": 0,
            "LabPackageCode": "",
            "IsActive": true,
            "Ordering": [
                {
                    "OrderByColumn": "",
                    "OrderByDesc": false
                }
            ],
            "Page": 1,
            "Rows": 5
        }
        {
            this._userService.create(packageObj, "http://54.84.255.41:8104/api/DiagnosticCentre/GetLabPackages", true)
                .finally(() => {
                    //finishedCallback();
                })
                .subscribe((result: any) => {
                    this.packages = result.Items;
                    this.packages.forEach(element => {
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
                //  this.batchList = result.items;
                //this.showPaging(result, pageNumber);
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
    onSelectPackage(item) {
        let count = 0;
        this.totalSelectedPackage.TotalPrice = 0;
        this.totalSelectedPackage.Count = 0;
        item.Selected = !item.Selected;
        this.packages.forEach(element => {
            if (element.Selected) {
                count++;
                this.totalSelectedPackage.Count = count;
                this.totalSelectedPackage.TotalPrice += Number(element.PriceAfterDiscount);
            }
        });
        if (count == 0) {
            this.totalSelectedPackage.Count = 0;
            this.totalSelectedPackage.TotalPrice = 0;
        }
    }
}
