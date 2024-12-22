using DataAccess;
using Service;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAnyOrigin",
		builder =>
		{
			builder.AllowAnyOrigin()
				   .AllowAnyHeader()
				   .AllowAnyMethod();
		});
});

var sqlConnectionString = builder.Configuration.GetConnectionString("FurFriendzDb");
if (string.IsNullOrEmpty(sqlConnectionString))
{
	throw new NullReferenceException($@"Connectionstring is null or empty!");
}
builder.Services.AddFurFriendzDb(sqlConnectionString);
builder.Services.AddAPIServices();
var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
