import { OpenAPIV3 } from "openapi-types";
import swaggerUI from "swagger-ui-express";

const swaggerDocument: OpenAPIV3.Document = {
    openapi: "3.0.0",
    info: {
        title: "AutoRia Api Documentation",
        version: "1.0.0",
        description: "Car marketplace API documentation",
    },
    servers: [
        {
            url: "http://localhost:6000",
            description: "Local server",
        },
    ],
    tags: [
        { name: "Auth", description: "Authentication endpoints" },
        { name: "Users", description: "Users management" },
        { name: "Advertisement", description: "Advertisement for selling car" },
        { name: "Brands", description: "Car brands" },
        { name: "Models", description: "Car models" },
        {
            name: "Requests",
            description:
                "Users can submit requests to add advertisements, brands, or models.",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        schemas: {
            User: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    name: { type: "string" },
                    email: {
                        type: "string",
                        format: "email",
                    },
                    role: { type: "string" },
                    accountType: { type: "string" },
                    isActive: { type: "boolean" },
                    createdAt: {
                        type: "string",
                        format: "date-time",
                    },
                    updatedAt: {
                        type: "string",
                        format: "date-time",
                    },
                },
            },
            Tokens: {
                type: "object",
                properties: {
                    accessToken: { type: "string" },
                    refreshToken: { type: "string" },
                },
            },
            Advertisement: {
                type: "object",
                properties: {
                    price: {
                        type: "object",
                        properties: {
                            original: {
                                type: "object",
                                properties: {
                                    value: {
                                        type: "number",
                                    },
                                    currency: {
                                        type: "string",
                                    },
                                },
                            },
                            converted: {
                                type: "object",
                                properties: {
                                    uah: {
                                        type: "number",
                                    },
                                    usd: {
                                        type: "number",
                                    },
                                    eur: {
                                        type: "number",
                                    },
                                },
                            },
                            exchangeRate: {
                                type: "object",
                                properties: {
                                    usd: {
                                        type: "number",
                                    },
                                    eur: {
                                        type: "number",
                                    },
                                },
                            },
                            exchangeRateDate: {
                                type: "string",
                            },
                        },
                    },
                    location: {
                        type: "object",
                        properties: {
                            region: { type: "string" },
                            country: {
                                type: "string",
                                default: "Ukraine",
                            },
                        },
                    },
                    _id: { type: "string" },
                    userId: { type: "string" },
                    title: { type: "string" },
                    description: { type: "string" },
                    brand: { type: "string" },
                    model: { type: "string" },
                    year: { type: "number" },
                    status: { type: "string" },
                    attempts: { type: "number" },
                    views: { type: "number" },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                },
            },
        },
    },
    paths: {
        "/auth/register": {
            post: {
                tags: ["Auth"],
                summary: "Register new user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    email: { type: "string", format: "email" },
                                    password: {
                                        type: "string",
                                        format: "password",
                                    },
                                },
                                required: ["email", "password", "name"],
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "User successfully registered",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user: {
                                            $ref: "#/components/schemas/User",
                                        },
                                        tokens: {
                                            $ref: "#/components/schemas/Tokens",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Authenticate user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string", format: "email" },
                                    password: {
                                        type: "string",
                                        format: "password",
                                    },
                                },
                                required: ["email", "password"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "User successfully authorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user: {
                                            $ref: "#/components/schemas/User",
                                        },
                                        tokens: {
                                            $ref: "#/components/schemas/Tokens",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/refresh": {
            post: {
                tags: ["Auth"],
                summary: "Refresh tokens",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    refreshToken: { type: "string" },
                                },
                                required: ["refreshToken"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Tokens pair successfully updated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        tokenPair: {
                                            $ref: "#/components/schemas/Tokens",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/me": {
            get: {
                tags: ["Auth"],
                summary: "Get current user profile",
                security: [{ bearerAuth: [] }],
                responses: {
                    "200": {
                        description: "Get current authenticated user",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/users": {
            get: {
                tags: ["Users"],
                summary:
                    "Get all authorized users permission has only managers and admin",
                security: [{ bearerAuth: [] }],
                responses: {
                    "200": {
                        description: "Successfully get authorized users",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/User",
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "No have permission",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/users/{id}": {
            get: {
                tags: ["Users"],
                summary:
                    "Get current user permission has only managers and admin",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "User id",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Successfully get user",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "No have permission",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/users/create-manager": {
            post: {
                tags: ["Users"],
                summary: "Manager created successfully",
                security: [{ bearerAuth: [] }],
                responses: {
                    "200": {
                        description: "Creating manager",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "No have permission",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/users/{id}/block": {
            patch: {
                tags: ["Users"],
                summary: "Block user account by manager or admin",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "User id",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Block user account",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "No have permission",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/users/{id}/activate": {
            patch: {
                tags: ["Users"],
                summary: "Activate user account by manager or admin",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "User id",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Activate user account",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "No have permission",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/users/premium": {
            patch: {
                tags: ["Users"],
                summary: "Buy premium account",
                security: [{ bearerAuth: [] }],
                responses: {
                    "200": {
                        description: "Get premium account",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/adverts": {
            get: {
                tags: ["Advertisement"],
                summary: "Get all advertisements",
                responses: {
                    "200": {
                        description: "Get all advertisements",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Advertisement",
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad Request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ["Advertisement"],
                summary: "Advertisement created successfully",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    title: { type: "string" },
                                    description: { type: "string" },
                                    brand: { type: "string" },
                                    model: { type: "string" },
                                    year: { type: "number" },
                                    price: {
                                        type: "object",
                                        properties: {
                                            original: {
                                                type: "object",
                                                properties: {
                                                    value: {
                                                        type: "number",
                                                    },
                                                    currency: {
                                                        type: "string",
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    location: {
                                        type: "object",
                                        properties: {
                                            region: { type: "string" },
                                            country: {
                                                type: "string",
                                                default: "Ukraine",
                                            },
                                        },
                                    },
                                },
                                required: [
                                    "title",
                                    "description",
                                    "brand",
                                    "model",
                                    "year",
                                    "price",
                                    "location",
                                ],
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Create advertisements",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Advertisement",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad Request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/adverts/{id}": {
            get: {
                tags: ["Advertisement"],
                summary: "Get current advertisement",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Advertisement id",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Get current advertisement",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Advertisement",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad Request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            put: {
                tags: ["Advertisement"],
                summary: "Update advertisement",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Advertisement id",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    title: { type: "string" },
                                    description: { type: "string" },
                                    brand: { type: "string" },
                                    model: { type: "string" },
                                    year: { type: "number" },
                                    price: {
                                        type: "object",
                                        properties: {
                                            original: {
                                                type: "object",
                                                properties: {
                                                    value: {
                                                        type: "number",
                                                    },
                                                    currency: {
                                                        type: "string",
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    location: {
                                        type: "object",
                                        properties: {
                                            region: { type: "string" },
                                            country: {
                                                type: "string",
                                                default: "Ukraine",
                                            },
                                        },
                                    },
                                },
                                required: [
                                    "title",
                                    "description",
                                    "brand",
                                    "model",
                                    "year",
                                    "price",
                                    "location",
                                ],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Successfully updated advertisements",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Advertisement",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad Request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                tags: ["Advertisement"],
                summary: "Successfully remove advertisement",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Advertisement id",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "204": {
                        description: "No content",
                    },
                    "400": {
                        description: "Bad Request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
export { swaggerDocument, swaggerUI };
