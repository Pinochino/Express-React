
class HttpException extends Error {
     status: number;
     message!: string;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.status = status;
    }
}

class BadRequestException extends HttpException {
    constructor(message = "Bad Request") {
        super(400, message);
    }
}

class UnauthorizedException extends HttpException {
    constructor(message = "Unauthorized") {
        super(401, message);
    }
}

class NotFoundException extends HttpException {
    constructor(message = "Not Found") {
        super(404, message);
    }
}

class ForbiddenException extends HttpException {
    constructor(message = "Forbidden") {
        super(403, message);
    }
}

// Tiếp tục định nghĩa các exception khác tương ứng
class NotAcceptableException extends HttpException {
    constructor(message = "Not Acceptable") {
        super(406, message);
    }
}

class InternalServerErrorException extends HttpException {
    constructor(message = "Internal Server Error") {
        super(500, message);
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
};
