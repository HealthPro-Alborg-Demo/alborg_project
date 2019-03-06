using Abp.Application.Services;
using Abp.Application.Services.Dto;
using EventCloud.Lims.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EventCloud.Lims
{
    public interface ILimsAppService: IApplicationService
    {
        Task<ListResultDto<PackageListDTO>> GetPackageListAsync();
    }
}
