using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EventCloud.LIMS.Package
{
    public class HealthPackageManager : IHealthPackageManager
    {
        private readonly IRepository<HealthPackage, Guid> _packageRepository;
        private readonly IRepository<Patient, Guid> _patientRepository;
        private readonly IRepository<BatchDetails, Guid> _batchRepository;

        public async Task CreateBatchAsync(BatchDetails batchDetails)
        {
            await _batchRepository.InsertAsync(batchDetails);
        }

        public async Task CreatePackageAsync(HealthPackage healthPackage)
        {
           await _packageRepository.InsertAsync(healthPackage);
        }

        public async Task CreatePatientAsync(Patient patient)
        {
            await _patientRepository.InsertAsync(patient);
        }

        public Task<HealthPackage> GetPackageAsync(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
