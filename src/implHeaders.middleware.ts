import { NestMiddleware, Injectable } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

export class HeadersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const age = 1000 * 60 * 60 * 2; // 2hours
    console.log(req.headers['cache-control']);
    if (!req.headers['cache-control']) {
      res.set('Cache-Control', `public, max-age=${age}, immutable`);
    }
    res.set('Last-Modified', new Date().toString());

    next();
  }
}
