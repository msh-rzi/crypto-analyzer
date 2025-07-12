import { IsEmail, IsString } from 'class-validator';

export class CreateTelegramDto {
  @IsString()
  botToken: string;

  @IsString()
  chatId: string;

  // TODO : Must replace logic and get username and email from jwt
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;
  // TODO end
}
