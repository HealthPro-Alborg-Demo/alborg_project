using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EventCloud.LIMS.Package
{
    [Table("BatchDetails")]
    public class BatchDetails: FullAuditedEntity<Guid>, IMustHaveTenant
    {
        protected BatchDetails()
        {

        }
        public int TenantId { get; set; }
        public string BatchNumber { get; protected set; }
        public string BatchDate { get; protected set; }
        public string SampleType { get; protected set; }
        public int Capacity { get; protected set; }
        public int NumberOfSamplesPresent { get; protected set; }
        public int NumberOfSamplesLeft { get; protected set; }

        public static BatchDetails Create(int tenantId, string batchNumber, string batchDate, string sampleType,
                                            int capacity)
        {
            var @batchDetails = new BatchDetails
            {
                TenantId = tenantId,
                BatchNumber = batchNumber,
                BatchDate = batchDate,
                SampleType = sampleType,
                Capacity = capacity,
                NumberOfSamplesPresent = 0,
                NumberOfSamplesLeft = capacity
            };
            return batchDetails;
        }
    }
}
