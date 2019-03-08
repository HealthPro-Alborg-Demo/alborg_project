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
        private readonly IRepository<BookedPackage, Guid> _bookedPackageRepository;
        private readonly IRepository<TestBarcodeMapping, Guid> _barcodeMapperRepository;

        public HealthPackageManager(
            IRepository<HealthPackage, Guid> packageRepository,
            IRepository<Patient, Guid> patientRepository,
            IRepository<BatchDetails, Guid> batchRepo,
            IRepository<BookedPackage, Guid> bookedPackageRepo,
            IRepository<TestBarcodeMapping, Guid> barcodeMapperRepo
            )
        {
            _packageRepository = packageRepository;
            _patientRepository = patientRepository;
            _batchRepository = batchRepo;
            _bookedPackageRepository = bookedPackageRepo;
            _barcodeMapperRepository = barcodeMapperRepo;
        }

        public async Task AssignTestToBatch(TestBarcodeMapping barcodeMapper)
        {
            await _barcodeMapperRepository.InsertAsync(barcodeMapper);
        }

        public async Task CreateBatchAsync(BatchDetails batchDetails)
        {
            await _batchRepository.InsertAsync(batchDetails);
        }

        public async Task CreatePackageAsync(HealthPackage healthPackage)
        {
           await _packageRepository.InsertAsync(healthPackage);
        }

        public async Task<Guid> CreatePackageBookingAsync(BookedPackage bookedPackage)
        {
            await _bookedPackageRepository.InsertAsync(bookedPackage);
            return bookedPackage.Id;
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
