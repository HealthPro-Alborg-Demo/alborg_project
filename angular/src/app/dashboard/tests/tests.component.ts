import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import { CreateUserComponent } from "app/users/create-user/create-user.component";
import { EditUserComponent } from "app/users/edit-user/edit-user.component";

@Component({
    templateUrl: './tests.component.html',
    selector: 'test-component',
    animations: [appModuleAnimation()]
})
export class TestsComponent implements OnInit {

    active: boolean = false;
    tests: any = [];
    totalSelectedTest: any = {
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
            "LabProfileName": "",
            "LabProfileCategory": 0,
            "LabProfileCode": "",
            "IsActive": true,
            "MinPrice": 0,
            "MaxPrice": 10000,
            "AgeGroup": 0,
            "Gender": 0,
            "Ordering": [],
            "Page": 1,
            "Rows": 5
        };
        {
            this._userService.create(profileObj, "http://54.84.255.41:8104/api/DiagnosticCentre/GetLabTests", true)
                .finally(() => {
                    //finishedCallback();
                })
                .subscribe((result: any) => {
                    this.tests = result.Items;
                    this.tests.forEach(element => {
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
                // this.tests = result.items;
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
    onSelectTest(item){
        let count = 0;
        this.totalSelectedTest.TotalPrice = 0;
        this.totalSelectedTest.Count = 0;
        item.Selected = !item.Selected;
        this.tests.forEach(element => {
            if (element.Selected) {
                count++;
                this.totalSelectedTest.Count = count;
                this.totalSelectedTest.TotalPrice += Number(element.PriceAfterDiscount);
            }
        });
        if (count == 0) {
            this.totalSelectedTest.Count = 0;
            this.totalSelectedTest.TotalPrice = 0;
        }
    }
}
