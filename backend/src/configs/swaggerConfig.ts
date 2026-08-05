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
            name: "Request",
            description: "Users can submit requests to add brands, or models.",
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
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                },
            },
            Brand: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    name: { type: "string" },
                },
            },
            Model: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    name: { type: "string" },
                    brandId: { type: "string" },
                },
            },
            BrandRequest: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    userId: { type: "string" },
                    name: { type: "string" },
                    status: { type: "string" },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                },
            },
            ModelRequest: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    userId: { type: "string" },
                    brand: { type: "string" },
                    name: { type: "string" },
                    status: { type: "string" },
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
                        description:
                            "Create manager. Permission has only Admin",
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
                security: [{ bearerAuth: [] }],
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
        "/adverts/{id}/statistics": {
            get: {
                tags: ["Advertisement"],
                summary:
                    "Get info about views and average price by region or country",
                security: [{ bearerAuth: [] }],
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
                        description: "Successfully get statistics data",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        views: {
                                            type: "object",
                                            properties: {
                                                total: { type: "number" },
                                                today: { type: "number" },
                                                week: { type: "number" },
                                                month: { type: "number" },
                                                averagePriceByCountry: {
                                                    type: "number",
                                                },
                                                averagePriceByRegion: {
                                                    type: "number",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "403": {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 403,
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
        "/brands": {
            get: {
                tags: ["Brands"],
                summary: "Get list of brands",
                responses: {
                    "200": {
                        description: "Successfully get list of brands",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Brand",
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
                tags: ["Brands"],
                summary: "Create brand",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                },
                                required: ["name"],
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description:
                            "Successfully create brand. Permission has only Manager and Admin ",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Brand",
                                },
                            },
                        },
                    },
                    "403": {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 403,
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
        "/brands:{id}": {
            delete: {
                tags: ["Brands"],
                summary: "Remove brand allows only Manager or Admin",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Brand id",
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
        "/brands/{brandId}/models": {
            get: {
                tags: ["Models"],
                summary: "Get a list of models by brand",
                parameters: [
                    {
                        name: "brandId",
                        in: "path",
                        description: "Brand id",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Successfully get a list of models",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Model",
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
                tags: ["Models"],
                summary: "Create model",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "brandId",
                        in: "path",
                        description: "Brand id",
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
                                    name: { type: "string" },
                                },
                                required: ["name"],
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description:
                            "Successfully create model. Permission has only Manager and Admin ",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Model",
                                },
                            },
                        },
                    },
                    "403": {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 403,
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
        "/brands/{brandId}/models/{id}": {
            delete: {
                tags: ["Models"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "brandId",
                        in: "path",
                        description: "Brand id",
                        required: true,
                        schema: { type: "string" },
                    },
                    {
                        name: "id",
                        in: "path",
                        description: "Model id",
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
        "/requests/brands": {
            get: {
                tags: ["Request"],
                summary: "Get all requests for adding brand",
                security: [{ bearerAuth: [] }],
                responses: {
                    "200": {
                        description:
                            "Successfully get all brand requests. Allow only Manager and Admin ",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/BrandRequest",
                                },
                            },
                        },
                    },
                    "403": {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 403,
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
                tags: ["Request"],
                summary: "Create brand request.",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                },
                                required: ["name"],
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Successfully create brand request",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/BrandRequest",
                                },
                            },
                        },
                    },
                    "403": {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 403,
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
        "/requests/brand/{id}/approve": {
            patch: {
                tags: ["Request"],
                description: "Approve brand request by admin or manager",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Request id",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Successfully approved request",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Brand",
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
        "/requests/brand/{id}/reject": {
            patch: {
                tags: ["Request"],
                description: "Reject brand request by admin or manager",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Request id",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Rejected request",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/BrandRequest",
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
        "/requests/models": {
            get: {
                tags: ["Request"],
                summary: "Get all requests for adding model",
                security: [{ bearerAuth: [] }],
                responses: {
                    "200": {
                        description:
                            "Successfully get all model requests. Allow only Manager and Admin ",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ModelRequest",
                                },
                            },
                        },
                    },
                    "403": {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 403,
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
                tags: ["Request"],
                summary: "Create model request.",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    brand: { type: "string" },
                                },
                                required: ["name", "brand"],
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Successfully create model request",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ModelRequest",
                                },
                            },
                        },
                    },
                    "403": {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            default: 403,
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
        "/requests/model/{id}/approve": {
            patch: {
                tags: ["Request"],
                description: "Approve model request by admin or manager",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Request id",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Successfully approved request",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Model",
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
        "/requests/model/{id}/reject": {
            patch: {
                tags: ["Request"],
                description: "Reject model request by admin or manager",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Request id",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Rejected request",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ModelRequest",
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
    },
};
export { swaggerDocument, swaggerUI };
