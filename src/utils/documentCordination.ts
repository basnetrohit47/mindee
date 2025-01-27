import { CustomeAnnotationShape, DocumentPrediction } from '../common/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDocumentPrediction = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prediction: any,
): CustomeAnnotationShape[] => {
    const shapeItems: CustomeAnnotationShape[] = []
    Object.entries(prediction as DocumentPrediction).map(([key], index) => {
        const colorSet = getColor()


        if (Array.isArray(prediction[key]) && key === 'line_items') {
            prediction[key].map((item, itemIndex) => {
                shapeItems.push({
                    id: `${key} ${itemIndex}`,
                    isList: true,
                    coordinates: item.polygon,
                    name: key,
                    original: `Product Code: ${item.description}\n Quantity : ${item.quantity}\n Measure: ${item.unit_measure}\nRate : ${item.unit_price}\nTax amount : ${item.tax_amount}\nTotal : ${item.total_amount} `,
                    value: `Product Code: ${item.description}\n Quantity : ${item.quantity}\n Measure: ${item.unit_measure}\nRate : ${item.unit_price}\nTax amount : ${item.tax_amount}\nTotal : ${item.total_amount} `,
                    colorSet: colorSet,
                    config: { stroke: colorSet.stroke },
                    raw: item,
                })
            })
        } else {
            shapeItems.push({
                id: index + 1,
                isList: false,
                coordinates: prediction[key].polygon ?? [],
                original: prediction[key].value,
                value: prediction[key].value,
                name: key,
                confidence: prediction[key]?.confidence || 0,
                colorSet: colorSet,
                config: { stroke: colorSet.stroke },
                raw: prediction[key],
            })
        }

    })

    return shapeItems
}

const colors = [
    '#fb0000',
    '#800067',
    '#0b26ff',
    '#ff8c00',
    '#008000',
    '#0000ff',
    '#ffff00',
    '#ffa500',
    '#00ff00',
    '#800080',
]
const getColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    const strokeColor = colors[randomIndex]
    const fillColor = `${strokeColor}5e`
    return { stroke: strokeColor, fill: fillColor }
}



