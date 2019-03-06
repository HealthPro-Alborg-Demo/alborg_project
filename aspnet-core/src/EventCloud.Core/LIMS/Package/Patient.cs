using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using EventCloud.LIMS.Package;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EventCloud.LIMS.Package

{
    [Table("Patient")]
    public class Patient: FullAuditedEntity<Guid>, IMustHaveTenant
    {
        protected Patient()
        {

        }

        public int TenantId { get; set; }
        public virtual string FirstName { get; protected set; }
        public string LastName { get; protected set; }
        public int Age { get; protected set; }
        public string Phone { get; protected set; }
        public string Email { get; protected set; }
        public Gender Gender { get; protected set; }
        public decimal Weight { get; protected set; }
        public decimal Height { get; protected set; }

        public static Patient Create(int tenantId, string firstName, string lastName, int age, string phone, 
                                    string eMail, Gender gender,
                                    decimal weight, decimal height)
        {
            var @patient = new Patient
            {
                TenantId = tenantId,
                FirstName = firstName,
                LastName = lastName,
                Age = age,
                Phone = phone,
                Email = eMail,
                Gender = gender,
                Weight = weight,
                Height = height
            };
            return patient;
        }
    }
}
