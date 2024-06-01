'use server';

import sharp from 'sharp';

type GetBase64Src = string;

interface GetBase64Options {
    autoOrient?: boolean;
    size?: number;
    format?: 'jpeg' | 'png' | 'webp';
    removeAlpha?: boolean;
    brightness?: number;
    saturation?: number;
    hue?: number;
    lightness?: number;
}

const baseBlur =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAYAAAD5PA/NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGUlEQVR4nGNgYGBIZWBgqGJgYPBhYGBQAwALHgFSVljFWAAAAABJRU5ErkJggg==';

async function fetchImageBuffer(src: string): Promise<Buffer> {
    try {
        const response = await fetch(src);
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }
        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
    } catch (error) {
        console.error('Fetching image failed', error);
        throw error;
    }
}

export default async function getBase64(
    src: GetBase64Src,
    {
        autoOrient = false,
        size = 4,
        format = 'png',
        removeAlpha = false,
        brightness = 1,
        saturation = 1.2,
        ...options
    }: GetBase64Options = {}
): Promise<string> {
    try {
        const buffer = await fetchImageBuffer(src);

        const pipeline = sharp(buffer)
            .resize(size, size, { fit: 'inside' })
            .toFormat(format)
            .modulate({
                brightness,
                saturation,
                ...(options?.hue ? { hue: options?.hue } : {}),
                ...(options?.lightness
                    ? { lightness: options?.lightness }
                    : {}),
            });

        const finalPipeline = removeAlpha ? pipeline.removeAlpha() : pipeline;
        const finalPipelineWithOrientation = autoOrient
            ? finalPipeline.rotate()
            : finalPipeline;

        const base64 = await finalPipelineWithOrientation
            .toBuffer()
            .then(
                (data) =>
                    `data:image/${format};base64,${data.toString('base64')}`
            )
            .catch((err) => {
                console.error('Base64 generation failed', err);
                throw err;
            });

        return base64;
    } catch (error) {
        console.error('Processing image failed', error);
        return baseBlur;
    }
}
