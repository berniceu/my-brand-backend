import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const router = express.Router();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'my brand api',
            version: '1.0.0'
        }
    },

    apis:['./src/Routes/*.ts'],
}

const swaggerSpec = swaggerJSDoc(options);
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default router;