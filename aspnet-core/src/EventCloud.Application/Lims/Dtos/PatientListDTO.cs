using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using EventCloud.LIMS.Package;
using System;
using System.Collections.Generic;
using System.Text;

namespace EventCloud.Lims.Dtos
{
    [AutoMapFrom(typeof(Patient))]
    public class PatientListDTO: FullAuditedEntityDto<Guid>
    {
        public string FirstName { get;  set; }
        public string LastName { get;  set; }
        public int Age { get;  set; }
        public string Phone { get;  set; }
        public string Email { get;  set; }
        public Gender Gender { get;  set; }
        public decimal Weight { get;  set; }
        public decimal Height { get;  set; }
    }
}
