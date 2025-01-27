﻿
using DataAccess.Entities;
using DataAccess.Repository.Abstractions;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace DataAccess.Repository;

public class PetRepository : IPetRepository
{
	protected readonly FurFriendzContext _context;

	public PetRepository(FurFriendzContext context)
	{
		_context = context;
	}

	public virtual async Task<IEnumerable<Pet>> GetAllAsync()
	{
		try
		{
			return await _context.Pets
							 .Include(p => p.Breed)
							 .ToListAsync();
		}
		catch (Exception ex)
		{
			throw new Exception($"Error when retrieving data from DB: {ex.Message}", ex);
		}
	}

	public virtual async Task<Pet?> FindByIdAsync(int id)
	{
		try
		{
			return await _context.Pets
							 .Include(p => p.Breed)
							 .FirstOrDefaultAsync(p => p.Id == id);
		}
		catch (Exception ex)
		{
			throw new Exception($"Error when retrieving entity by id {id}, {ex.Message}", ex);
		}
	}
	public virtual async Task<Pet> PostAsync(Pet entity)
	{
		try
		{
			var existingBreed = _context.ChangeTracker.Entries<Breed>()
			.FirstOrDefault(e => e.Entity.Id == entity.Breed.Id)?.Entity;

					if (existingBreed == null)
					{
						_context.Attach(entity.Breed);
					}
					else
					{
						entity.Breed = existingBreed; // Use the already tracked instance
					}
			await _context.Set<Pet>().AddAsync(entity);
			await _context.SaveChangesAsync();
			return entity;
		}
		catch (Exception ex)
		{
			throw new Exception($"Error when adding data to DB: {ex.Message}", ex);
		}
	}

	public virtual async Task<Pet> UpdateAsync(Pet entity)
	{
		try
		{
			_context.Set<Pet>().Entry(entity).State = EntityState.Modified;

			if(entity.Breed != null)
				_context.Entry(entity.Breed).State = EntityState.Modified;

			await _context.SaveChangesAsync();
			return entity;
		}
		catch (Exception ex)
		{
			throw new Exception($"Error when updating data from DB: {ex.Message}", ex);
		}
	}

	public virtual async Task DeleteAsync(int id)
	{
		try
		{
			var entity = await _context.Set<Pet>().FindAsync(id);
			if (entity == null)
			{
				return;
			}
			_context.Set<Pet>().Remove(entity);
			await _context.SaveChangesAsync();
		}
		catch (Exception ex)
		{
			throw new Exception($"Error when deleting data from DB: {ex.Message}", ex);
		}
	}
}
