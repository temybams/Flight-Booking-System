import { prisma, connectPrisma } from './prisma.service'
import JWTService from './jwt.service'
import EmailService from './email.service'


export {
    prisma,
    connectPrisma,
    JWTService,
    EmailService
}
