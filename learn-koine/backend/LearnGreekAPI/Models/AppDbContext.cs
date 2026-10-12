using Microsoft.EntityFrameworkCore;
using LearnGreekAPI.Models.Data;

namespace LearnGreekAPI.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        required public DbSet<User> Users { get; set; }
        required public DbSet<VerseScore> VerseScores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<VerseScore>()
                .HasOne(vs => vs.User)
                .WithMany()
                .HasForeignKey(vs => vs.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<VerseScore>()
                .HasIndex(vs => new { vs.UserId, vs.VerseReference })
                .IsUnique();
        }
    }
}
