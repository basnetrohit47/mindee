import { CustomeAnnotationShape } from "../common/types";

export const createUpdatedShapes = (
    shapes: CustomeAnnotationShape[],
    hoveredShapeId?: number,
): CustomeAnnotationShape[] =>
    shapes.map((shape) => ({
        ...shape,
        config: {
            ...shape.config,
            fill: shape.id === hoveredShapeId ? shape.colorSet?.fill : '',
        },
    }))