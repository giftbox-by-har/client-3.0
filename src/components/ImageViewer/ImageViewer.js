import React, { useState, useEffect } from "react";
import "./ImageViewer.css";
import { baseUrl } from "../../config";

const ImageViewer = (props) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) =>
				prevIndex === props.images.length - 1 ? 0 : prevIndex + 1
			);
		}, 8000);

		return () => {
			clearInterval(interval);
		};
	}, [props.images.length]);
	const handlePrevClick = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === 0 ? props.images.length - 1 : prevIndex - 1
		);
	};

	const handleNextClick = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === props.images.length - 1 ? 0 : prevIndex + 1
		);
	};
	return (
		<div>
			<div className="imageviewer-button-container">
				{props.images.length > 1 && (
					<>
						<button className="imageviewer-button" onClick={handlePrevClick}>
							&lt;
						</button>
						<button className="imageviewer-button" onClick={handleNextClick}>
							&gt;
						</button>
					</>
				)}
			</div>
			<img
				className="imageviewer-img"
				src={`${baseUrl}/${props.images[currentImageIndex]}`}
				alt={`Image ${currentImageIndex + 1}`}
			/>
		</div>
	);
};

export default ImageViewer;
