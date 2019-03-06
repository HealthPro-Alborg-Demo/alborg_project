using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.Timing;
using Abp.UI;
using EventCloud.Domain.Events;
using System;

using System.ComponentModel.DataAnnotations.Schema;

namespace EventCloud.LIMS.Package
{
    [Table("HealthPackage")]
    public class HealthPackage : FullAuditedEntity<Guid>, IMustHaveTenant
    {
        public virtual int TenantId { get; set; }
        public virtual string LabPackageName { get; protected set; }
        public virtual string LabPackageDescription { get; protected set; }
        public virtual string LabPackageCode { get; protected set; }
        public virtual string ImageUrl { get; protected set; }
        public virtual Gender Gender { get; protected set; }
        public virtual string AgeGroup { get; protected set; }
        public virtual Decimal Price { get; protected set; }

        protected HealthPackage()
        {

        }

        public static HealthPackage Create(int tenantId,string packageName, string packageDescription, string packageCode,
                                            string imgUrl, Gender gender, string ageGroup, decimal price)
        {
            var @healthPackage = new HealthPackage
            {
                Id = Guid.NewGuid(),
                TenantId = tenantId,
                LabPackageName = packageName,
                LabPackageCode = packageCode,
                ImageUrl = imgUrl,
                Gender = gender,
                AgeGroup = ageGroup,
                Price = price
            };

            return healthPackage;
         }
    }

    public enum Gender
    {
        Male = 0,
        Female =1
    }
}
