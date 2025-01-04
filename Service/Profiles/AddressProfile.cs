using AutoMapper;
using DataAccess.Entities;
using DataAccess.Types;
using Service.Models;

namespace Service.Profiles;

public class AddressProfile :Profile
{
	public AddressProfile()
	{
		CreateMap<Address, AddressDTO>();
	}
}
