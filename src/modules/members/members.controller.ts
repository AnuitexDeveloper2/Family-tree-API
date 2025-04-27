import { Body, Controller, Get, Post } from '@nestjs/common';
import { MembersService } from './members.service';
import { Public } from 'modules/auth/decorators/public-route.decorator';
import { CreateMemberDTO } from './dto/create-member.dto';
import { GetMemberDataDTO } from './dto/get-member-details.dto';

@Controller('members')
export class MembersController {

  constructor(private service: MembersService) { }


  @Public()
  @Post()
  async createMember(@Body() createMemberDTO: CreateMemberDTO) {
    const data = await this.service.create(createMemberDTO);

    return { message: "Create Member", data };
  }

  @Public()
  @Get('all')
  async getallMembers() {
    const data = await this.service.findAll();

    return { message: "Get Member Details", data };
  }

  @Public()
  @Post('/get')
  async getMemberDetails(@Body() dto: GetMemberDataDTO) {
    const data = await this.service.getMemberDetails(dto);

    return { message: "Get Member Details", data };
  }
}
