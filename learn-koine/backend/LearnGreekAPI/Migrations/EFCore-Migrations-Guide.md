# Entity Framework Core Migrations & Database Update Guide

This guide explains **how to create migrations** and **update your database** schema using Entity Framework Core in a .NET project.

---

## What Are Migrations?

- **Migrations** let you incrementally change your database schema to keep it in sync with your data model classes in code.
- Each migration is a set of C# (and underlying SQL) instructions for changes like adding tables/columns or updating types.
- After creating a migration, you run a command to **apply** these changes to your database.

---

## Prerequisites

- EF Core CLI Tool (`dotnet-ef`) is installed globally:
  
  ```sh
  dotnet tool install --global dotnet-ef
  ```
  
- Your project references:
  - `Microsoft.EntityFrameworkCore`
  - `Npgsql.EntityFrameworkCore.PostgreSQL` (for PostgreSQL)
  - `Microsoft.EntityFrameworkCore.Design`

- Your `DbContext` is set up and registered in `Program.cs`.
- You have a valid database connection string in `appsettings.json`.

---

## 1. Creating a Migration

Whenever you **change your data model** (add/edit/remove an entity or property):

1. **Make your model changes** (edit your C# classes and `DbContext`).

2. **Create a new migration:**

   ```sh
   dotnet ef migrations add <MigrationName>
   ```

   > Replace `<MigrationName>` with a descriptive name, e.g. `AddUserProfile` or `UpdateCourseTable`.

3. This generates new migration files under your `Migrations` directory describing the changes to apply.

**Example:**
```sh
dotnet ef migrations add AddUserTable
```

---

## 2. Applying Migrations (Update the Database)

To actually create or update the database schema to match your migrations:

```sh
dotnet ef database update
```

- EF Core checks which migrations haven't been applied yet (using the `__EFMigrationsHistory` table in your database).
- EF Core applies those migrations in order, running the required SQL to update your schema.

---

## 3. Common Workflow

| Step                | Command Example                                  | What It Does                                |
|---------------------|--------------------------------------------------|---------------------------------------------|
| Edit model          | –                                                | Change or add C# classes                    |
| Add migration       | `dotnet ef migrations add AddXyz`                | Generates migration files                   |
| Update database     | `dotnet ef database update`                      | Applies any pending migrations              |

---

## 4. Other Useful EF Migrations Commands

```sh
dotnet ef migrations list               # See all migrations
dotnet ef migrations remove             # Remove the last (unapplied) migration
dotnet ef database update <migration>   # Update database to a specific migration
dotnet ef database drop                 # Drop the database (!dangerous!)
```

---

## 5. Where Migration State is Tracked

- Each applied migration is logged in a special table called `__EFMigrationsHistory` in your database.
- Migrations are only applied once.

---

## Example Workflow

1. Add a property to `User` model, e.g., `public string Email { get; set; }`
2. Create a migration:
   ```sh
   dotnet ef migrations add AddUserEmail
   ```
3. Apply the migration:
   ```sh
   dotnet ef database update
   ```
4. The `Email` column is now created in the database table.

---

## Troubleshooting

- **No `DbContext` found?** Make sure your context is set up and registered in your `Program.cs`, and you run `dotnet ef` from the project folder containing your `.csproj`.
- **No primary key error?** Every entity/class to be migrated must have at least one property marked as a primary key.
- **Connection error?** Double check your connection string and DB credentials in `appsettings.json`.

---

## Resources

- [EF Core Docs: Migrations Overview](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/)
- [dotnet-ef CLI reference](https://learn.microsoft.com/en-us/ef/core/cli/dotnet)

---

Happy coding!