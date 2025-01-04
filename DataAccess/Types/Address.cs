namespace DataAccess.Types;

public class Address
{
    public string StreetName { get; set; }
    public string BuildingNumber { get; set; }
    public string? ApartmentNumber { get; set; }
    public string City { get; set; }
    public float? Latitude { get; set; }
    public float? Longitude { get; set; }
}
