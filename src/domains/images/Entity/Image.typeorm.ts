import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import PostTypeORM from '../../posts/Entity/Post.typeorm';

@Entity({ name: 'image' })
export default class ImageTypeORM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('bytea')
  small: Buffer;

  @Column('bytea')
  medium: Buffer;

  @Column('bytea')
  large: Buffer;

  @ManyToOne(type => PostTypeORM, post => post.images)
  post: PostTypeORM;
}
