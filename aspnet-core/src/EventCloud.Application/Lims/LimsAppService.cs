using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using EventCloud.Lims.Dtos;
using EventCloud.LIMS.Package;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Abp.AutoMapper;
using Abp.Runtime.Session;

namespace EventCloud.Lims
{
    public class LimsAppService : EventCloudAppServiceBase, ILimsAppService
    {
        private readonly IHealthPackageManager _healthPackageManager;
        private readonly IRepository<HealthPackage, Guid> _healthPackageRepository;
        private readonly IRepository<Patient, Guid> _patientRepository;
        private readonly IRepository<BatchDetails, Guid> _batchesRepository;
        //private readonly IRepository<LabTest> _labRepository;
        private readonly IRepository<BookedPackage, Guid> _bookedPackageRepository;
        private readonly IRepository<TestBarcodeMapping, Guid> _barcodeMapperRepository;
        public LimsAppService(IHealthPackageManager healthPackageManager,
            IRepository<HealthPackage,Guid> limsRepository, IRepository<Patient, Guid> patientRepository,
            IRepository<BatchDetails, Guid> batchRepository, IRepository<BookedPackage, Guid> bookedPackageRepo,
            IRepository<TestBarcodeMapping, Guid> barcodeMapperRepo)
        {
            _healthPackageManager = healthPackageManager;
            _healthPackageRepository = limsRepository;
            _patientRepository = patientRepository;
            _batchesRepository = batchRepository;
            _bookedPackageRepository = bookedPackageRepo;
            _barcodeMapperRepository = barcodeMapperRepo;
        }
        public async Task<ListResultDto<PackageListDTO>> GetPackageListAsync()
        {
            var healthPackages = await _healthPackageRepository.GetAll().ToListAsync();
            return new ListResultDto<PackageListDTO>(healthPackages.MapTo<List<PackageListDTO>>());
        }

        public async Task CreatePackage(CreatePackageInput input)
        {
            var package = HealthPackage.Create(AbpSession.GetTenantId(),
                input.LabPackageName, input.LabPackageDescription, input.LabPackageCode, input.ImageUrl,
                input.Gender, input.AgeGroup, input.Price);
            await _healthPackageManager.CreatePackageAsync(package);
        }

        public async Task CreatePatient(CreatePatientInput input)
        {
            var patient = Patient.Create(AbpSession.GetTenantId(), input.FirstName, input.LastName, input.Age, 
                input.Phone, input.Email, input.Gender, input.Weight, input.Height);

            await _healthPackageManager.CreatePatientAsync(patient);
        }

        public async Task<ListResultDto<PatientListDTO>> GetPatientList()
        {
            var patients = await _patientRepository.GetAll().ToListAsync();
            return new ListResultDto<PatientListDTO>(patients.MapTo<List<PatientListDTO>>());
        }

        public async Task CreateBatch(CreateBatchInput input)
        {
            var batchDetails = BatchDetails.Create(AbpSession.GetTenantId(), input.BatchNumber, 
                input.BatchDate, input.SampleType, input.Capacity);
            await _healthPackageManager.CreateBatchAsync(batchDetails);
        }

        public async Task<ListResultDto<BatchDetailDto>> GetBatchList()
        {
            var batches = await _batchesRepository.GetAll().ToListAsync();
            return new ListResultDto<BatchDetailDto>(batches.MapTo<List<BatchDetailDto>>());
        }

        public async Task<PatientTestTemp> CreateLabTestForPatient(PatientTestInput patientTest)
        {
            var labTests = new List<LabTest>();
            patientTest.TestsBooked.ForEach(p => labTests.Add(new LabTest { TestId = p.TestId, TestDescription = p.TestDescription }));

            var bookedTests = BookedPackage.Create(AbpSession.GetTenantId(), patientTest.PatientId,
                patientTest.BarCodeId, patientTest.SampleCollectedDate, labTests);
            var id = await _healthPackageManager.CreatePackageBookingAsync(bookedTests);
            return new PatientTestTemp { Id = id };
            
            
        }

        public async Task <ListResultDto<SegregationListDTO>> GetSeggregatedList(Guid labTestId)
        {
            var bookedPackage = await _bookedPackageRepository.GetAllIncluding(p => p.LabTests).FirstOrDefaultAsync(p => p.Id == labTestId);
            //var bookedPackage = _bookedPackageRepository.GetAll().Include(e=>e.LabTests);
            var bookedPackageTests = bookedPackage.LabTests;
            var segregationList = new List<SegregationListDTO>();
            bookedPackageTests.ForEach(p => segregationList.Add(new SegregationListDTO
            {
                TestDescription = p.TestDescription,
                TestId = p.Id,
                TestType = "Blood"
            }));
            return new ListResultDto<SegregationListDTO>(segregationList);
        }

        public async Task AssignSamplesToBatch(AssignToBatch inputData)
        {
            var labTests = new List<TestBarcodeDetails>();
            inputData.AssignedTests.ForEach(p => labTests.Add(new TestBarcodeDetails { TestId = p.TestId, TestDescription = p.TestDescription }));
            var assignedBarcode = TestBarcodeMapping.Create(AbpSession.GetTenantId(), 
                        inputData.BookedPackageId, inputData.BarCodeId,inputData.BatchDetailsId, labTests);
            await _healthPackageManager.AssignTestToBatch(assignedBarcode);
        }

        public async Task<ListResultDto<BatchTestDto>> GetBatchTestDetails()
        {
            var batchMapper = await _barcodeMapperRepository.GetAllIncluding(p => p.TestBarcode).ToListAsync();
            var returnResult = batchMapper.MapTo<List<BatchTestDto>>();
            //returnResult[0].BatchTestDetails=batchMapper[0]
            return new ListResultDto<BatchTestDto>(returnResult);
        }
    }
    public class PatientTestTemp
    {
        public Guid Id { get; set; }
    }



}
