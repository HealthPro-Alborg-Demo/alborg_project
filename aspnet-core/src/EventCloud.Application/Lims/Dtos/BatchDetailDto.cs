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
}
