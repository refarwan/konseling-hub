import { AuthGuard } from "src/guards/auth.guard";

import { AccountService } from "./account.service";
import { AuthService } from "../auth/auth.service";

import AccountData from "./types/account-data";
import { AllProvince } from "./types/all-province";

import { RegisterDto } from "./dto/register.dto";
import { EditAccountDto } from "./dto/edit-account.dto";

import {
	Body,
	Controller,
	Get,
	Patch,
	Post,
	Req,
	Res,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Request, Response } from "express";

@Controller("account")
export class AccountController {
	constructor(
		private readonly accountService: AccountService,
		private readonly authService: AuthService,
	) {}

	@Post("register")
	async register(@Body() body: RegisterDto): Promise<{ message: string }> {
		return await this.accountService.register(body);
	}

	@Get("my-profile")
	@UseGuards(AuthGuard)
	async getMyProfile(@Req() request: Request): Promise<AccountData> {
		return await this.accountService.getAccoutData(request["accountId"]);
	}

	@Get("all-province")
	@UseGuards(AuthGuard)
	async getAllProvince(): Promise<AllProvince> {
		return await this.accountService.getAllProvince();
	}

	@Patch("edit-my-account")
	@UseGuards(AuthGuard)
	@UseInterceptors(
		FileFieldsInterceptor([{ name: "profilePicture", maxCount: 1 }]),
	)
	async editMyAccount(
		@Req() request: Request,
		@Body() body: EditAccountDto,
		@Res({ passthrough: true }) response: Response,
		@UploadedFiles()
		files?: {
			profilePicture?: Express.Multer.File[];
		},
	): Promise<{ message: string } | { accessToken: string }> {
		const refreshToken = request.cookies["refreshToken"] as undefined | string;

		const result = await this.accountService.editMyAccount({
			accountId: request["accountId"],
			newValue: body,
			files: files,
			refreshToken,
		});

		if (result.reAuthenticate === "accessToken") {
			return { accessToken: result.accessToken };
		}

		if (result.reAuthenticate === "all") {
			response.clearCookie("refreshToken");
			return {
				message: "Berhasil mengedit akun, silakan lakukan authentikasi ulang",
			};
		}

		return { message: "Berhasil mengedit akun" };
	}
}
