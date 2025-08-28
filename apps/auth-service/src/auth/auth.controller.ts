import { Controller, Inject } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ClientProxy, MessagePattern } from '@nestjs/microservices'
import { RefreshTokenDto, SignInDto, SignUpDto } from '@app/contracts/dtos/auth/auth.request.dto'
import { AUTH_PATTERN } from '@app/contracts/dtos/auth/auth.pattern'
import { User } from './entities/user.entity'
import { RefreshTokenResponseDto, SignInResponseDto } from '@app/contracts/dtos/auth/auth.response.dto'

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        @Inject('AUTH_PUBLISHER') private readonly client: ClientProxy,
    ) {}

    @MessagePattern(AUTH_PATTERN.SIGN_UP)
    async signUp(signUpDto: SignUpDto): Promise<User> {
        const user = await this.authService.signUp(signUpDto)
        this.client.emit('user.created', user)
        return user
    }

    @MessagePattern(AUTH_PATTERN.SIGN_IN)
    async signIn(signInDto: SignInDto): Promise<SignInResponseDto> {
        const data = await this.authService.signIn(signInDto)
        await this.authService.saveRefreshToken(data.refreshToken, data.user.id)
        return data
    }

    @MessagePattern(AUTH_PATTERN.REFRESH_TOKEN)
    async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
        return await this.authService.refreshToken(refreshTokenDto)
    }
}
