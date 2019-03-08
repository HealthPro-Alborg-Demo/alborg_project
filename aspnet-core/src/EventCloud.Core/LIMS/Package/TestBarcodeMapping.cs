using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EventCloud.LIMS.Package
{
    [Table("TestBarcodeMapping")]
    public class TestBarcodeMapping: FullAuditedEntity<Guid>, IMustHaveTenant
    {
        protected TestBarcodeMapping()
        {

        }
        public int TenantId { get; set; }
        public Guid BookedPackageId { get; protected set; }
        public int BarCodeId { get; protected set; }
        public Guid BatchDetailsId { get; protected set; }
        public List<TestBarcodeDetails> TestBarcode { get; set; }

        public static TestBarcodeMapping Create(int tenantId, Guid bookedPackageId, int barcodeId, 
            Guid batchId, List<TestBarcodeDetails> testList)
        {
            var mapper = new TestBarcodeMapping
            {
                TenantId = tenantId,
                BookedPackageId = bookedPackageId,
                BarCodeId = barcodeId,
                BatchDetailsId = batchId,
                TestBarcode = testList
            };
            return mapper;
        }

    }

    public class TestBarcodeDetails : Entity
    {
        public int TestId { get; set; }
        public string TestDescription { get; set; }
        [ForeignKey("TestBarcodeMapping")]
        public Guid BarcodeTestId { get; set; }
    }
}
