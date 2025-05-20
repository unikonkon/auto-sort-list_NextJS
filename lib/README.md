# User Summary API

This module provides functionality to fetch and summarize user data from an external API. It groups users by department and provides aggregated statistics.

## API Usage

### HTTP Endpoint

```
GET /api/summary
```

Returns a JSON object with departments as keys and summary objects as values.

Example response:

```json
{
  "Marketing": {
    "male": 5,
    "female": 3,
    "ageRange": "24-45",
    "hair": {
      "brown": 3,
      "black": 2,
      "blonde": 3
    },
    "addressUser": {
      "JohnDoe": "12345",
      "JaneSmith": "67890"
    }
  },
  "Engineering": {
    "male": 12,
    "female": 4,
    "ageRange": "22-58",
    "hair": {
      "brown": 6,
      "black": 4,
      "blonde": 2,
      "gray": 4
    },
    "addressUser": {
      "BobJohnson": "54321",
      "AliceWilliams": "13579"
    }
  }
}
```

### gRPC Service

The API also provides a gRPC service definition in `proto/user_summary.proto`.

To use the gRPC service:

1. Generate client code using `protoc`
2. Connect to the service
3. Call the `GetSummary` RPC method

## Implementation Details

The implementation uses the following components:

- `types/user.ts` - TypeScript interfaces for user data and summaries
- `services/userService.ts` - Core functionality for fetching and transforming data
- `api/summary/route.ts` - Next.js API route handler

The data transformation is optimized for performance with:
- Efficient single-pass processing where possible
- Proper handling of memory references
- Clear separation of concerns between data fetching and processing 