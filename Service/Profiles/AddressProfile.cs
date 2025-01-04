using AutoMapper;
using DataAccess.Entities;
using DataAccess.Models;
using Service.Models;

namespace Service.Profiles;

public class AddressProfile :Profile
{
	public AddressProfile()
	{
		CreateMap<Address, AddressDTO>();
	}
}
