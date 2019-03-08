using Microsoft.EntityFrameworkCore.Migrations;

namespace EventCloud.Migrations
{
    public partial class _07Mar2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TestId",
                table: "LabTest",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TestId",
                table: "LabTest");
        }
    }
}
