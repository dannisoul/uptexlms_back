import { PartialType } from "@nestjs/mapped-types";
import { CreateGrupoDto } from "./create-grupo.dto";
import { IsInt, IsOptional } from "class-validator";

export class UpdateGrupoDto extends PartialType(CreateGrupoDto){
    @IsOptional()
    @IsInt()
    activo?: 0 | 1
}