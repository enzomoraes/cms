import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import PostTypeORM from '../../posts/Entity/Post.typeorm';

@Entity({ name: 'image' })
export default class ImageTypeORM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  small: string;

  @Column()
  medium: string;

  @Column()
  large: string;

  @ManyToOne(type => PostTypeORM, post => post.images)
  post: PostTypeORM;
}
