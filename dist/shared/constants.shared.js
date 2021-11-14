"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieProps = exports.pwdSaltRounds = exports.loginFailedErr = exports.paramMissingError = void 0;
// Strings
exports.paramMissingError = 'One or more of the required parameters was missing.';
exports.loginFailedErr = 'Login failed';
// Numbers
exports.pwdSaltRounds = 12;
// Cookie Properties
exports.cookieProps = Object.freeze({
    key: 'ExpressGeneratorTs',
    secret: process.env.COOKIE_SECRET,
    options: {
        httpOnly: true,
        signed: true,
        path: (process.env.COOKIE_PATH),
        maxAge: Number(process.env.COOKIE_EXP),
        domain: (process.env.COOKIE_DOMAIN),
        secure: (process.env.SECURE_COOKIE === 'true'),
    },
});
//# sourceMappingURL=constants.shared.js.map