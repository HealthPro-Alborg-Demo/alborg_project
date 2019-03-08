using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EventCloud.Migrations
{
    public partial class _07Mar3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TestBarcodeMapping",
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
                    BookedPackageId = table.Column<Guid>(nullable: false),
                    BarCodeId = table.Column<int>(nullable: false),
                    BatchDetailsId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestBarcodeMapping", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TestBarcodeDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TestId = table.Column<int>(nullable: false),
                    TestDescription = table.Column<string>(nullable: true),
                    BarcodeTestId = table.Column<Guid>(nullable: false),
                    TestBarcodeMappingId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestBarcodeDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestBarcodeDetails_TestBarcodeMapping_TestBarcodeMappingId",
                        column: x => x.TestBarcodeMappingId,
                        principalTable: "TestBarcodeMapping",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TestBarcodeDetails_TestBarcodeMappingId",
                table: "TestBarcodeDetails",
                column: "TestBarcodeMappingId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TestBarcodeDetails");

            migrationBuilder.DropTable(
                name: "TestBarcodeMapping");
        }
    }
}
