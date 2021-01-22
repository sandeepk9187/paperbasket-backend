"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFile = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.ApiFile = ({ fileName, required }) => (target, propertyKey, descriptor) => {
    swagger_1.ApiBody({
        type: 'multipart/form-data',
        required: required,
        schema: {
            type: 'object',
            properties: {
                [fileName]: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })(target, propertyKey, descriptor);
};
//# sourceMappingURL=file.decorator.js.map