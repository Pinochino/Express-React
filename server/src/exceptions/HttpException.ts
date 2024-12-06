
class HttpException extends Error {
     status: number;
     message!: string;
     object!: object;
    constructor(status: number, message: string, object: object) {
        super(message);
        this.status = status;
        this.object = object;
    }
}

class BadRequestException extends HttpException {
    constructor(message = "Bad Request", object: object = {}) {
        super(400, message, object);
    }
}

class UnauthorizedException extends HttpException {
    constructor(message = "Unauthorized", object: object = {}) {
        super(401, message, object);
    }
}

class NotFoundException extends HttpException {
    constructor(message = "Not Found", object: object = {}) {
        super(404, message, object);
    }
}

class ForbiddenException extends HttpException {
    constructor(message = "Forbidden", object: object = {}) {
        super(403, message, object);
    }
}

// Tiếp tục định nghĩa các exception khác tương ứng
class NotAcceptableException extends HttpException {
    constructor(message = "Not Acceptable", object: object = {}) {
        super(406, message, object);
    }
}

class InternalServerErrorException extends HttpException {
    constructor(message = "Internal Server Error", object: object = {}) {
        super(500, message, object);
    }
}

class ResourceNotFoundException extends HttpException {
    constructor(message = 'Resouce not found exception', object: object = {}){
        super(100, message, object)
    }
}

module.exports = {
    HttpException,
    BadRequestException,
    UnauthorizedException,
    NotFoundException,
    ForbiddenException,
    NotAcceptableException,
    InternalServerErrorException,
    ResourceNotFoundException
};
