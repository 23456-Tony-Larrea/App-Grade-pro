using System;
using backend.src.core.entities;
using Microsoft.EntityFrameworkCore;

namespace backend.src.infraestructure.data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<LoginRequest> LoginRequest { get; set; }

    }
}
