import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { ModalSimple } from '../ModalSimple';

interface ImageUploadGridProps {
    addLabel?: string;
    id?: string;
    label?: string;
    onChange: (images: string[]) => void;
    value: string[];
    viewerTitle?: string;
}

const UploadField = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    grid-column: 1 / -1;
`;

const Label = styled.label`
    font-size: 0.95rem;
    font-weight: 400;
    color: #000000;
`;

const UploadGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
`;

const TileSize = '116px';

const Tile = styled.div`
    position: relative;
    width: ${TileSize};
    height: ${TileSize};
    min-width: ${TileSize};
    padding: 0;
    overflow: hidden;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background: #ffffff;
    cursor: pointer;

    &:focus-visible {
        outline: 3px solid rgba(148, 163, 184, 0.32);
        outline-offset: 2px;
    }
`;

const AddTile = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: ${TileSize};
    height: ${TileSize};
    min-width: ${TileSize};
    padding: 0;
    overflow: hidden;
    border: 1px dashed #cbd5e1;
    border-radius: 6px;
    background: #ffffff;
    color: #64748b;
    cursor: pointer;
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;

    svg {
        width: 30px;
        height: 30px;
    }

    &:hover {
        border-color: #94a3b8;
        color: #0f172a;
        background: #f8fafc;
    }
`;

const PreviewImage = styled.img`
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
`;

const RemoveButton = styled.button`
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 1;
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid rgba(220, 38, 38, 0.22);
    border-radius: 999px;
    background: #ffffff;
    color: #dc2626;
    font-size: var(--font-size-xs);
    font-weight: 500;
    line-height: 1;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.14);

    &:hover {
        background: #fef2f2;
        border-color: #dc2626;
    }
`;

const HiddenInput = styled.input`
    display: none;
`;

const ViewerImage = styled.img`
    max-width: 100%;
    max-height: 72vh;
    display: block;
    object-fit: contain;
    border-radius: 6px;
    margin: 0 auto;
`;

const readImageAsDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
        if (typeof reader.result === 'string') {
            resolve(reader.result);
            return;
        }

        reject(new Error('Nao foi possivel carregar a imagem.'));
    };

    reader.onerror = () => reject(reader.error ?? new Error('Nao foi possivel carregar a imagem.'));
    reader.readAsDataURL(file);
});

export const ImageUploadGrid = ({
    addLabel = 'Adicionar imagem',
    id,
    label = 'Adicionar imagem',
    onChange,
    value,
    viewerTitle = 'Imagem',
}: ImageUploadGridProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        if (!selectedImage) {
            return;
        }

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') {
                return;
            }

            event.stopPropagation();
            setSelectedImage(null);
        };

        document.addEventListener('keydown', handleEsc, true);

        return () => {
            document.removeEventListener('keydown', handleEsc, true);
        };
    }, [selectedImage]);

    const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []).filter((file) => file.type.startsWith('image/'));

        if (!files.length) {
            return;
        }

        const nextImages = await Promise.all(files.map(readImageAsDataUrl));
        onChange([...value, ...nextImages]);
        event.target.value = '';
    };

    const handleRemove = (imageIndex: number) => {
        const removedImage = value[imageIndex];
        onChange(value.filter((_, index) => index !== imageIndex));

        if (selectedImage === removedImage) {
            setSelectedImage(null);
        }
    };

    return (
        <UploadField>
            <Label htmlFor={id}>{label}</Label>
            <UploadGrid>
                {value.map((image, index) => (
                    <Tile
                        key={`${image.slice(0, 40)}-${index}`}
                        role="button"
                        tabIndex={0}
                        aria-label={`Visualizar imagem ${index + 1}`}
                        onClick={() => setSelectedImage(image)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                setSelectedImage(image);
                            }
                        }}
                    >
                        <PreviewImage src={image} alt={`Imagem ${index + 1}`} />
                        <RemoveButton
                            type="button"
                            aria-label={`Excluir imagem ${index + 1}`}
                            onClick={(event) => {
                                event.stopPropagation();
                                handleRemove(index);
                            }}
                        >
                            <FaTrashAlt />
                        </RemoveButton>
                    </Tile>
                ))}

                <AddTile
                    type="button"
                    aria-label={addLabel}
                    onClick={() => inputRef.current?.click()}
                >
                    <FaPlus />
                </AddTile>
            </UploadGrid>
            <HiddenInput
                ref={inputRef}
                id={id}
                type="file"
                accept="image/*"
                multiple
                onChange={handleInputChange}
            />

            {selectedImage && (
                <ModalSimple
                    title={viewerTitle}
                    size="sm"
                    onClose={() => setSelectedImage(null)}
                >
                    <ViewerImage src={selectedImage} alt={viewerTitle} />
                </ModalSimple>
            )}
        </UploadField>
    );
};
