import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import { CreateUserComponent } from "app/users/create-user/create-user.component";
import { EditUserComponent } from "app/users/edit-user/edit-user.component";

@Component({
    templateUrl: './samplestatus.component.html',
    selector: 'sample-status-component',
    animations: [appModuleAnimation()]
})
export class SampleStatusComponent extends PagedListingComponentBase<UserDto> implements OnInit {
    active: boolean = false;
    selectedBatcgDetials:any=[];
    activeBatch: any = [

        {
            batchNumber: "100", batchDate: "07-Mar-2019", sampleType: "BloodType", pickUpDate: "07-Mar-2019", pickUpPerson: "Saurav Swain", sample: "-", "etc": "07-Mar-2019", status: "Ready for Pick-Up", remarks: "",
            batchDetails: [
                { barCode: "9087PYT567", Name: "Saswat Pradhan", Age: 25, Gender: "Male", status: "Not Ready", allReportStatus: "3/5 Reports Ready" },
                { barCode: "9087RDT591", Name: "Sujata Sahoo", Age: 34, Gender: "Female", status: "Ready", allReportStatus: "5/5 Reports Ready" },
                { barCode: "9087UTR672", Name: "Bibhu Panda", Age: 36, Gender: "Male", status: "Not Ready", allReportStatus: "4/5 Reports Ready" }
            ]
        },
        {
            batchNumber: "100", batchDate: "06-Mar-2019", sampleType: "BloodType", pickUpDate: "07-Mar-2019", pickUpPerson: "Saurav Swain", sample: "-", "etc": "07-Mar-2019", status: "Ready for Pick-Up", remarks: "",
            batchDetails: [
                { barCode: "9087SQT567", Name: "Sritam Swain", Age: 25, Gender: "Male", status: "Ready", allReportStatus: "5/5 Reports Ready" },
                { barCode: "9087QAS591", Name: "Smruti Mishra", Age: 44, Gender: "Female", status: "Ready", allReportStatus: "5/5 Reports Ready" },
                { barCode: "9087YYU672", Name: "Jagan Reddy", Age: 56, Gender: "Male", status: "Not Ready", allReportStatus: "1/5 Reports Ready" }
            ]
        },
        {
            batchNumber: "101", batchDate: "05-Mar-2019", sampleType: "BloodType", pickUpDate: "05-Mar-2019", pickUpPerson: "Chandan Swain", sample: "-", "etc": "08-Mar-2019", status: "In Transit", remarks: "",
            batchDetails: [
                { barCode: "9087PYT567", Name: "Saswat Pradhan", Age: 25, Gender: "Male", status: "Not Ready", allReportStatus: "3/5 Reports Ready" },
                { barCode: "9087RDT591", Name: "Sujata Sahoo", Age: 34, Gender: "Female", status: "Ready", allReportStatus: "5/5 Reports Ready" },
                { barCode: "9087UTR672", Name: "Bibhu Panda", Age: 36, Gender: "Male", status: "Not Ready", allReportStatus: "4/5 Reports Ready" }
            ]
        },
        {
            batchNumber: "102", batchDate: "02-Mar-2019", sampleType: "BloodType", pickUpDate: "02-Mar-2019", pickUpPerson: "Ashis Mahapatra", sample: "-", "etc": "09-Mar-2019", status: "Test In Process", remarks: "",
            batchDetails: [
                { barCode: "9087SQT567", Name: "Sritam Swain", Age: 25, Gender: "Male", status: "Ready", allReportStatus: "5/5 Reports Ready" },
                { barCode: "9087QAS591", Name: "Smruti Mishra", Age: 44, Gender: "Female", status: "Ready", allReportStatus: "5/5 Reports Ready" },
                { barCode: "9087YYU672", Name: "Jagan Reddy", Age: 56, Gender: "Male", status: "Not Ready", allReportStatus: "1/5 Reports Ready" }
            ]
        },
        {
            batchNumber: "101", batchDate: "01-Mar-2019", sampleType: "BloodType", pickUpDate: "01-Mar-2019", pickUpPerson: "Saurav Swain", sample: "-", "etc": "07-Mar-2019", status: "Report Ready", remarks: "", batchDetails: [
                { barCode: "9087PYT567", Name: "Saswat Pradhan", Age: 25, Gender: "Male", status: "Not Ready", allReportStatus: "3/5 Reports Ready" },
                { barCode: "9087RDT591", Name: "Sujata Sahoo", Age: 34, Gender: "Female", status: "Ready", allReportStatus: "5/5 Reports Ready" },
                { barCode: "9087UTR672", Name: "Bibhu Panda", Age: 36, Gender: "Male", status: "Not Ready", allReportStatus: "4/5 Reports Ready" }
            ]
        }
    ];
    selectedPatient: any = {};
    isConsumerSelected: boolean = false;
    constructor(
        injector: Injector,
        private _userService: UserServiceProxy
    ) {
        super(injector);
    }
    ngOnInit(): void {
        // this._userService.getAll(20, 1, "/api/services/app/Lims/GetBatchTestDetails?")
        //     .finally(() => {
        //         //finishedCallback();
        //     })
        //     .subscribe((result: any) => {
        //         this.activeBatch = result.items;

        //     });

    }
    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._userService.getAll(request.skipCount, request.maxResultCount, "/api/services/app/User/GetAll?")
            .finally(() => {
                finishedCallback();
            })
            .subscribe((result: PagedResultDtoOfUserDto) => {
                // this.users = result.items;
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

    onSelectPatient(item) {
        this.selectedPatient = item;
        this.isConsumerSelected = true;
    }
    //Get active consumer list

    onSelectBatch(item){
this.selectedBatcgDetials = item.batchDetails;
    }
}
