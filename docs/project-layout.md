# Project Layout

## BE Project Layout

 - Three layered architecture has been used seperated into `Controllers`, `Services` and `Models`.
 - Controllers has been used as the entry point of the incoming API requests.
 - All prisma specific operation has been handled within Models directory.
 - All services acts as the business layer, though it is not fully decoupled from Prisma and DB Layer.
 - `Middlewares` encompasses some function to either perform error handling or `Authentication` validation.


## FE Project Layout
 - `core` directory encapsulates the configuration and global level folders which are not `module` specific.
 - `store` directory contains the `Redux Toolkit` and `RTK Query` API's which perform the `Mutations`.
 - `graphql` directory encapsulates the Graphql Client Queries.
 - `modules` encapsulate independent feature modules.
 - `layouts` have some reusable layouts which can used for different routes.

## Docker Setup Layout
 - Two dockerfile is present to have `dev` server up.
 - A top level `compose.yaml` is used spin up the seperate BE and FE and also spin up the `Postgres` Server.
 - As spinning up the will create a new instance during the first time, hence prisma migrations may need to run.
