// import { Express, Request, Response } from "express";
// import swaggerJsdoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
// import log from "./logger";

// const options: swaggerJsdoc.Options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//         title: "REST API Docs",
//         version: ""
//     },
//     // components: {
//     //   securitySchemes: {
//     //     bearerAuth: {
//     //       type: "http",
//     //       scheme: "bearer",
//     //       bearerFormat: "JWT",
//     //     },
//     //   },
//     // },
//     // security: [
//     //   {
//     //     bearerAuth: [],
//     //   },
//     // ],
//   },
//   apis: ["./src/router/*.ts"],
// };

// const swaggerSpec = swaggerJsdoc(options);

// function swaggerDocs(app: Express, port: number) {
//   try {
//     // Swagger page
//     app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//     // Docs in JSON format
//     app.get("/docs.json", (req: Request, res: Response) => {
//       res.setHeader("Content-Type", "application/json");
//       res.send(swaggerSpec);
//     });

//     log.info(`Docs available at http://localhost:${port}/docs`);
//   } catch (error) {
//     log.error("Error setting up Swagger:", error);
//   }
// }


// export default swaggerDocs;