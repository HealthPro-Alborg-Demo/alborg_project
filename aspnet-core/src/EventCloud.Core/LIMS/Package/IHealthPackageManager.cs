using Abp.Domain.Services;
using System;
using System.Threading.Tasks;

namespace EventCloud.LIMS.Package
{
    public interface IHealthPackageManager:IDomainService
    {
        Task<HealthPackage> GetPackageAsync(Guid id);
        Task CreatePackageAsync(HealthPackage healthPackage);
        Task CreatePatientAsync(Patient patient);
        Task CreateBatchAsync(BatchDetails batchDetails);
    }
}
