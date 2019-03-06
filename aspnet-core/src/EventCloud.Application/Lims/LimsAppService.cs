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

        public LimsAppService(IHealthPackageManager healthPackageManager,
            IRepository<HealthPackage,Guid> limsRepository)
        {
            _healthPackageManager = healthPackageManager;
            _healthPackageRepository = limsRepository;
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
            var patients = await _healthPackageRepository.GetAll().ToListAsync();
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

        public async Task CreateLabTestForPatient(PatientTestInput packageIncidentInput)
        {

        }

        //public async Task<ListResultDto<SegregationListDTO>> GetSeggregatedList(Guid labTestId)
        //{
        //    await null;
        //}

        public async Task AssignSamplesToBatch(Guid labTestId, int batchId)
        {

        }
    }

   
}
