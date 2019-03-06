using EventCloud.LIMS.Package;
using System;
using System.Collections.Generic;
using System.Text;

namespace EventCloud.Lims.Dtos
{
    public class CreatePackageInput
    {
        public string LabPackageName { get; set; }
        public string LabPackageDescription { get; set; }
        public string LabPackageCode { get; set; }
        public string ImageUrl { get; set; }
        public string AgeGroup { get; set; }
        public decimal Price { get; set; }
        public Gender Gender { get; set; }
    }

    public class CreatePatientInput
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public Gender Gender { get; set; }
        public decimal Weight { get; set; }
        public decimal Height { get; set; }
    }

    public class CreateBatchInput
    {
        public string BatchNumber { get; set; }
        public string BatchDate { get; set; }
        public string SampleType { get; set; }
        public int Capacity { get; set; }
        
    }

    public class PatientTestInput
    {
        public Guid PatientId { get; set; }
        public int BarCodeId { get; set; }
        public string SampleCollectedDate { get; set; }
        public int TestId { get; set; }
        public string TestDescription { get; set; }
    }

    public class LabTests
    {
    }
}
