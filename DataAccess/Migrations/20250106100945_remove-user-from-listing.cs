using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class removeuserfromlisting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PetSittingListings_Users_PetSitterId",
                table: "PetSittingListings");

            migrationBuilder.DropIndex(
                name: "IX_PetSittingListings_PetSitterId",
                table: "PetSittingListings");

            migrationBuilder.DropColumn(
                name: "PetSitterId",
                table: "PetSittingListings");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PetSitterId",
                table: "PetSittingListings",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_PetSittingListings_PetSitterId",
                table: "PetSittingListings",
                column: "PetSitterId");

            migrationBuilder.AddForeignKey(
                name: "FK_PetSittingListings_Users_PetSitterId",
                table: "PetSittingListings",
                column: "PetSitterId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
