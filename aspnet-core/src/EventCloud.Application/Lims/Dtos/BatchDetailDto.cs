using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using EventCloud.LIMS.Package;
using System;
using System.Collections.Generic;
using System.Text;

namespace EventCloud.Lims.Dtos
{
    [AutoMapFrom(typeof(BatchDetails))]
    public class BatchDetailDto: FullAuditedEntityDto<Guid>
    {
        public string BatchNumber { get;  set; }
        public string BatchDate { get;  set; }
        public string SampleType { get;  set; }
        public int Capacity { get;  set; }
        public int NumberOfSamplesPresent { get;  set; }
        public int NumberOfSamplesLeft { get;  set; }
    }

    [AutoMapFrom(typeof(TestBarcodeMapping))]
    public class BatchTestDto : FullAuditedEntityDto<Guid>
    {
        public Guid BookedPackageId { get; protected set; }
        public int BarCodeId { get; protected set; }
        public Guid BatchDetailsId { get; protected set; }
        public List<BatchTestDetailsDTO> BatchTestDetails { get; set; }
    }
    [AutoMapFrom(typeof(TestBarcodeDetails))]
    public class BatchTestDetailsDTO
    {
        public int TestId { get; set; }
        public string TestDescription { get; set; }
        public Guid BarcodeTestId { get; set; }
    }
}
