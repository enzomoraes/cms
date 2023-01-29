import slug from 'slug';

export default class SlugMaker {
  public make(title: string): string {
    return slug(title);
  }
}
