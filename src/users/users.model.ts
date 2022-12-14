import { ApiProperty } from "@nestjs/swagger";
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import { Post } from "src/posts/posts.model";

import { Role } from "src/roles/roles.model";
import { UserRole } from "../roles/user-roles.model";

interface UserCreationAttr {
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttr> {
  @ApiProperty({ example: "001", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "user@mail.com", description: "Почта пользователя" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: "********", description: "Пароль пользователя" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: "true", description: "Забанен или нет" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: "За спам", description: "Причина бана" })
  @Column({ type: DataType.STRING })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasMany(() => Post)
  posts: Post[];
}
