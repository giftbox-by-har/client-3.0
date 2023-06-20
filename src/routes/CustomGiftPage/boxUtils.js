export const checkProductFitsInBox = (product, box, selectedProducts) => {
	const productDimensions = {
		length:
			product.dimension.length -
			product.dimension.length * product.dimension.compressionRatio,
		width:
			product.dimension.width -
			product.dimension.width * product.dimension.compressionRatio,
		height:
			product.dimension.height -
			product.dimension.height * product.dimension.compressionRatio,
	};

	let boxDimensions = {
		length: box.dimension.length,
		width: box.dimension.width,
		height: box.dimension.height,
	};

	if (selectedProducts && selectedProducts.length > 0) {
		selectedProducts.forEach((selectedProduct) => {
			for (let i = 0; i < selectedProduct.quantity; i++) {
				const selectedProductDimensions = {
					length:
						selectedProduct.dimension.length -
						selectedProduct.dimension.length *
							selectedProduct.dimension.compressionRatio,
					width:
						selectedProduct.dimension.width -
						selectedProduct.dimension.width *
							selectedProduct.dimension.compressionRatio,
					height:
						selectedProduct.dimension.height -
						selectedProduct.dimension.height *
							selectedProduct.dimension.compressionRatio,
				};

				const selectedProductDimensionsArray = [
					selectedProductDimensions.length,
					selectedProductDimensions.width,
					selectedProductDimensions.height,
				];

				selectedProductDimensionsArray.sort((a, b) => b - a);

				const boxDimensionsArray = [
					boxDimensions.length,
					boxDimensions.width,
					boxDimensions.height,
				];

				boxDimensionsArray.sort((a, b) => b - a);

				// Subtract the product's dimensions from the box's dimensions
				boxDimensionsArray[0] -= selectedProductDimensionsArray[0];
				boxDimensionsArray[1] -= selectedProductDimensionsArray[1];
				boxDimensionsArray[2] -= selectedProductDimensionsArray[2];

				boxDimensions.length = boxDimensionsArray[0];
				boxDimensions.width = boxDimensionsArray[1];
				boxDimensions.height = boxDimensionsArray[2];

				console.log(
					`Updated box dimensions: ${boxDimensions.length} x ${boxDimensions.width} x ${boxDimensions.height}`
				);
			}
		});
	}
	const productDimensionsArray = [
		productDimensions.length,
		productDimensions.width,
		productDimensions.height,
	];

	productDimensionsArray.sort((a, b) => b - a);

	const boxDimensionsArray = [
		boxDimensions.length,
		boxDimensions.width,
		boxDimensions.height,
	];

	boxDimensionsArray.sort((a, b) => b - a);

	return (
		productDimensionsArray[0] <= boxDimensionsArray[0] &&
		productDimensionsArray[1] <= boxDimensionsArray[1] &&
		productDimensionsArray[2] <= boxDimensionsArray[2]
	);
};
