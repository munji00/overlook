
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayloadDto} from './dto/jwtPayload.td';

@Injectable()
export class JwtService {
  private readonly secretKey = "jdsh%79&adh$hgsdg&%ghsd$";

  generateToken(payload:JwtPayloadDto): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: '24h' });
  }

  verifyToken(token: string):JwtPayloadDto{
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      return null;
    }
  }
}