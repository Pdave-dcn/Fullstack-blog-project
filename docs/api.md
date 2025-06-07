# API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

### Sign Up

```http
POST /users/signup
```

Create a new user account.

**Request Body:**

```json
{
  "name": "Full Name",
  "username": "username",
  "password": "password",
  "role": "user" // Optional, defaults to "user". Can be "user" or "author"
}
```

**Response:**

```json
{
  "message": "User created Successfully",
  "user": {
    "id": 1,
    "name": "Full Name",
    "username": "username",
    "role": "user"
  },
  "token": "jwt_token"
}
```

### Login

```http
POST /users/login
```

Authenticate user and return JWT token.

**Request Body:**

```json
{
  "username": "username",
  "password": "password"
}
```

**Response:**

```json
{
  "token": "jwt_token",
  "user": {
    "id": 1,
    "name": "Full Name",
    "username": "username",
    "role": "user"
  }
}
```

## Posts

### Get Recent Posts

```http
GET /posts/recent
```

Fetch recent published posts.

### Get Published Posts

```http
GET /posts/published
```

Fetch all published posts.

### Get Single Post

```http
GET /posts/:postId
```

Fetch a specific post by ID.

### Create Post (Author Only)

```http
POST /posts
```

Create a new post. Requires JWT authentication and author role.

**Request Headers:**

```
Authorization: Bearer jwt_token
```

**Request Body:**

```json
{
  "title": "Post Title",
  "content": "Post Content",
  "status": "draft" // "draft" or "published"
}
```

### Update Post (Author Only)

```http
PUT /posts/:postId
```

Update an existing post. Requires JWT authentication and post ownership.

**Request Headers:**

```
Authorization: Bearer jwt_token
```

**Request Body:**

```json
{
  "title": "Updated Title",
  "content": "Updated Content",
  "status": "published"
}
```

### Delete Post (Author Only)

```http
DELETE /posts/:postId
```

Delete a post. Requires JWT authentication and post ownership.

## Comments

### Create Comment

```http
POST /posts/:postId/comments
```

Create a new comment on a post. Requires JWT authentication.

**Request Headers:**

```
Authorization: Bearer jwt_token
```

**Request Body:**

```json
{
  "content": "Comment content",
  "parentId": null // Optional, for replies
}
```

### Edit Comment

```http
PUT /posts/:postId/comments/:commentId
```

Edit an existing comment. Requires JWT authentication and comment ownership.

**Request Body:**

```json
{
  "content": "Updated comment content"
}
```

### Delete Comment

```http
DELETE /posts/:postId/comments/:commentId
```

Delete a comment. Requires JWT authentication and comment ownership.

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized

```json
{
  "message": "Authentication required"
}
```

### 403 Forbidden

```json
{
  "message": "Access denied"
}
```

### 404 Not Found

```json
{
  "message": "Resource not found"
}
```

### 500 Server Error

```json
{
  "message": "Internal server error"
}
```

## Notes

- All requests that require authentication should include the JWT token in the Authorization header
- Dates are returned in ISO 8601 format
- Pagination is available for list endpoints using `page` and `pageSize` query parameters
- CORS is enabled for localhost:5173 (reader frontend) and localhost:5174 (editor frontend)
