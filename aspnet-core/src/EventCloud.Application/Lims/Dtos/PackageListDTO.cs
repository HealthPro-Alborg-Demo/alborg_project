using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using EventCloud.LIMS.Package;
using System;

namespace EventCloud.Lims.Dtos
{
    [AutoMapFrom(typeof(HealthPackage))]
    public class PackageListDTO:FullAuditedEntityDto<Guid>
    {
        public string LabPackageName { get; set; }
        public string LabPackageDescription { get; set; }
        public string LabPackageCode { get; set; }
        public string ImageUrl { get; set; }
        public string AgeGroup { get; set; }
        public decimal Price { get; set; }
        public Gender Gender { get; set; }
    }
}
