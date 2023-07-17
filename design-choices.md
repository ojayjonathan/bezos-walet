# Design Choices:

## 1. Database Design:

To support the new functionality of multiple tags for merchants, the following changes were made to the database design:

- Added a new table called "tags" to keep track of user-defined tags:

  ```sql
      tags {
      id INT
      name VARCHAR
      }
  ```

- Modified the "merchants" table to include a foreign key reference to the "tags" table:

      ``` sql
      merchants {
      id INT
      name VARCHAR (unique)
      tagId INT (nullable)
      }

      ```

  By introducing the "tags" table and updating the "merchants" table, we can associate each merchant with a tag

## 2. Server:

The server-side implementation was extended to include additional API endpoints to support the new functionality:

- Added an API endpoint to create a new tag and save it to the database.
- Added an API endpoint to retrieve a list of all available tags.
- Added API endpoints to associate a merchant with a specific tag and remove a merchant from a tag.
- These API endpoints allow the frontend to interact with the server and perform operations such as creating new tags, associating merchants with tags, and removing merchants from tags.

## 3. Frontend:

The frontend was refactored to provide the necessary UI components and interactions for the extended functionality. This includes:

- Adding UI elements to create new tags and associate them with merchants.
- Displaying a list of available tags for selection when changing a merchant's tag using a dropdown.
- Allowing Faris to remove a tag association from a merchant.
- Enhancing the UI to display the total amount of money spent per tag, both in terms of the dollar amount and as a percentage of total spending.
