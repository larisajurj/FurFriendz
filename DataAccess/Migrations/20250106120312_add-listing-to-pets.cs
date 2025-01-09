using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addlistingtopets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "PetPetSittingListings",
                columns: table => new
                {
                    ListingPetsId = table.Column<int>(type: "int", nullable: false),
                    ListingsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PetPetSittingListings", x => new { x.ListingPetsId, x.ListingsId });
                    table.ForeignKey(
                        name: "FK_PetPetSittingListings_PetSittingListings_ListingsId",
                        column: x => x.ListingsId,
                        principalTable: "PetSittingListings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PetPetSittingListings_Pets_ListingPetsId",
                        column: x => x.ListingPetsId,
                        principalTable: "Pets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PetPetSittingListings_ListingsId",
                table: "PetPetSittingListings",
                column: "ListingsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PetPetSittingListings");

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
    }
}
