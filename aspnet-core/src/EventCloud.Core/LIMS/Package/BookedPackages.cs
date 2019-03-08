using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EventCloud.LIMS.Package
{
    [Table("BookedPackage")]
    public class BookedPackage: FullAuditedEntity<Guid>, IMustHaveTenant
    {
        protected BookedPackage()
        {

        }
        public int TenantId { get; set; }
        public Guid PatientId { get; protected set; }
        public int BarCodeId { get; protected set; }
        public string SampleCollectedDate { get; protected set; }
        //[ForeignKey("LabTestsId")]
        public List<LabTest> LabTests { get; protected set; }
        public static BookedPackage Create(int tenantId, Guid patientId,int barCodeId,string collectionDate, List<LabTest> labTests)
        {
            var bookedPackage = new BookedPackage
            {
                TenantId=tenantId,
                PatientId=patientId,
                BarCodeId=barCodeId,
                SampleCollectedDate=collectionDate,
                LabTests=labTests
            };

            return bookedPackage;
        }

    }

    public class LabTest:Entity
    {
        public int TestId { get; set; }
        public string TestDescription { get; set; }
        [ForeignKey("BookedPackage")]
        public Guid BookedPackageId { get; set; }
    }
}
