using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addlisting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PetSittingListings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RequestingUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "date", nullable: false),
                    RequestDate = table.Column<DateOnly>(type: "date", nullable: false),
                    PetSitterId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PetSittingListings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PetSittingListings_Users_PetSitterId",
                        column: x => x.PetSitterId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PetSittingListings_Users_RequestingUserId",
                        column: x => x.RequestingUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_PetSittingListings_PetSitterId",
                table: "PetSittingListings",
                column: "PetSitterId");

            migrationBuilder.CreateIndex(
                name: "IX_PetSittingListings_RequestingUserId",
                table: "PetSittingListings",
                column: "RequestingUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PetSittingListingPet");

            migrationBuilder.DropTable(
                name: "PetSittingListings");
        }
    }
}
