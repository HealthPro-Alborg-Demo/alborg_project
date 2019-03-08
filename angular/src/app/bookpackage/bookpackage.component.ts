import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import { CreateUserComponent } from "app/users/create-user/create-user.component";
import { EditUserComponent } from "app/users/edit-user/edit-user.component";
import { ConsumersComponent } from '@app/consumers/consumers.component';
import { SearchConsumerComponent } from './searchuser/searchuser.component';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { PackagesComponent } from '@app/dashboard/packages/packages.component';
import { TestsComponent } from '@app/dashboard/tests/tests.component';
import { ProfilesComponent } from '@app/dashboard/profiles/profiles.component';
import { Router } from '@angular/router';


@Component({
    templateUrl: './bookpackage.component.html',
    animations: [appModuleAnimation()]
})
export class BookPackageComponent implements OnInit {
    //@ViewChild('searchConsumerComponent') searchConsumerComponent: SearchConsumerComponent;
    @ViewChild('consumerComponent') consumerComponent: ConsumersComponent;
    @ViewChild('packagesComponent') packagesComponent: PackagesComponent;
    @ViewChild('testsComponent') testsComponent: TestsComponent;
    @ViewChild('profilesComponent') profilesComponent: ProfilesComponent;
    active: boolean = false;
    batchList: any = [];
    count: number = 0;
    bookingOrderDetails: any = {
        PatientId: "",
        PatientName: "",
        PatientContact: "",
        PatientEmail: "",
        BookingOrderId: "",
        TestIds: [],
        Package: [],
        Profile: [],
        Test: []
    }
    constructor(
        injector: Injector,
        private router:Router,
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
    protected searchConsumerByContactNumber() {

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
    next() {
        switch (this.count) {
            case 0:
                this.getPatientDetails();
                break;
            case 1:
                this.getPackageDetails();
                break;
            case 2:
                this.getVerifyBookingOrder();
                break;
            case 3:
                this.getVerifyBookingOrder();
                this.getActiveBatchList();
                break;
            case 4:
                this.getSuccessResponse();
                break;
            default:
                break;
        }
    }
    getPatientDetails() {
        if (this.consumerComponent.selectedPatient && this.consumerComponent.selectedPatient != null && this.consumerComponent.isConsumerSelected) {
            this.bookingOrderDetails.PatientId = this.consumerComponent.selectedPatient.id;
            this.bookingOrderDetails.PatientName = this.consumerComponent.selectedPatient.firstName;
            this.bookingOrderDetails.PatientContact = this.consumerComponent.selectedPatient.phone;
            this.bookingOrderDetails.PatientEmail = this.consumerComponent.selectedPatient.email;
            this.count++;
        }
        else {
            this.count = 0;
            abp.notify.error("Please select a patient");
        }
    }
    getPackageDetails() {
        this.bookingOrderDetails.TestIds = [];
        this.bookingOrderDetails.Package = [];
        this.bookingOrderDetails.Profile = [];
        this.bookingOrderDetails.Test = [];
        this.packagesComponent.packages.forEach(element => {
            if (element.Selected) {
                if (element.LabProfiles.length > 0) {
                    element.LabProfiles.forEach(item => {
                        if (item.LabTests.length > 0) {
                            item.LabTests.forEach(test => {
                                this.bookingOrderDetails.TestIds.push({ Id: test.Id, TestName: test.LabTestName });
                            });
                        }
                    });
                }
                if (element.LabTests.length > 0) {
                    element.LabTests.forEach(test => {
                        this.bookingOrderDetails.TestIds.push({ Id: test.Id, TestName: test.LabTestName });
                    });
                }
                this.bookingOrderDetails.Package.push({ Name: element.LabPackageName, TestIds: this.bookingOrderDetails.TestIds });
            }
        });
        this.profilesComponent.profiles.forEach(element => {
            let selectedTests: any = [];
            if (element.Selected) {
                if (element.LabTests.length > 0) {
                    element.LabTests.forEach(test => {
                        selectedTests.push({ Id: test.Id, TestName: test.LabTestName });
                        this.bookingOrderDetails.TestIds.push({ Id: test.Id, TestName: test.LabTestName });
                    });
                }
                this.bookingOrderDetails.Profile.push({ Name: element.LabProfileName, TestIds: selectedTests });
            }
        });
        this.testsComponent.tests.forEach(element => {
            let selectedTests: any = [];
            if (element.Selected) {
                selectedTests.push({ Id: element.Id, TestName: element.LabTestName });
                this.bookingOrderDetails.TestIds.push({ Id: element.Id, TestName: element.LabTestName });
                this.bookingOrderDetails.Test.push({ Name: element.LabTestName, TestIds: selectedTests });
            }
        });
        if (this.bookingOrderDetails.TestIds.length > 0) {
            this.savePatientDetailsBeforeBooking();
        }
        else {
            this.count = 1;
            abp.notify.error("Please select an item");
        }
    }
    savePatientDetailsBeforeBooking() {
        let testIds = [];
        this.bookingOrderDetails.TestIds.forEach(element => {
            testIds.push({ TestId: element.Id, Description: element.TestName });
        });
        let patientDetails = {
            PatientId: this.bookingOrderDetails.PatientId,
            SampleCollectedDate: new Date(),
            TestsBooked: testIds
        }
        this._userService.create(patientDetails, "/api/services/app/Lims/CreateLabTestForPatient")
            .finally(() => { })
            .subscribe((res: any) => {
                if (res && res.id) {
                    this.bookingOrderDetails.BookingOrderId = res.id;
                    this.count++
                }
            });
    }
    getVerifyBookingOrder() {
        this.count++;
    }
    getActiveBatchList() {
        this._userService.getAll(20, 1, "/api/services/app/Lims/GetBatchList?")
            .finally(() => {
                //finishedCallback();
            })
            .subscribe((result: any) => {
                this.batchList = result.items;
                this.batchList.forEach(element => {
                    element["Selected"] = false;
                });
                //this.showPaging(result, pageNumber);
            });

    }
    prev() {
        if (this.count > 0)
            this.count--;
        else
            this.count = 0;
    }
    getSuccessResponse() {
        let testIds = [];
        let batchId = "";
        this.bookingOrderDetails.TestIds.forEach(element => {
            testIds.push({ TestId: element.Id, Description: element.TestName });
        });
        this.batchList.forEach(element => {
            if (element.Selected) {
                batchId = element.id;
            }
        });
        let assignToBatchObj = {
            BookedPackageId: this.bookingOrderDetails.BookingOrderId,
            BatchDetailsId: batchId.toString(),
            AssignedTests: testIds
        }
        if (batchId && batchId != "") {
            this._userService.create(assignToBatchObj, "/api/services/app/Lims/AssignSamplesToBatch")
                .finally(() => { })
                .subscribe((res: any) => {
                   
                        // this.bookingOrderDetails.BookingOrderId = res.result;
                        // this.count++
                        this.router.navigateByUrl('/app/samplestatus');
                    
                });
        }
        else
            abp.notify.error("Please assign a batch");
    }
    print(){
        abp.notify.error("Successfully printted");
    }
}
