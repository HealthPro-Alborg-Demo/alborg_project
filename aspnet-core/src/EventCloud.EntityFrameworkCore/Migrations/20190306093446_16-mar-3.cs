using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EventCloud.Migrations
{
    public partial class _16mar3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BatchDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    TenantId = table.Column<int>(nullable: false),
                    BatchNumber = table.Column<string>(nullable: true),
                    BatchDate = table.Column<string>(nullable: true),
                    SampleType = table.Column<string>(nullable: true),
                    Capacity = table.Column<int>(nullable: false),
                    NumberOfSamplesPresent = table.Column<int>(nullable: false),
                    NumberOfSamplesLeft = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BatchDetails", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BatchDetails");
        }
    }
}
