using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addpettolisting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PetSittingListingPet");

            migrationBuilder.AddColumn<int>(
                name: "PetSittingListingsId",
                table: "Pets",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pets_PetSittingListingsId",
                table: "Pets",
                column: "PetSittingListingsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pets_PetSittingListings_PetSittingListingsId",
                table: "Pets",
                column: "PetSittingListingsId",
                principalTable: "PetSittingListings",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pets_PetSittingListings_PetSittingListingsId",
                table: "Pets");

            migrationBuilder.DropIndex(
                name: "IX_Pets_PetSittingListingsId",
                table: "Pets");

            migrationBuilder.DropColumn(
                name: "PetSittingListingsId",
                table: "Pets");

            migrationBuilder.CreateTable(
                name: "PetSittingListingPet",
                columns: table => new
                {
                    PetSittingListingId = table.Column<int>(type: "int", nullable: false),
                    PetId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PetSittingListingPet", x => new { x.PetSittingListingId, x.PetId });
                    table.ForeignKey(
                        name: "FK_PetSittingListingPet_PetSittingListings_PetSittingListingId",
                        column: x => x.PetSittingListingId,
                        principalTable: "PetSittingListings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PetSittingListingPet_Pets_PetId",
                        column: x => x.PetId,
                        principalTable: "Pets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PetSittingListingPet_PetId",
                table: "PetSittingListingPet",
                column: "PetId");
        }
    }
}
