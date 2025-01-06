using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addServiceToListing : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ServiceId",
                table: "PetSittingListings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PetSittingListings_ServiceId",
                table: "PetSittingListings",
                column: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_PetSittingListings_PetSitterServices_ServiceId",
                table: "PetSittingListings",
                column: "ServiceId",
                principalTable: "PetSitterServices",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PetSittingListings_PetSitterServices_ServiceId",
                table: "PetSittingListings");

            migrationBuilder.DropIndex(
                name: "IX_PetSittingListings_ServiceId",
                table: "PetSittingListings");

            migrationBuilder.DropColumn(
                name: "ServiceId",
                table: "PetSittingListings");
        }
    }
}
