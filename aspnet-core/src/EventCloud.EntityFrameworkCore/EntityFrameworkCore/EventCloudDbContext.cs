using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using EventCloud.Authorization.Roles;
using EventCloud.Authorization.Users;
using EventCloud.Events;
using EventCloud.MultiTenancy;
using EventCloud.LIMS.Package;

namespace EventCloud.EntityFrameworkCore
{
    public class EventCloudDbContext : AbpZeroDbContext<Tenant, Role, User, EventCloudDbContext>
    {
        public virtual DbSet<Event> Events { get; set; }

        public virtual DbSet<EventRegistration> EventRegistrations { get; set; }
        public virtual DbSet<HealthPackage> HealthPackages { get; set; }
        public virtual DbSet<Patient> Patient { get; set; }
        public virtual DbSet<BatchDetails> Batch { get; set; }
        public virtual DbSet<BookedPackage> BookedPackages { get; set; }
        public virtual DbSet<TestBarcodeMapping> TestBarcodeMapping { get; set; }
        public EventCloudDbContext(DbContextOptions<EventCloudDbContext> options)
            : base(options)
        {
        }
    }
}
