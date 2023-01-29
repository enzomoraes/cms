import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ImageTypeORM from '../../images/Entity/Image.typeorm';

@Entity({ name: 'posts' })
export default class PostTypeORM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  tags: string[];

  @Column()
  body: string;

  @OneToMany(type => ImageTypeORM, image => image.post)
  images: ImageTypeORM[];

  @CreateDateColumn()
  createdAt: Date;
}
