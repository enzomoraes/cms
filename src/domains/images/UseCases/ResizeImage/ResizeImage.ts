import sharp from 'sharp';

export default class ImageResizer {
  public async resize(
    path: string
  ): Promise<{ small: Buffer; medium: Buffer; large: Buffer }> {
    const small = await sharp(path).resize(300).toBuffer();
    const medium = await sharp(path).resize(600).toBuffer();
    const large = await sharp(path).resize(900).toBuffer();

    return { small, medium, large };
  }
}
